import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});

export const metadata = {
    title: "z-pack. - Smart tech, trusted prices",
    description: "z-pack. - The latest Apple products, all in one place.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-sans antialiased text-muted`}>
                <noscript>
                    <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
                </noscript>
                <StoreProvider>
                    <Toaster />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
