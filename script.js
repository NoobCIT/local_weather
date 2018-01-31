var x = document.getElementById("location");
var coordLong;
var coordLat;
//get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getWeather(lat, long) {
  const endpoint = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${endpoint}lat=${lat}&lon=${long}`, { method: "GET" })
    .then(response => response.json())
    .then(data => { weatherData(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function weatherData(name, weather, temp) {
  document.getElementById("location").innerHTML = name;
  document.getElementById("appearance").innerHTML = `<img src="${weather[0].icon}">`;
  document.getElementById("temperature").innerHTML = Math.round(temp);
}

function cToF(celsius) {
  return Math.round(celsius*(9/5) + 32);
}

function fToC(fahrenheit) {
  return Math.round((fahrenheit - 32)*(5/9));
}

function tempToggle() {
  var temps = document.getElementById("temperature");
  var units = document.getElementById("unit");
  if (units.innerHTML == "C") {
    temps.innerHTML = cToF(temps.innerHTML);
    units.innerHTML = "F";
  } else {
    temps.innerHTML = fToC(temps.innerHTML);
    units.innerHTML = "C";
  }
}

const convert = document.getElementById("converter")
convert.addEventListener("click", tempToggle)

window.onload = function() {
  getLocation();
};
