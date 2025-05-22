'use server'

import postgres from "postgres";
import {z} from "zod";
import console from "node:console";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {uuid} from "uuidv4";
import {routes} from "@/app/lib/routes";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const CustomerFormSchema = z.object({
    fullname: z.string().min(3, { message: 'Please enter a valid customer name.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

export type CustomerState = {
    errors?: {
        fullname?: string[];
        email?: string[];
        imageUrl?: string[];
    };
    message?: string | null;
};

const CreateCustomer = CustomerFormSchema;

export async function createCustomer(prevState: CustomerState, formData: FormData) {
    const validatedFields = CreateCustomer.safeParse({
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        imageUrl: formData.get('imageUrl'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }

    // Prepare data for insertion into the database
    const { fullname, email, imageUrl } = validatedFields.data;
    const id = uuid();

    // Insert data into the database
    try {
        await sql`
            INSERT INTO customers (id, name, email, image_url)
            VALUES (${id}, ${fullname}, ${email}, ${imageUrl})
            ON CONFLICT (id) DO NOTHING;
        `;
    } catch (error) {
        console.log(error);
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath(routes.dashboard.customers.path);
    redirect(routes.dashboard.customers.path);
}
