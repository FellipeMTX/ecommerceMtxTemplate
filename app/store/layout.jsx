import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Gadgets. - Store Dashboard",
    description: "Gadgets. - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
