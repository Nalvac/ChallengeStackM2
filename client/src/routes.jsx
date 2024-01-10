import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Signup from "./pages/Singup/Signup.jsx";
import Users from "./pages/admin/Users.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Roles from "./pages/admin/Roles.jsx";
import Products from "./pages/admin/Products.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Homepage/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "/admin",
    element: <Admin/>,
    children: [
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "roles",
        element: <Roles/>
      },
      {
        path: "products",
        element: <Products/>
      },
    ]
  }
]);

export default router;
