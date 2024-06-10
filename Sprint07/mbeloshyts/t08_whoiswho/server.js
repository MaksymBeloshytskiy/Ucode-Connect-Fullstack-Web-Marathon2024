const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname));

let csvData = [];

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    csvData = [];

    // Read the uploaded CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            csvData.push(row);
        })
        .on('end', () => {
            fs.unlinkSync(filePath); // Delete the uploaded file
            res.json(csvData); // Send the parsed CSV data as response
        });
});

// Filter data based on publisher
app.get('/filter', (req, res) => {
    const publisher = req.query.publisher;
    let filteredData = csvData;

    if (publisher) {
        filteredData = filteredData.filter(row => row['Publisher'] === publisher);
    }

    res.json(filteredData); // Send the filtered data as response
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
