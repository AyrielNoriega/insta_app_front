import { createBrowserRouter } from "react-router-dom";
import { MainContent } from "../components/MainContent";



// export const AppRouter = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<HomePage />} />
//         </Routes>
//     );
// };


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainContent />,
    },
]);