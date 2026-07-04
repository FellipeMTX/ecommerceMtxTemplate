import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Gadgets. - Admin",
    description: "Gadgets. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
