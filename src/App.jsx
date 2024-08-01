import { useState } from "react";
import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tabel from "./page/tabel";
import Create from "./page/create";
import Edit from "./page/edit";
const page = createBrowserRouter([
  {
    path: "/",
    element: <Tabel />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);
function App() {
  return <RouterProvider router={page} />;
}

export default App;
