function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#weather-city");
  city.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#city-search");
searchFormElement.addEventListener("submit", displayCity);
