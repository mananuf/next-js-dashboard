'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {useActionState} from "react";
import {createCustomer, CustomerState} from "@/app/lib/actions/customer-actions";
import {routes} from "@/app/lib/routes";

export default function CreateCustomerForm() {
  const initialState: CustomerState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* customer name */}
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
                placeholder="Enter  Fullname"
                aria-describedby="fullname-error"
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

        {/* customer email */}
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
                  placeholder="human@example.com"
                  aria-describedby="email-error"
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

        {/* customer ImageUrl */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
            ImageUrl
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  placeholder="https://image_path.com"
                  aria-describedby="imageUrl-error"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
          <div id="imageUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.imageUrl &&
                state.errors.imageUrl.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={routes.dashboard.invoices.path}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
