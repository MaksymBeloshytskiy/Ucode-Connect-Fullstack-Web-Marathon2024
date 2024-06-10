document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recruitment-form');
    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photo-preview');
    const removePhotoBtn = document.getElementById('remove-photo');
    const errorMessage = document.createElement('div');
    errorMessage.id = 'error-message';

    form.addEventListener('submit', e => {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
    });

    photoInput.addEventListener('change', () => {
        displayPhotoPreview();
    });

    removePhotoBtn.addEventListener('click', () => {
        removePhoto();
    });

    // Function to validate the form
    function validateForm() {
        const email = document.getElementById('email').value;
        const age = document.getElementById('age').value;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            displayErrorMessage('Invalid email address');
            return false;
        }

        if (age < 18) {
            displayErrorMessage('Age must be at least 18');
            return false;
        }

        return true;
    }

    // Function to display a preview of the selected photo
    function displayPhotoPreview() {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxDimension = 128;

                    // Calculate new dimensions
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > maxDimension) {
                            height *= maxDimension / width;
                            width = maxDimension;
                        }
                    } else {
                        if (height > maxDimension) {
                            width *= maxDimension / height;
                            height = maxDimension;
                        }
                    }

                    // Resize image
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Display resized image
                    photoPreview.innerHTML = '';
                    const resizedImg = document.createElement('img');
                    resizedImg.src = canvas.toDataURL('image/png');
                    resizedImg.alt = 'Uploaded Photo';
                    photoPreview.appendChild(resizedImg);
                    removePhotoBtn.style.display = 'inline-block';
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Function to remove the selected photo
    function removePhoto() {
        photoInput.value = '';
        photoPreview.innerHTML = '';
        removePhotoBtn.style.display = 'none';
    }

    // Function to display an error message
    function displayErrorMessage(message) {
        errorMessage.textContent = message;
        form.insertBefore(errorMessage, form.firstChild);
    }
});
