import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "/", element: <>Hello World</> }]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
