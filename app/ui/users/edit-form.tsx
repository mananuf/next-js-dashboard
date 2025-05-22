'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {useActionState} from "react";
import {UserForm} from "@/app/lib/definitions";
import {updateUser, UserState} from "@/app/lib/actions/user-actions";
import {routes} from "@/app/lib/routes";

export default function EditUserForm({user}: { user: UserForm; }) {
    const updateUserWithId = updateUser.bind(null, user.id);
    const initialState: UserState = { message: null, errors: {} };
    const [state, formAction] = useActionState(updateUserWithId, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User name */}
                <div className="mb-4">
                    <label htmlFor="fullname" className="mb-2 block text-sm font-medium">
                        fullname
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                defaultValue={user.name}
                                aria-describedby="fullname-error"
                                placeholder="Enter fullname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    <div id="fullname-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.fullname &&
                            state.errors.fullname.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* User email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={user.email}
                                aria-describedby="email-error"
                                placeholder="Enter email"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            state.errors.email.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

                {/* User password */}
                <div className="mb-4">
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">
                        password
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                aria-describedby="password-error"
                                placeholder="Enter password"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    <div id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            state.errors.password.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                    </div>
                </div>

            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href={routes.dashboard.users.path}
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit User</Button>
            </div>
        </form>
    );
}
