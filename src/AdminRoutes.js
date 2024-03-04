// AdminRoutes.js
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Admin } from "./components/Admin/Admin";
import { ManageBooks } from "./components/Admin/ManageBooks";
import { ManageOrders } from "./components/Admin/ManageOrders";
import { ManageUsers } from "./components/Admin/ManageUsers";
import { AdminNav } from "./components/Admin/AdminNav";
import { PaymentModal } from "./components/Admin/PaymentModal";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, Initializing } = useSelector(
    (state) => state.auth
  );
  if(Initializing===false && isAuthenticated===false){
    navigate('/login');
  }

  if (Initializing === false) {
    if (isAuthenticated && isAdmin) {
      return (
        <>  
          <AdminNav />
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/managebooks" element={<ManageBooks />} />
            <Route path="/manageorders" element={<ManageOrders />} />
            <Route path="/manageusers" element={<ManageUsers />} />
            <Route
              path="/manageorders/payment/:orderId"
              element={<PaymentModal />}
            />
          </Routes>
        </>
      );
    } else {
      // specific routes ko laagi
      const currentRoute = window.location.pathname;

      if (currentRoute.startsWith("/managebooks") || 
          currentRoute.startsWith("/manageorders") || 
          currentRoute.startsWith("/manageusers") || 
          currentRoute.startsWith("/manageorders/payment")) {
        return <Navigate to="/" />;
      }

      return <h2>Not Authorized</h2>;
    }
  } else {
    return <h2>Loading</h2>;
  }
};

export default AdminRoutes;
