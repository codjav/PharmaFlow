import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export const exportPDF = (

    title,

    data

) => {

    if (!data.length) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(title, 14, 18);

    const headers = [

        Object.keys(data[0])

    ];

    const rows = data.map(row =>

        Object.values(row)

    );

    autoTable(doc, {

        head: headers,

        body: rows,

        startY: 28,

    });

    doc.save(`${title}.pdf`);

};