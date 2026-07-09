export const printReport = (
    title,
    data
) => {

    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const rows = data.map(item =>

        `<tr>

            ${headers
                .map(h => `<td>${item[h]}</td>`)
                .join("")}

        </tr>`

    ).join("");

    const html = `

    <html>

    <head>

        <title>${title}</title>

        <style>

            body{
                font-family:Arial;
                padding:30px;
            }

            table{

                width:100%;
                border-collapse:collapse;

            }

            th,td{

                border:1px solid #ccc;

                padding:8px;

                text-align:left;

            }

            th{

                background:#f5f5f5;

            }

        </style>

    </head>

    <body>

        <h2>${title}</h2>

        <table>

            <thead>

                <tr>

                    ${headers.map(h=>`<th>${h}</th>`).join("")}

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </body>

    </html>

    `;

    const win = window.open("");

    win.document.write(html);

    win.document.close();

    win.print();

};