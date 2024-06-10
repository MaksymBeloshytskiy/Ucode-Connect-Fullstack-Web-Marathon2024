// Add an event listener to the form with the id 'quiz-form'
document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a new FormData object from the form
    const formData = new FormData(this);

    // Convert the form data into URL-encoded format
    const data = new URLSearchParams(formData);

    // Send a POST request to the '/submit' endpoint with the form data
    fetch('/submit', {
        method: 'POST',
        body: data
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(result => {
        // Update the 'result' element with the message from the response
        document.getElementById('result').textContent = result.message;
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors that occur during the request
    });
});
