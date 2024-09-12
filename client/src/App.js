import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./components/tpo/Login";
import Register from "./components/tpo/Register";
import Dashboard from "./components/tpo/Dashboard";
import BranchStats from "./components/tpo/BranchStats";

const router = createBrowserRouter([
    { path: "/", element: <Landing/> },
    { path: "/login", element: <Login/> },
    { path: "/register", element: <Register/> },
    { path: "/tpo", element: <Dashboard/> },
    { path: '/tpo/:branch',element: <BranchStats />, }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
