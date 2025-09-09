import { createBrowserRouter } from "react-router-dom";
import Home from "../bt1/Home";
import About from "../bt1/About";
import Contact from "../bt1/Contact";
import Login from "../bt3/Login";
import Register from "../bt4/Register";
import NotFound from "../bt5/NotFound";
import Header from "../bt6/Header";

const router = createBrowserRouter([
  {
    
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;