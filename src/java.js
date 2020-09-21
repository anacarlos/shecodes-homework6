let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  let atualDate = new Date();
  let thisDay = atualDate.getDay();
  let thisDate = atualDate.getDate();
  let thisMonth = atualDate.getMonth();
  let year = atualDate.getFullYear();
  let hour = atualDate.getHours();
  let minutes = atualDate.getMinutes();
  
  let date = document.querySelector("h4");
  let time = document.querySelector("small");
  date.innerHTML = `${days[thisDay]}, ${thisDate}th ${months[thisMonth]} ${year}`;
  time.innerHTML = `@ ${hour}:${minutes}`;
  
  function changeCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-search");
    let location = document.querySelector("h1");
    location.innerHTML = inputCity.value;
    searchCity(inputCity.value);
  }
  
  let form = document.querySelector("#form-search");
  form.addEventListener("submit", changeCity);
  
  function searchCity(city) {
    let apiKey = "2b9bb1f42e00c8dc2835307067c88f1c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#one");
    temp.innerHTML = temperature;
    let local = document.querySelector("h1");
    let city = response.data.name;
    local.innerHTML = city;
  }
  
  function retrievePosition(position) {
    let apiKey = "2b9bb1f42e00c8dc2835307067c88f1c";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  function setPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  let current = document.querySelector("#current-button");
  current.addEventListener("click", setPosition);
  