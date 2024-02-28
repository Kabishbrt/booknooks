// AdminRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./components/Admin/Admin";
import { ManageBooks } from "./components/Admin/ManageBooks";
import { ManageOrders } from "./components/Admin/ManageOrders";
import { ManageUsers } from "./components/Admin/ManageUsers";
import { AdminNav } from "./components/Admin/AdminNav";

const AdminRoutes = () => {
  return (
    <>
    <AdminNav/>
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/managebooks" element={<ManageBooks />} />
      <Route path="/manageorders" element={<ManageOrders />} />
      <Route path="/manageusers" element={<ManageUsers />} />
    </Routes>
    </>
  );
};

export default AdminRoutes;
