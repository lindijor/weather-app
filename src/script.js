function updateWeatherData(response) {
  let cityTemperature = document.querySelector("#weather-degrees");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#weather-city");

  city.innerHTML = response.data.city;
  cityTemperature.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", displayCity);

searchCity("Oslo");
