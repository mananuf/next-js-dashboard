import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {routes} from "@/app/lib/routes";
import CreateUserForm from "@/app/ui/users/create-form";

export default async function Page() {

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: routes.dashboard.users.path },
                    {
                        label: 'Create User',
                        href: routes.dashboard.users.create,
                        active: true,
                    },
                ]}
            />
            <CreateUserForm />
        </main>
    );
}