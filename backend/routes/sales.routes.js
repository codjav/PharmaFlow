router.get("/", getPaginatedSales);

router.post("/", createSale);

router.get("/search", searchSales);

router.get("/stats", getSalesStats);

router.get("/recent", getRecentSales);

router.get("/report", getSalesReport);

router.get("/top-medicines", getTopSellingMedicines);

router.get("/customer/:customerId", getCustomerSales);

router.patch("/:id/payment", updateSalePayment);

router.patch("/:id/mark-paid", markSalePaid);

router.get("/:id", getSaleById);

router.delete("/:id", deleteSale);

router.get("/stats", getSalesStats);

router.get("/today", getTodaySales);

router.get("/recent", getRecentSales);

router.get("/top-medicines", getTopSellingMedicines);

router.get("/monthly", getMonthlySales);

router.get("/report", getSalesReport);