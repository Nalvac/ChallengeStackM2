import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Signup from "./pages/Singup/Signup.jsx";

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
]);

export default router;
