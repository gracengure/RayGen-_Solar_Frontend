// main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Outlet } from 'react-router-dom';

import HomePage from "./Components/HomePage.jsx";
import Signup from './Components/Auth/Signup.jsx';
import Login from './Components/Auth/Login.jsx';
import ProductsSpecs from "./Components/ProductsSpecs.jsx";
import About from "./About.jsx";
import UserProfile from "./Components/UserProfile.jsx";
import Verification from "./Components/Auth/verification.jsx";
import Cart from "./Components/cart.jsx"; 
import ProductsPage from "./Components/ProductsPage.jsx";

// Admin Dashboard Components
import Dashboard from "./Components/Admin Dashboard/Dashboard.jsx";
import Products from "./Components/Admin Dashboard/Products.jsx";
import Orders from "./Components/Admin Dashboard/Orders.jsx";
import Customers from "./Components/Admin Dashboard/Customers.jsx";
import Home from "./Components/Admin Dashboard/Home.jsx";



// Define the router configuration
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/productspage",
    element: <ProductsPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verification />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: <Cart />, 
  },
  {
    path: "/product/:productId",
    element:  
    <ProductsSpecs />
  
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/dashboard",
    element: <Outlet />,
    children: [
      {
        path: "home",
        element: <Dashboard />, 
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  }
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);