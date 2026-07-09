import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "@/pages/Login/LoginPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import MedicinePage from "@/pages/Medicine/MedicinePage";
import SupplierPage from "@/pages/Supplier/SupplierPage";
import CustomerPage from "@/pages/Customer/CustomerPage";
import PurchasePage from "@/pages/Purchase/PurchasePage";
import SalesPage from "@/pages/Sales/SalesPage";
import AlertsPage from "@/pages/Alerts/AlertsPage";
import ReportsPage from "@/pages/Reports/ReportsPage";


function AppRoutes() {
    return (
        <Routes>

            {/* Public Route */}
            <Route
                path="/"
                element={<LoginPage />}
            />

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />
                <Route
                    path="/medicine"
                    element={<MedicinePage />}
                />
                <Route
                    path="/supplier"
                    element={<SupplierPage />}
                />
                <Route
                    path="/customer"
                    element={<CustomerPage />}
                />
                
                <Route
                    path="/purchase"
                    element={<PurchasePage />}
                />

                <Route
                    path="/sales"
                    element={<SalesPage />}
                />

                <Route
                    path="/alerts"
                    element={<AlertsPage />}
                />

                <Route
                    path="/reports"
                    element={<ReportsPage />}
                />
            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>
    );
}

export default AppRoutes;