document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayData(data); // Call the displayData function to show the data
        populatePublisherFilter(data); // Call the populatePublisherFilter function to populate the publisher filter
    });
});

// Function to display the data in a table
function displayData(data) {
    const tableHeader = document.getElementById('csv-header');
    const tableBody = document.getElementById('csv-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length > 0) {
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        tableHeader.appendChild(headerRow);

        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}

// Function to populate the publisher filter dropdown
function populatePublisherFilter(data) {
    const filtersDiv = document.getElementById('filters');
    filtersDiv.innerHTML = '';

    if (data.length > 0) {
        const publishers = [...new Set(data.map(row => row['Publisher']))];
        const label = document.createElement('label');
        label.textContent = `Filter by Publisher: `;
        const select = document.createElement('select');
        select.id = 'publisher-filter';

        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'All';
        select.appendChild(allOption);

        publishers.forEach(publisher => {
            const option = document.createElement('option');
            option.value = publisher;
            option.textContent = publisher;
            select.appendChild(option);
        });

        filtersDiv.appendChild(label);
        filtersDiv.appendChild(select);

        const applyButton = document.createElement('button');
        applyButton.textContent = 'APPLY';
        applyButton.addEventListener('click', applyPublisherFilter);
        filtersDiv.appendChild(applyButton);
    }
}

// Function to apply the publisher filter
function applyPublisherFilter() {
    const selectedPublisher = document.getElementById('publisher-filter').value;
    const query = selectedPublisher ? `publisher=${selectedPublisher}` : '';
    
    fetch(`/filter?${query}`)
    .then(response => response.json())
    .then(data => {
        displayData(data); // Call the displayData function to show the filtered data
    });
}
