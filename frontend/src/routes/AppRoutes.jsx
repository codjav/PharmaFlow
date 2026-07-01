import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes;
