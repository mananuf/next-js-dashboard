import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateCustomerForm from "@/app/ui/customers/create-form";
import {routes} from "@/app/lib/routes";

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: routes.dashboard.customers.path },
                    {
                        label: 'Create Customer',
                        href: routes.dashboard.customers.create,
                        active: true,
                    },
                ]}
            />
            <CreateCustomerForm />
        </main>
    );
}