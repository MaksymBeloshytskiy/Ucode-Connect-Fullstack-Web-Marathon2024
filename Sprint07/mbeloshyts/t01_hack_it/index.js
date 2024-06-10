// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', async () => {
    const password = document.getElementById('password').value;
    const salt = document.getElementById('salt').value;
    const response = await fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, salt }),
    });
    const data = await response.json();
    if (data.success) {
        // Password saved successfully
        document.getElementById('status').innerText = 'Password saved at session.';
        document.getElementById('hash').innerText = data.hash;
        document.getElementById('save-form').style.display = 'none';
        document.getElementById('check-form').style.display = 'block';
        document.getElementById('message').innerText = ''; // Clear any previous message
    }
});

// Event listener for the check button
document.getElementById('check-btn').addEventListener('click', async () => {
    const password = document.getElementById('guess-password').value;
    const response = await fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (data.success) {
        // Password guessed correctly
        document.getElementById('message').innerText = 'Hacked!';
        document.getElementById('message').className = 'success';
        // Reset all fields
        document.getElementById('password').value = '';
        document.getElementById('salt').value = '';
        document.getElementById('guess-password').value = '';
        document.getElementById('save-form').style.display = 'block';
        document.getElementById('check-form').style.display = 'none';
        document.getElementById('status').innerText = 'Password not saved at session.';
    } else {
        // Password guessed incorrectly
        document.getElementById('message').innerText = 'Access denied!';
        document.getElementById('message').className = 'error';
    }
});

// Event listener for the clear button
document.getElementById('clear-btn').addEventListener('click', async () => {
    await fetch('/clear', { method: 'POST' });
    document.getElementById('status').innerText = 'Password not saved at session.';
    document.getElementById('save-form').style.display = 'block';
    document.getElementById('check-form').style.display = 'none';
    // Reset all fields
    document.getElementById('password').value = '';
    document.getElementById('salt').value = '';
    document.getElementById('guess-password').value = '';
    document.getElementById('message').innerText = ''; // Clear any previous message
});
