import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/Login/Login";
import { HomePage } from "../pages/Home/Home";
import { SignUpPage } from "../pages/SignUp/SignUp";
import { ProductsPage } from "../pages/Products/Products";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/home",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "*",
                element: <>not found</>,
            },
        ]
    },
]);