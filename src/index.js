function convertToCelsius(event) {
    event.preventDefault();
    let t = document.querySelector("#mainTemp");
    let temperature = t.innerHTML;
    temperature = Number(t.innerHTML);
    t.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  }
  
  function convertToFarenheit(event) {
    event.preventDefault();
    let t = document.querySelector("#mainTemp");
    let temperature = t.innerHTML;
    temperature = Number(t.innerHTML);
    t.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  
  let c = document.querySelector("#celcius");
  let f = document.querySelector("#farenheit");
  c.onclick = convertToCelsius;
  f.onclick = convertToFarenheit;
  
  function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let city = document.querySelector("h1");
    city.innerHTML = searchInput.value;
    let cityName = searchInput.value;
    let apiKey = "2e3e5873dd1cc627eb6ff6bc0d7327f5";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
    axios.get(apiURL).then(function (weather) {
      let temperature = Math.round(weather.data.main.temp);
      let temp = document.querySelector("#mainTemp");
      temp.innerHTML = temperature;
      let desc = document.querySelector("#weatherDesc");
      desc.innerHTML = weather.data.weather[0].description;
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = weather.data.main.humidity;
      let wind = document.querySelector("#wind");
      wind.innerHTML = weather.data.wind.speed;
    });
  }
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "2e3e5873dd1cc627eb6ff6bc0d7327f5";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`;
    axios.get(apiURL).then(function (weather) {
      let temperature = Math.round(weather.data.main.temp);
      let city = document.querySelector("h1");
      city.innerHTML = weather.data.name;
      let temp = document.querySelector("#mainTemp");
      temp.innerHTML = temperature;
      let desc = document.querySelector("#weatherDesc");
      desc.innerHTML = weather.data.weather[0].description;
      console.log(weather.data);
      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = weather.data.main.humidity;
      let wind = document.querySelector("#wind");
      wind.innerHTML = weather.data.wind.speed;
    });
  }
  
  function currentCity(event) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let form = document.querySelector("#search-form");
  form.addEventListener("click", searchCity);
  
  let current = document.querySelector("#current-form");
  current.addEventListener("click", currentCity);
  