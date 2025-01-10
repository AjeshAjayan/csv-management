import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/Login/Login";
import { HomePage } from "../pages/Home/Home";
import { SignUpPage } from "../pages/SignUp/SignUp";

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
        element: <App />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "*",
                element: <>not found</>,
            },
        ]
    },
]);