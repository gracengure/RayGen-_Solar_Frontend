import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/HomePage.jsx"
import Signup from './Components/Auth/Signup.jsx';
import Login from './Components/Auth/Login.jsx';
import ProductsSpecs from "./Components/ProductsSpecs.jsx"
import About from "./About.jsx";
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },{
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: < Signup/>,
  },
  {
    path: "/product/:productId", 
    element: <ProductsSpecs />, 
  },
  {
    path: "/about",
    element: <About />,
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);