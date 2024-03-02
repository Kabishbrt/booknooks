// AdminRoutes.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Admin } from "./components/Admin/Admin";
import { ManageBooks } from "./components/Admin/ManageBooks";
import { ManageOrders } from "./components/Admin/ManageOrders";
import { ManageUsers } from "./components/Admin/ManageUsers";
import { AdminNav } from "./components/Admin/AdminNav";
import { PaymentModal } from "./components/Admin/PaymentModal";
import {useSelector} from "react-redux"

const AdminRoutes = () => {
  const {isAuthenticated} = useSelector((state)=>(state.auth));
  if(isAuthenticated ==true){

    return (
      <>
      <AdminNav/>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/managebooks" element={<ManageBooks />} />
        <Route path="/manageorders" element={<ManageOrders />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/manageorders/payment/:orderId" element={<PaymentModal />} />
      </Routes>
      </>
    );
  }else{
    <Navigate to='/'/>
  }
};

export default AdminRoutes;
