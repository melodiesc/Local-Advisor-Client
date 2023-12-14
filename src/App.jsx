import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Profil from "./Component/Profil/Profil";
import EditProfil from "./Component/EditProfil/EditProfil";
import Register from "./Component/Register/Register";
import RegisterOwner from "./Component/RegisterOwner/RegisterOwner";
import Login from "./Component/Login/Login";
import CreateCard from "./Component/CreateCard/CreateCard";
import Details from "./Component/Details/Details";
import Email from "./Component/RecoverPassword/Email";
import Password from "./Component/RecoverPassword/Password";

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
    },
    {
      path: "/create_card",
      element: <CreateCard />,
    },
    {
      path: "/:id",
      element: <Details />,
    },
    {
      path: "/reset_email",
      element: <Email />,
    },
    {
      path: "/reset_password",
      element: <Password />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
