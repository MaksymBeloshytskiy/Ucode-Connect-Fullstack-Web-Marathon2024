// Add an event listener to the form with id 'urlForm'
document.getElementById('urlForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const url = document.getElementById('urlInput').value; // Get the value of the input field with id 'urlInput'
    const contentDiv = document.getElementById('content'); // Get the element with id 'content'

    try {
        // Fetch the page using the provided URL
        const response = await fetch(`/fetch-page?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Throw an error if the network response is not ok
        }
        
        const htmlContent = await response.text(); // Get the response body as text
        contentDiv.innerHTML = `<pre>${htmlContent}</pre>`; // Set the content of 'contentDiv' to the fetched HTML content
    } catch (error) {
        contentDiv.textContent = 'Error fetching the page'; // Display an error message if there was an error fetching the page
    }
});
