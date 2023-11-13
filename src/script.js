function updateWeatherData(response) {
  let cityTemperature = document.querySelector("#weather-degrees");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-city");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherHumidity = document.querySelector("#weather-humidity");
  let weatherWind = document.querySelector("#weather-wind");
  let currentTime = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon">`;

  city.innerHTML = response.data.city;
  weatherDescription.innerHTML = response.data.condition.description;
  weatherHumidity.innerHTML = response.data.temperature.humidity;
  weatherWind.innerHTML = response.data.wind.speed;
  currentTime.innerHTML = getTheDate(date);
  cityTemperature.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function getTheDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "025000aa1bof6148etc27f34c35bd48a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "025000aa1bof6148etc27f34c35bd48a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div>
        <div class="forecast-day">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="forecast-icon">
        <div class="forecast-temperature"><strong class="forecast-temperature-max">${Math.round(
          day.temperature.maximum
        )}</strong> | <span class="forecast-temperature-min">${Math.round(
          day.temperature.minimum
        )}</span></div>
    </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", displayCity);

searchCity("Oslo");
