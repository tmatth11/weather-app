// Form Elements
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");

// Containers
const weatherContainer = document.getElementById("weather-container");
const errorContainer = document.getElementById("error-container");

// Weather Data
const cityDisplay = document.getElementById("city-display");
const tempDisplay = document.getElementById("temp-display");
const humidityDisplay = document.getElementById("humidity-display");
const descDisplay = document.getElementById("desc-display");
const weatherEmoji = document.getElementById("weather-emoji");

// API Key
const apiKey = "";

// Form Event Listener
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            weatherContainer.classList.replace("flex", "hidden");
            errorContainer.classList.replace("hidden", "flex");
        }
    }
    else {
        weatherContainer.classList.replace("flex", "hidden");
        errorContainer.classList.replace("hidden", "flex");
    }
});

// Fetch Weather Data from OpenWeather API
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

// Display Weather Data
function displayWeatherInfo(data) {
    errorContainer.classList.replace("flex", "hidden");
    console.log(data);
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    weatherContainer.classList.replace("hidden", "flex");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273) * 9 / 5 + 32).toFixed(1)}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = capitalizeWords(description);
    weatherEmoji.textContent = getWeatherEmoji(id);
}

// Get Weather Emoji for Weather ID
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

// Capitalize the First Letter of Each Word
function capitalizeWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}