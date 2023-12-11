import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";
import Profil from "./Component/Profil/Profil";
import EditProfil from "./Component/EditProfil/EditProfil";
import Register from "./Component/Register/Register";

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
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
