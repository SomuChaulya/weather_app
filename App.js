const API_KEY = `ef47efd8a6d23f8bedccf507dfec44d3`;
const form = document.querySelector("form");
const search = document.getElementById("search");
const weather = document.getElementById("weather");

// fetch details from API

const getWeather = async (city) => {
  weather.innerHTML = `<h2 class="loading"> Loading ... </h2>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json(); // Await the JSON parsing
    showWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};

// display weather

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<h2> City Not Found <h2>`;
    return;
  } else {
    weather.innerHTML = `
    <div>
        <h2>City: ${data.name}</h2> 
         <div style="color : white">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <h2>Tempareture: ${data.main.temp}</h2>
        <h3>Weather: ${data.weather[0].main}</h3>
    </div>`;
  }
};

// submit the form

form.addEventListener("submit", (event) => {
  getWeather(search.value);
  event.preventDefault();
  search.value = "";
});
