const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const File = require('./File.js');
const FileList = require('./FileList.js');

const app = express();
const PORT = 3000;
const tmpDir = path.join(__dirname, 'tmp');

// Function to create tmp directory if it doesn't exist
const createTmpDirIfNotExists = async () => {
    try {
        await fs.access(tmpDir);
    } catch (error) {
        // If tmp directory doesn't exist, create it
        await fs.mkdir(tmpDir);
        console.log('Created tmp directory.');
    }
};

// Check if tmp directory exists when server starts up
createTmpDirIfNotExists()
    .then(() => {
        // Start the server after tmp directory check
        app.use(express.json());

        // Serve index.html for root path
        app.get('/', (req, res) => {
            // Check if a file is selected
            const selectedFile = req.query.file;
            
            // If a file is selected, read its content and serve index.html with the content
            if (selectedFile) {
                const filePath = path.join(tmpDir, selectedFile);
                fs.readFile(filePath, 'utf8')
                    .then(data => {
                        // Read the file content and pass it to index.html as a query parameter
                        res.sendFile(path.join(__dirname, 'index.html') + `?content=${encodeURIComponent(data)}`);
                    })
                    .catch(err => {
                        console.error(`Error reading file '${selectedFile}':`, err);
                        res.sendStatus(500);
                    });
            } else {
                // If no file is selected, serve index.html without content
                res.sendFile(path.join(__dirname, 'index.html'));
            }
        });

        // Serve index.js
        app.get('/index.js', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.js'));
        });

        // Handle file creation request
        app.post('/create-file', (req, res) => {
            const { filename, content } = req.body;
            const filePath = path.join(tmpDir, filename);
        
            fs.appendFile(filePath, content)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    res.sendStatus(500);
                });
        });

        // Handle file selection request
        app.get('/read-file', (req, res) => {
            const filename = req.query.filename;
            const filePath = path.join(tmpDir, filename);
        
            fs.readFile(filePath, 'utf8')
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    console.error(`Error reading file '${filename}':`, err);
                    res.sendStatus(500);
                });
        });

        // Handle file deletion request
        app.post('/delete-file', (req, res) => {
            const filename = req.body.filename;
            const filePath = path.join(tmpDir, filename);
        
            fs.unlink(filePath)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    res.sendStatus(500);
                });
        });

        // Handle request for list of files
        app.get('/list-files', (req, res) => {
            fs.readdir(tmpDir)
                .then(files => {
                    res.json(files);
                })
                .catch(err => {
                    res.sendStatus(500);
                });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error checking tmp directory:', error);
    });
