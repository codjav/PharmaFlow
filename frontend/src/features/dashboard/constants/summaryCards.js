import {
    Pill,
    Users,
    Truck,
    IndianRupee,
    ShoppingCart,
} from "lucide-react";

export default [

    {
        title: "Total Medicines",
        key: "totalMedicines",
        icon: Pill,
        color: "blue",
    },

    {
        title: "Total Customers",
        key: "totalCustomers",
        icon: Users,
        color: "green",
    },

    {
        title: "Total Suppliers",
        key: "totalSuppliers",
        icon: Truck,
        color: "amber",
    },

    {
        title: "Total Sales",
        key: "totalSales",
        icon: IndianRupee,
        prefix: "₹",
        color: "purple",
    },

    {
        title: "Total Purchases",
        key: "totalPurchases",
        icon: ShoppingCart,
        prefix: "₹",
        color: "rose",
    },

];