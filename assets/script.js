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
  var weeklyWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&cnt=24&appid=8aff7017aa429b9bc201a6c2e43c57c4&units=metric`;

  fetch(weeklyWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      todayWeather(data, buildImageSrcFromId(data));
    });
}

function buildImageSrcFromId(data) {
  return `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function todayWeather(data, imageSrc) {
  today.innerHTML = "";
  var city = document.createElement("h3");
  var temp = document.createElement("p");
  var wind = document.createElement("p");
  var humidity = document.createElement("p");
  var weatherImage = document.createElement("img");
  weatherImage.src = imageSrc;
  city.textContent = data.name + " (" + currentDay + ")";
  temp.textContent = "Temp: " + data.main.temp + " °C";
  wind.textContent = "Wind: " + data.wind.speed + " km/h";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  today.append(city);
  today.append(weatherImage);
  today.append(temp);
  today.append(wind);
  today.append(humidity);
}

function fiveDays(lat, lon) {
  var weekWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=8aff7017aa429b9bc201a6c2e43c57c4&units=metric`;

  fetch(weekWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 1; i <= 5; i++) {
        var cardName = "card" + i;
        var card = document.getElementById(cardName);
        card.innerHTML = "";
      }
      fiveDaysForecast(data);
    });
}

function fiveDaysForecast(data) {
  var cardNum = 1;
  for (var i = 0; i < 40; i += 8) {
    var cardName = "card" + cardNum;
    var card = document.getElementById(cardName);
    var weatherImage = document.createElement("img");
    weatherImage.src = buildImageSrcFromId(data.list[i]);
    var date = document.createElement("h5");
    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    date.textContent = data.list[i].dt_txt.split(" ")[0];
    temp.textContent = "Temp: " + data.list[i].main.temp + " °C";
    wind.textContent = "Wind: " + data.list[i].wind.speed + " km/h";
    humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
    card.append(date);
    card.append(weatherImage);
    card.append(temp);
    card.append(wind);
    card.append(humidity);
    cardNum++;
  }
  return;
}

function saveLocalStorage(cityName) {
  if (!cityNames.find((n) => n === cityName)) {
    cityNames.push(cityName);
    localStorage.setItem("search", JSON.stringify(cityNames));
  }
  displayHistory(cityNames);
}

function displayHistory(cityNames) {
  var history = document.getElementById("searchHistory");
  history.textContent = "";
  cityNames.forEach((city) => {
    var name = document.createElement("button");
    name.textContent = city;
    name.onclick = function () {
      document.getElementById("Name").value = city;
      getLatLon(city);
    };

    history.append(name);
  });
}

function start() {
  var name = document.getElementById("Name").value;
  name = name.toLowerCase();
  if (name.trim() === "") {
    return;
  }
  getLatLon(name);
  saveLocalStorage(name);
}
searchButton.addEventListener("click", start);