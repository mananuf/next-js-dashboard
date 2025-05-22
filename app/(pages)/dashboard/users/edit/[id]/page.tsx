import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import {notFound} from "next/navigation";
import {routes} from "@/app/lib/routes";
import {fetchUserById} from "@/app/lib/data";
import EditUserForm from "@/app/ui/users/edit-form";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const user = await fetchUserById(id);

    if (!user) {
        notFound()
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: routes.dashboard.users.path },
                    {
                        label: 'Edit Invoice',
                        href: routes.dashboard.users.edit(id),
                        active: true,
                    },
                ]}
            />
            <EditUserForm user={user} />
        </main>
    );
}