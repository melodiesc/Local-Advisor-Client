import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Profil from "./Component/Profil/Profil";
import EditProfil from "./Component/EditProfil/EditProfil";
import Register from "./Component/Register/Register";
import RegisterOwner from "./Component/RegisterOwner/RegisterOwner";
import Login from "./Component/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profil",
      element: <Profil />,
    },
    {
      path: "/editprofil",
      element: <EditProfil />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register_user",
      element: <Register />,
    },
    {
      path: "/register_owner",
      element: <RegisterOwner />,
    },
    {
      path: "/register_owner",
      element: <RegisterOwner />,
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
