document.addEventListener('DOMContentLoaded', function () {
    Papa.parse("Table_Input.csv", {
        download: true,
        header: true,
        complete: function (results) {
            displayTable1(results.data);
            processAndDisplayTable2(results.data);
        }
    });
});

function displayTable1(data) {
    const tableContainer = document.getElementById('table1-container');
    const table = document.createElement('table');
    table.className = 'table1';

    const headers = Object.keys(data[0]);
    const headerRow = table.insertRow();
    headers.forEach(header => {
        const cell = headerRow.insertCell();
        cell.textContent = header;
    });

    data.forEach(row => {
        const dataRow = table.insertRow();
        headers.forEach(header => {
            const cell = dataRow.insertCell();
            cell.textContent = row[header];
        });
    });

    tableContainer.appendChild(table);
}

function processAndDisplayTable2(data) {
    const dataDict = {};
    data.forEach(row => {
        dataDict[row['Index #']] = parseInt(row['Value'], 10);
    });

    const A5 = dataDict['A5'];
    const A20 = dataDict['A20'];
    const A15 = dataDict['A15'];
    const A7 = dataDict['A7'];
    const A13 = dataDict['A13'];
    const A12 = dataDict['A12'];

    console.log("A5:", A5);
    console.log("A20:", A20);
    console.log("A15:", A15);
    console.log("A7:", A7);
    console.log("A13:", A13);
    console.log("A12:", A12);

    if (!isNaN(A5) && !isNaN(A20) && !isNaN(A15) && !isNaN(A7) && !isNaN(A13) && !isNaN(A12)) {
        const alpha = A5 + A20;
        const beta = A15 / A7;
        const charlie = A13 * A12;

        document.getElementById('alpha-value').textContent = alpha;
        document.getElementById('beta-value').textContent = beta.toFixed(2);
        document.getElementById('charlie-value').textContent = charlie;
    } else {
        console.error("One or more values could not be parsed. Please check the CSV data.");
    }
}

