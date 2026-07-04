import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "@/pages/Dashboard/DashboardPage";

function AppRoutes() {
    return (
        <Routes>

            <Route 
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />

            </Route>

        </Routes>
    )
}

export default AppRoutes;
