import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import Product from "./pages/Product";
import CartPage from "./pages/Cart";
import { CategoriesPage } from "./pages/Categories";

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
