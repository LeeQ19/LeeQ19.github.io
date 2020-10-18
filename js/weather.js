const apiKey = "165f82fa18b7d7f6a870713f8722c6b8",
weatherApi = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather");

function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coords = {
    lat,
    lon
  };
  localStorage.setItem("coords", JSON.stringify(coords));
  getWeather(coords);
}

function handleGeoFailure() {
  console.log("no location");
}

function getWeather(coords) {
  fetch(`${weatherApi}lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(json => {
      const name = json.name;
      const temperature = json.main.temp;
      weather.innerText = `${Math.round(temperature * 10) / 10}°C @${name}`;
    });
}

function loadWeather() {
  const currentCoords = localStorage.getItem("coords");
  if (currentCoords !== null) {
    const parsedCoords = JSON.parse(currentCoords);
    getWeather(parsedCoords);
  } else {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailure);
  }
}

function init() {
  loadWeather();
}

init();