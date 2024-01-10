import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Signup from "./pages/Singup/Signup.jsx";
import Indicator from "./pages/admin/Indicator.jsx";
import Data from "./pages/admin/Data.jsx";
import User from "./pages/admin/user.jsx";
import Admin from "./pages/admin/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Homepage/>,
        children: [
          {
            path: 'indicator',
            element: <Indicator/>
          },
          {
            path: '/data',
            element: <Data/>
          }
        ]
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
        element: <User/>
      }
    ]
  }
]);

export default router;
