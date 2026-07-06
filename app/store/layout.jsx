import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "z-pack. - Store Dashboard",
    description: "z-pack. - Store Dashboard",
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
