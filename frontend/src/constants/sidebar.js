import {
    LayoutDashboard,
    Pill,
    Truck,
    Users,
    ShoppingCart,
    Receipt,
    FileText,
    TriangleAlert,
    Settings,
    LogOut
} from "lucide-react";

export const SIDEBAR_ITEMS = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Medicine",
        path: "/medicine",
        icon: Pill
    },
    {
        title: "Supplier",
        path: "/supplier",
        icon: Truck
    },
    {
        title: "Customer",
        path: "/customer",
        icon: Users
    },
    {
        title: "Purchase",
        path: "/purchase",
        icon: ShoppingCart
    },
    {
        title: "Sales",
        path: "/sales",
        icon: Receipt
    },
    {
        title: "Reports",
        path: "/reports",
        icon: FileText
    },
    {
        title: "Alerts",
        path: "/alerts",
        icon: TriangleAlert
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings
    },
    {
        title: "Logout",
        path: "/logout",
        icon: LogOut
    }
];
