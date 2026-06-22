import db from "../config/db.js";
import AppError from "../utils/AppError.js";
import PDFDocument from "pdfkit";

// GET /api/sales/:id/invoice
// Get invoice by id
export const getInvoiceBySaleId = (saleId) => {
    const sale = db.prepare(`
        SELECT 
            s.*,
            c.name customer_name,
            c.phone,
            c.address
        FROM sales s
        LEFT JOIN customers c
        ON s.customer_id = c.id
        WHERE s.id = ?
    `).get(saleId);

    if(!sale) {
        throw new AppError(
            "Invoice not found",
            404
        );
    }

    const items = db.prepare(`
        SELECT 
            si.*,
            m.name medicine_name
        FROM sale_items si,
        JOIN medicines m
        ON si.medicine_id = m.id
        WHERE si.sale_id = ?
    `).all(saleId);

    return {
        pharmacy: {
            name: "Advance Medical Store",
            phone: "9565573505",
            address: "Dadhiram Road, Pandari, Mirzapur"
        },
        sale,
        items
    };
};


// GET /api/sales/:id/thermal
// Thermal invoice
export const generateThermalInvoice = (saleId) => {
    const invoice = getInvoiceBySaleId(saleId);

    return {
        width: "3-inch",
        ...invoice
    };
};


// GET /api/sales/:id/a4
// A4 invoice
export const generateA4Invoice = (saleId) => {
    const invoice = getInvoiceBySaleId(saleId);

    return {
        pageSize: "A4",
        ...invoice
    };
};


// GET /api/sales/:id/pdf
// Download pdf
export const generatePDF = (
    saleId,
    res
) => {
    const invoice = getInvoiceBySaleId(saleId);
    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${invoice.sale.invoice_number}.pdf`
    );

    doc.pipe(res);
    doc.fontSize(20)
        .text(
            invoice.pharmacy.name,
            {
                align: "center"
            }
        );
    doc.moveDown();
    doc.text(
        `Invoice No: ${invoice.sale.invoice_number}`
    );
    doc.text(
        `Customer: ${invoice.sale.customer_name}`
    );
    doc.moveDown();
    invoice.items.forEach(item => {
        doc.text(
            `${item.medicine_name}
            ${item.quantity}
            ×
            ${item.unit_price}
            =
            ${item.total}`
        );
    });

    doc.moveDown();
    doc.text(
        `Total Amount: ₹${invoice.sale.total_amount}`
    );

    doc.end();
};
