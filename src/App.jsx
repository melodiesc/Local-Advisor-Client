import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home/Home";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
