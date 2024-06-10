document.addEventListener("DOMContentLoaded", function() {
    // Select all lazy-loading images
    const lazyloadImages = document.querySelectorAll("img.lazy");

    // Timeout variable for throttling
    let lazyloadThrottleTimeout;

    // Get the element with id 'now'
    const nowElement = document.getElementById('now');

    // Get all img elements
    const images = document.getElementsByTagName('img');

    // Flag to check if all lazy-loading images have been loaded
    let check = true;

    // Function to lazy load images
    function lazyload() {
        // Clear the throttle timeout if it exists
        if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
        }

        // Set a new throttle timeout
        lazyloadThrottleTimeout = setTimeout(function() {
            // Get the current scroll position
            const scrollTop = window.pageYOffset;

            // Loop through each lazy-loading image
            Array.from(lazyloadImages).forEach(function(img) {
                // Check if the image is in the viewport
                if (img.offsetTop < (window.innerHeight + scrollTop)) {
                    // Load the image by setting its src attribute
                    img.src = img.dataset.src;

                    // Remove the 'lazy' class from the image
                    img.classList.remove('lazy');

                    // Get all elements with the 'lazy' class
                    const collection = document.getElementsByClassName('lazy');

                    // Update the 'now' element with the remaining number of lazy-loading images
                    nowElement.innerHTML = '';
                    nowElement.insertAdjacentHTML('beforeend', `${images.length - collection.length}`);

                    // Check if all lazy-loading images have been loaded
                    if (check && collection.length === 0) {
                        check = false;

                        // Get the first <p> element
                        const pElement = document.getElementsByTagName('p')[0];

                        // Add the 'done' class to the <p> element
                        pElement.classList.add('done');

                        // Hide the <p> element after 3 seconds
                        setTimeout(function() {
                            pElement.style.display = 'none';
                        }, 3000);
                    }
                }
            });

            // Remove event listeners if all lazy-loading images have been loaded
            if (lazyloadImages.length === 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
    }

    // Add event listeners for scroll, resize, and orientation change
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
});
