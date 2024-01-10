import {createBrowserRouter, redirect} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Signup from "./pages/Singup/Signup.jsx";
import Indicator from "./pages/admin/Indicator.jsx";
import User from "./pages/admin/user.jsx";
import Admin from "./pages/admin/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        loader: async () => {return redirect('indicator')},
      },
      {

        path: '/',
        element: <Homepage/>,
        children: [
          {
            path: 'indicator',
            element: <Indicator/>
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
]);

export default router;
