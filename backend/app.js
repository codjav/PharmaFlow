import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import reportRoutes from "./routes/report.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import categoryRoutes from "./routes/category.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import notFoundMiddleware from "./middleware/notFound.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/category", categoryRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;