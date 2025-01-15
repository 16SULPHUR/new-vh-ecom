import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Product from "./pages/Product";
import CartPage from "./pages/Cart";
import { CategoriesPage } from "./pages/Categories";
import Policies from "./pages/PoliciesPage";
import ContactUs from "./components/ContactUs";
import Faq from "./components/faq";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "faqs",
                element: <Faq />,
            },
            {
                path: "policies",
                element: <Policies />,
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
            {
                path: "/category/:category",
                element: <CategoriesPage />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
