const searchButton = document.getElementById("submit");
var currentDay = moment().format("MM/D/Y");

const cityNames = localStorage.search ? JSON.parse(localStorage.search) : [];
displayHistory(cityNames);

function getLatLon(cityName) {
  var latLon =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&cnt=24&appid=8aff7017aa429b9bc201a6c2e43c57c4";

  fetch(latLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.length == 0) {
        return;
      }
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
      fiveDays(lat, lon);
    });
}

function getWeather(lat, lon) {
  var nextFive = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=24&appid=8aff7017aa429b9bc201a6c2e43c57c4&units=metric`;

  fetch(nextFive)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      todayWeather(data, buildImageSrcFromId(data));
    });
}

