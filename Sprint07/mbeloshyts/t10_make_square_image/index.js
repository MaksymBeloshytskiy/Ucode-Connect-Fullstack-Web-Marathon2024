// Add event listener to the form submit event
document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var imageUrl = document.getElementById('imageUrl').value;
    if (imageUrl) {
        loadImage(imageUrl);
    }
});

// Function to load and process the image
function loadImage(url) {
    var imageUrl = `/proxy-image?url=${encodeURIComponent(url)}`;
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        // Create a canvas element
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, size, size, 0, 0, size, size);
        // Create a new image element for the square image
        var squareImage = new Image();
        squareImage.src = canvas.toDataURL();
        squareImage.onload = function() {
            // Extract the red, green, and blue channels from the square image
            var rChannel = extractChannel(squareImage, 'red');
            var gChannel = extractChannel(squareImage, 'green');
            var bChannel = extractChannel(squareImage, 'blue');
            // Display the original image and the channel images
            displayImages(squareImage, rChannel, gChannel, bChannel);
        };
    };
    img.src = imageUrl;
}

// Function to extract a specific channel from an image
function extractChannel(image, channel) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (channel === 'red') {
            data[i + 1] = 0;
            data[i + 2] = 0;
        } else if (channel === 'green') {
            data[i] = 0;
            data[i + 2] = 0;
        } else if (channel === 'blue') {
            data[i] = 0;
            data[i + 1] = 0;
        }
    }
    ctx.putImageData(imageData, 0, 0);
    var channelImage = new Image();
    channelImage.src = canvas.toDataURL();
    return channelImage;
}

// Function to display the images on the page
function displayImages(originalImage, rChannel, gChannel, bChannel) {
    var container = document.getElementById('imageContainer');
    container.innerHTML = '';
    container.appendChild(originalImage);
    container.appendChild(rChannel);
    container.appendChild(gChannel);
    container.appendChild(bChannel);
}
