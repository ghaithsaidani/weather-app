const apiKey = "7ab70f57b42cda602ff6f3990405443f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const card = document.querySelector(".card");
const weatherBox = document.querySelector(".weather");
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");

getWeather = async (city) => {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  let data = await response.json();
  weatherBox.style.display = "block";

  if (response.status == 404) {
    card.classList.add("error");
  }

  if (response.status == 404 || searchInput.value === "") {
    weatherBox.style.display = "none";
  }

  if (response.status == 200 && card.classList.contains("error")) {
    card.classList.remove("error");
  }

  document.querySelector(".city").innerHTML = data.name;

  document.querySelector(".celsius").innerHTML =
    Math.round(data.main.temp) + "<span>°</span>";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + " Km/h";
  document.querySelector(".humidity").innerHTML =
    Math.round(data.main.humidity) + " %";

  if (data.weather[0].main == "Clouds")
    weather_icon.src = "assets/images/clouds.png";
  else if (data.weather[0].main == "Clear")
    weather_icon.src = "assets/images/clear.png";
  else if (data.weather[0].main == "Rain")
    weather_icon.src = "assets/images/rain.png";
  else if (data.weather[0].main == "Mist")
    weather_icon.src = "assets/images/mist.png";
  else if (data.weather[0].main == "dizzle")
    weather_icon.src = "assets/images/dizzle.png";
  else if (data.weather[0].main == "Snow")
    weather_icon.src = "assets/images/snow.png";
};

searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") getWeather(searchInput.value);
});
