import { createBrowserRouter } from "react-router-dom";
import { MainContent } from "../pages/Home";
import { SignIn, SignUp } from "../pages/Auth";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainContent />,
    },
    {
        path: "/sing-in",
        element: <SignIn />,
    },
    {
        path: "/sing-up",
        element: <SignUp />,
    },
]);
