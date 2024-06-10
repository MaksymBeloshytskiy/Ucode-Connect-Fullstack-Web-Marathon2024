document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.createElement('tbody');
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableRow = document.createElement('tr');
    const headers = ['Superhero', 'Strength', 'Age'];

    // Create table headers
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.addEventListener('click', () => sortTable(headerText));
        tableRow.appendChild(th);
    });

    // Append headers row to table head
    tableHead.appendChild(tableRow);
    table.appendChild(tableHead);

    // Create table rows with data
    const superheroes = [
        { name: 'Iron Man', strength: 90, age: 45 },
        { name: 'Spider-Man', strength: 70, age: 25 },
        { name: 'Captain America', strength: 80, age: 100 },
        { name: 'Thor', strength: 95, age: 1000 },
        { name: 'Hulk', strength: 100, age: 50 },
        { name: 'Black Widow', strength: 75, age: 35 },
        { name: 'Black Panther', strength: 85, age: 45 },
        { name: 'Doctor Strange', strength: 85, age: 40 },
        { name: 'Ant-Man', strength: 60, age: 40 },
        { name: 'Scarlet Witch', strength: 80, age: 30 }
    ];

    superheroes.forEach(hero => {
        const row = document.createElement('tr');
        Object.values(hero).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    // Append table body to table
    table.appendChild(tableBody);

    // Append table to main content
    const main = document.querySelector('main');
    main.appendChild(table);
});

function sortTable(column) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const columnIndex = Array.from(table.querySelector('thead').querySelectorAll('th')).findIndex(th => th.textContent === column);
    
    // Check the current sort order of the column
    let sortOrder = table.querySelector('thead').querySelectorAll('th')[columnIndex].getAttribute('data-sort-order') || 'ASC';

    // Update sort order to toggle between ASC and DESC
    sortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';

    // Update data-sort-order attribute in all table headers
    table.querySelector('thead').querySelectorAll('th').forEach(th => {
        th.removeAttribute('data-sort-order');
    });
    table.querySelector('thead').querySelectorAll('th')[columnIndex].setAttribute('data-sort-order', sortOrder);

    // Sort the rows based on the column value and sort order
    rows.sort((a, b) => {
        let aValue = a.querySelectorAll('td')[columnIndex].textContent;
        let bValue = b.querySelectorAll('td')[columnIndex].textContent;

        // If sorting by Superhero name, use localeCompare for string comparison
        if (column === 'Superhero') {
            return sortOrder === 'ASC' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        // Convert age and strength values to numbers for correct comparison
        if (column === 'Strength' || column === 'Age') {
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
        }

        return sortOrder === 'ASC' ? aValue - bValue : bValue - aValue;
    });

    // Re-render the sorted rows in the table body
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));

    // Update notification message
    const notification = document.getElementById('notification');
    notification.textContent = `Sorting by ${column}, order: ${sortOrder}`;
}

