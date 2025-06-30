const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",  // Replace with your API key
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // Change background based on weather condition
  changeBackground(weather.weather[0].main, weather.main.temp);
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function changeBackground(weatherCondition, temperature) {
  const body = document.querySelector('body');
  let backgroundImage = '';

  if (weatherCondition === 'Clear') {
    backgroundImage = 'url("https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")';  // Sunny
  } else if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle') {
    backgroundImage = 'url("https://images.pexels.com/photos/913807/pexels-photo-913807.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")';  // Rain
  } else if (weatherCondition === 'Clouds') {
    backgroundImage = 'url("https://images.pexels.com/photos/19670/pexels-photo.jpg")';  // Cloudy
  } else if (weatherCondition === 'Snow') {
    backgroundImage = 'url("https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';  // Snow
  } else {
    backgroundImage = 'url("https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")';  // Fallback (Sunny)
  }

  body.style.backgroundImage = backgroundImage;
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundAttachment = 'fixed';
}
