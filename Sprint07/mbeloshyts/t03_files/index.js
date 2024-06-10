document.addEventListener('DOMContentLoaded', () => {
    const fileForm = document.getElementById('fileForm');
    const fileListDiv = document.getElementById('fileList');
    const currentFileSection = document.getElementById('currentFile');
    const currentFileName = document.getElementById('currentFileName');
    const currentFileContent = document.getElementById('currentFileContent');
    const deleteFileButton = document.getElementById('deleteFile');

    // Hide the current file section initially
    currentFileSection.style.display = 'none';

    // Function to show delete button and current file section
    function showFileInfo(filename, content) {
        currentFileName.textContent = filename;
        currentFileContent.textContent = content;
        currentFileSection.style.display = 'block';
    }

    // Function to hide delete button and current file section
    function hideFileInfo() {
        currentFileName.textContent = '';
        currentFileContent.textContent = '';
        currentFileSection.style.display = 'none';
    }

    // Event listener for file selection
    fileList.addEventListener('click', function(event) {
        // Check if a file link was clicked
        if (event.target.tagName === 'A') {
            // Prevent default link behavior
            event.preventDefault();
            // Get the filename from the link
            const filename = event.target.textContent;
            // Fetch content of the selected file using AJAX
            fetch(`/read-file?filename=${filename}`)
                .then(response => response.text())
                .then(content => {
                    // Show file info in the current file section
                    showFileInfo(filename, content);
                })
                .catch(error => {
                    console.error('Error fetching file content:', error);
                    // Hide file info if an error occurs
                    hideFileInfo();
                });
        }
    });

    // Event listener for delete button
    deleteFileButton.addEventListener('click', function() {
        const filename = currentFileName.textContent;
        if (filename) {
            // Send request to delete the file
            fetch('/delete-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename: filename })
            })
            .then(response => {
                if (response.ok) {
                    // If file deleted successfully, hide file info
                    hideFileInfo();
                } else {
                    console.error('Error deleting file:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error deleting file:', error);
            });
        }
    });
    
    // Function to fetch and display the list of files
    const refreshFileList = () => {
        fetch('/list-files')
            .then(response => response.json())
            .then(files => {
                fileListDiv.innerHTML = files.map(file => `<a href="#" class="fileLink" data-filename="${file}">${file}</a><br>`).join('');
            });
    };

    // Function to handle file selection
    const selectFile = (filename) => {
        fetch(`/read-file?filename=${filename}`)
            .then(response => response.text())
            .then(content => {
                currentFileName.textContent = filename;
                currentFileContent.textContent = content;
            });
    };

    // Function to handle file deletion
    const deleteFile = (filename) => {
        fetch('/delete-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename })
        })
        .then(() => {
            currentFileName.textContent = '';
            currentFileContent.textContent = '';
            refreshFileList();
        });
    };

    // Event listener for file creation form submission
    fileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(fileForm);
        const filename = formData.get('filename');
        const content = formData.get('content');
        fetch('/create-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename, content })
        })
        .then(() => {
            fileForm.reset();
            refreshFileList();
        });
    });

    // Event delegation for file selection
    fileListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('fileLink')) {
            const filename = event.target.dataset.filename;
            selectFile(filename);
        }
    });

    // Event listener for file deletion
    deleteFileButton.addEventListener('click', () => {
        const filename = currentFileName.textContent;
        if (filename) {
            deleteFile(filename);
        }
    });

    // Initial setup: load file list
    refreshFileList();
});
