window.onload = function() {
    // Get the current timestamp
    var currentTime = new Date().getTime();

    // Check if a cookie exists for page load count
    var cookieName = "pageLoadCount";
    var cookieValue = getCookie(cookieName);

    console.log("Initial Cookie Value:", cookieValue);

    if (cookieValue !== "") {
        // Parse the stored value from the cookie
        var loadTime = parseInt(cookieValue);
        console.log("Load Time:", loadTime);
        
        // Get the current count from the cookie
        var loadCount = parseInt(getCookie("pageLoadCountCount"));
        console.log("Load Count:", loadCount);
        
        // Check if a minute has passed since the last load
        if (currentTime - loadTime >= 60000) {
            // Reset the count and load time
            loadCount = 1;
            loadTime = currentTime;
        } else {
            // Increment the count
            loadCount++;
        }
    } else {
        // If no cookie exists, initialize the count and load time
        var loadCount = 1;
        var loadTime = currentTime;
    }

    // Update the cookie with the new count and current time
    document.cookie = cookieName + "=" + loadTime + "; expires=" + new Date(loadTime + 60000).toUTCString() + "; path=/";
    document.cookie = "pageLoadCountCount=" + loadCount + "; path=/";

    console.log("Updated Load Time:", loadTime);
    console.log("Updated Load Count:", loadCount);

    // Update the page with the latest count
    document.getElementById("loadCount").textContent = loadCount;

    // Check every second if a minute has passed and reset the counter
    setInterval(function() {
        var currentTime = new Date().getTime();
        var cookieValue = getCookie(cookieName);
        
        if (cookieValue !== "") {
            var loadTime = parseInt(cookieValue);
            if (currentTime - loadTime >= 60000) {
                // Reset the count and load time
                loadCount = 0;
                loadTime = currentTime;
                
                // Update the cookie with the new count and current time
                document.cookie = cookieName + "=" + loadTime + "; expires=" + new Date(loadTime + 60000).toUTCString() + "; path=/";
                document.cookie = "pageLoadCountCount=" + loadCount + "; path=/";

                // Update the page with the latest count
                document.getElementById("loadCount").textContent = loadCount;
            }
        }
    }, 1000); // Check every second
};

// Function to get the value of a cookie by its name
function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
