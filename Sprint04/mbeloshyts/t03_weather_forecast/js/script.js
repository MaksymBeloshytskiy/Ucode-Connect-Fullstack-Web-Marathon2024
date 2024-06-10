document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '15aab651bdda454a5072ccf50dadd393'; // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
    const defaultCity = 'London'; // Default city for forecast

    // Function to fetch weather forecast data
    function fetchWeatherForecast(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayWeatherForecast(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the weather forecast:', error);
            });
    }

    // Function to display weather forecast
    function displayWeatherForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';

        // Add location description
        const location = data.city.name + ', ' + data.city.country;
        document.getElementById('location').textContent = location;

        // Create an object to store weather data for each unique day
        const dailyForecast = {};

        data.list.forEach(item => {
            // Extract the date (without time) from the dt_txt field
            const date = new Date(item.dt_txt.split(' ')[0]);

            // Format the date as "Day of Week, Month Day"
            const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

            // If the day doesn't exist in the dailyForecast object, add it
            if (!dailyForecast[date]) {
                dailyForecast[date] = {
                    date: formattedDate,
                    temperature: Math.round(item.main.temp),
                    weatherDescription: item.weather[0].description,
                    weatherIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
                };
            }
        });

        // Iterate over unique days and create forecast items
        Object.values(dailyForecast).forEach(dayData => {
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <h3>${dayData.date}</h3>
                <p>${dayData.weatherDescription}</p>
                <img src="${dayData.weatherIcon}" alt="">
                <p>${dayData.temperature}°C</p>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }

    // Fetch weather forecast for the default city
    fetchWeatherForecast(defaultCity);
});
