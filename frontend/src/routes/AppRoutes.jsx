import { Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<div>Login</div>} />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
        </Routes>
    )
}

export default AppRoutes;
