import { Outlet, useLocation, } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

export function Applayout() {
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <div className="flex-grow flex flex-col">
                <div>
                    <Outlet />
                </div>
            </div>
            <div className="container px-4 md:px-8">
                <Footer />
            </div>
        </>
    )
}
