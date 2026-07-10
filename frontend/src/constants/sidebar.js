import {
    LayoutDashboard,
    Pill,
    Truck,
    Users,
    ShoppingCart,
    Receipt,
    FileText,
    TriangleAlert,
    Settings
} from "lucide-react";
import ROUTES from "./routes";

export const SIDEBAR_ITEMS = [
    {
        title: "Dashboard",
        path: ROUTES.DASHBOARD,
        icon: LayoutDashboard
    },
    {
        title: "Medicine",
        path: ROUTES.MEDICINE,
        icon: Pill
    },
    {
        title: "Supplier",
        path: ROUTES.SUPPLIER,
        icon: Truck
    },
    {
        title: "Customer",
        path: ROUTES.CUSTOMER,
        icon: Users
    },
    {
        title: "Purchase",
        path: ROUTES.PURCHASE,
        icon: ShoppingCart
    },
    {
        title: "Sales",
        path: ROUTES.SALES,
        icon: Receipt
    },
    {
        title: "Reports",
        path: ROUTES.REPORTS,
        icon: FileText
    },
    {
        title: "Alerts",
        path: ROUTES.ALERTS,
        icon: TriangleAlert
    },
    {
        title: "Settings",
        path: ROUTES.SETTINGS,
        icon: Settings
    }
];
