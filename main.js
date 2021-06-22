async function getWeather(location) {
  try {
    const apiKey = "a6264e846f3e297fcac2927da8ec97b0";
    const webAPI = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
    const response = await fetch(webAPI, { mode: "cors" });
    const weatherData = await response.json();
    const weather = processWeatherData(weatherData);
    displayWeather(weather);
  } catch (error) {
    alert("Invalid City Name");
  }
}

/**
 * Processes the Raw Data from the OpenWeatherMap API (in imperial)
 * @param  {JSON} weatherData - The raw data fetched from the OpenWeatherMap API.
 * @returns {Object} weather - The processed data that will be used in the app.
 */
function processWeatherData(weatherData) {
  const city = weatherData.name;
  const country = weatherData.sys.country;
  const windSpeed = weatherData.wind.speed;
  const temp = weatherData.main.temp;
  const tempFeels = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const weatherDescription = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;
  return {
    city,
    country,
    windSpeed,
    temp,
    tempFeels,
    humidity,
    weatherDescription,
    iconCode,
  };
}

function displayWeather(processedData) {
  const weatherContainer = document.querySelector("#weather");
  const city = weatherContainer.querySelector("#city");
  const temp = weatherContainer.querySelector("#temp");
  const feelsTemp = weatherContainer.querySelector("#feels");
  const desc = weatherContainer.querySelector("#desc");
  const humid = weatherContainer.querySelector("#humidity");
  const wind = weatherContainer.querySelector("#wind");

  city.textContent = `${processedData.city}, ${processedData.country}`;
  temp.textContent = `${processedData.temp}\u00b0F`;
  feelsTemp.textContent = `Feels like: ${processedData.tempFeels}\u00b0F`;
  desc.textContent = processedData.weatherDescription;
  humid.textContent = `Humidity: ${processedData.humidity}\u0025`;
  wind.textContent = `Wind Speed: ${processedData.windSpeed} mph`;
  getGIF(processedData.weatherDescription);
  getImage(processedData.iconCode);
}

function getImage(imgCode) {
  const url = `http://openweathermap.org/img/wn/${imgCode}@2x.png`;
  const img = document.querySelector("img");
  img.src = url;
}

function getGIF(weatherDescription) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=I4B9b4zLXeHeKN1yUTPygMTC3h6s7WHR&s=${weatherDescription}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      const imgSrc = response.data.images.original.url;
      //   img.src = imgSrc;
      document.body.style.background = `url(${imgSrc})`;
    });
}

getWeather("93033");

const searchBox = document.querySelector("#searchBox");
searchBox.addEventListener("keyup", (event) => {
  const searchTerm = searchBox.value;
  if (event.key === "Enter" && searchTerm != "") {
    console.log("Searching for " + searchTerm);
    getWeather(searchTerm);
  }
});
