export const exportCSV = (
    data,
    filename = "report.csv"
) => {

    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const csvRows = [];

    csvRows.push(headers.join(","));

    data.forEach(row => {

        csvRows.push(

            headers
                .map(h => `"${row[h] ?? ""}"`)
                .join(",")

        );

    });

    const blob = new Blob(
        [csvRows.join("\n")],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    link.click();

    URL.revokeObjectURL(url);

};