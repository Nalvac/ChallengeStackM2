import {createBrowserRouter, redirect} from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Signup from "./pages/Singup/Signup.jsx";
import Indicator from "./pages/admin/Indicator/Indicator.jsx";
import User from "./pages/admin/Data/Users.jsx";
import Admin from "./pages/admin/Admin.jsx";
import VaccineByPeriod from "./pages/admin/Indicator/VaccineByPeriod.jsx";
import VaccineByZone from "./pages/admin/Indicator/VaccineByZone.jsx";
import VaccineBySupplier from "./pages/admin/Indicator/VaccineBySupplier.jsx";
import ProductBatch from "./pages/admin/Data/Products/ProductBatch.jsx";
import Products from "./pages/admin/Data/Products/Products.jsx";
import Roles from "./pages/admin/Data/Roles.jsx";
import Transaction from "./pages/admin/Data/Transaction.jsx";

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
            element: <Indicator/>,
            children: [
              {
                index: true,
                loader: async () => {return redirect('vaccineByPeriod ')},
              },
              {
                path: 'vaccineByPeriod',
                element: <VaccineByPeriod/>
              },
              {
                path: 'vaccineByZone',
                element: <VaccineByZone/>
              },
              {
                path: 'vaccineBySupplier',
                element: <VaccineBySupplier/>
              }
            ],
          },
          {
            path: "/admin",
            element: <Admin/>,
            children: [
              {
                index: true,
                loader: async () => {return redirect('productBatch ')},
              },
              {
                path: "users",
                element: <User/>
              },
              {
                path: 'productBatch',
                element: <ProductBatch/>
              },
              {
                path: 'products',
                element: <Products/>
              },
              {
                path: 'users',
                element: <User/>
              },
              {
                path: 'transaction',
                element: <Transaction/>
              },
              {
                path: 'roles',
                element: <Roles/>
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
        path: 'newUser',
        element: <Signup/>
      }
    ]
  },
]);

export default router;
