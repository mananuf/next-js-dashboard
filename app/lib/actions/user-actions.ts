'use server'

import postgres from "postgres";
import {z} from "zod";
import console from "node:console";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {uuid} from "uuidv4";
import {routes} from "@/app/lib/routes";
import bcryptjs from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const UserFormSchema = z.object({
    id: z.string(),
    fullname: z.string().min(3, { message: 'Please enter a valid user name.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'Must contain at least one number' })
        .regex(/[!@#$%^&*]/, { message: 'Must contain at least one special character' }),
});

export type UserState = {
    errors?: {
        fullname?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

const CreateUser = UserFormSchema.omit({ id: true });

export async function createUser(prevState: UserState, formData: FormData) {
    const validatedFields = CreateUser.safeParse({
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }

    // Prepare data for insertion into the database
    const { fullname, email, password } = validatedFields.data;
    const id = uuid();
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert data into the database
    try {
        await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${id}, ${fullname}, ${email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
    } catch (error) {
        console.log(error);
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }

    revalidatePath(routes.dashboard.users.path);
    redirect(routes.dashboard.users.path);
}

const UpdateUser = UserFormSchema.omit({ id: true }).extend({ password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Must contain at least one special character' })
    .optional()
});

export async function updateUser(id: string, prevState: UserState, formData: FormData) {
    const validatedFields = UpdateUser.safeParse({
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { fullname, email, password } = validatedFields.data;

    const currentUser = await sql`
      SELECT password FROM users WHERE id = ${id}
    `;

    let hashedPassword;

    if(currentUser[0].password == password) {
       hashedPassword = password;
    } else {
        hashedPassword = await bcryptjs.hash(password, 10);
    }

    try {
        await sql`
        UPDATE users
        SET name = ${fullname}, email = ${email}, password = ${hashedPassword}
        WHERE id = ${id}
      `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        console.log(error);

        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }

    revalidatePath(routes.dashboard.users.path);
    redirect(routes.dashboard.users.path);
}

export async function deleteUser(id: string) {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath(routes.dashboard.users.path);
}