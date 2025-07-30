const API_URL = "https://api.open-meteo.com/v1/forecast";

const CITIES = [
  { city: "TelAviv", latitude: 32.0809, longitude: 34.7806 },
  { city: "Rostov", latitude: 47.2313, longitude: 39.7233 },
  { city: "Munich", latitude: 48.1374, longitude: 11.5755 },
];

const forecast = document.getElementById("forecast");

function codeWeatherCity(city) {
  let allDataCityMainDiv = document.createElement("div");
  allDataCityMainDiv.className = "flex flex-col items-center gap-4";
  forecast.appendChild(allDataCityMainDiv);

  let h4Date = document.createElement("h3");
  h4Date.setAttribute("id", `date${city}`);
  h4Date.className = "text-xl, font-bold";
  allDataCityMainDiv.appendChild(h4Date);

  let temperatureDataCity = document.createElement("div");
  temperatureDataCity.setAttribute("id", `timeTemp${city}`);
  temperatureDataCity.className = "flex flex-row gap-10";
  allDataCityMainDiv.appendChild(temperatureDataCity);
}

function displayDataWeather(city, data) {
  const timeTempCity = document.getElementById(`timeTemp${city}`);
  const dateCity = document.getElementById(`date${city}`);

  for (let i = 0; i < data.hourly.time.length; i++) {

    const timestamp = data.hourly.time[i];
    const dateCurrent = timestamp.split("T")[0];

    let prevTimestamp;
    let prevDate;

    if (i !== 0) {
      prevTimestamp = data.hourly.time[i - 1];
      prevDate = prevTimestamp.split("T")[0];
    }

    if (dateCurrent !== prevDate || i == 0) {
      dataDiv = document.createElement("div");
    }

    let pOneTime = document.createElement("p");
    let pOneTemp = document.createElement("p");

    pOneTime.textContent = `${data.hourly.time[i].split("T")[1].split(":")[0]}`;
    pOneTemp.textContent = `${Math.round(data.hourly.temperature_2m[i])} °C`;

    let dataOneDiv = document.createElement("div");
    dataOneDiv.className = "flex gap-4 tabular-nums";
    dataOneDiv.appendChild(pOneTime);
    dataOneDiv.appendChild(pOneTemp);

    const date = data.hourly.time[0].split("T")[0].split("-");
    if (date[1] == "07") {
      date[1] = "July";

      dateCity.textContent = date.join(" ");
      dataDiv.appendChild(dataOneDiv);

      if (dateCurrent !== prevDate) {
        timeTempCity.appendChild(dataDiv);
      }
    }
  }
}

function dataDisplayWeatherCity(city, days) {
  for (let i = 0; i < CITIES.length; i++) {
    if (CITIES[i].city == city) {
      fetchCity = fetch(
        `${API_URL}?latitude=${CITIES[i].latitude}&longitude=${CITIES[i].longitude}&hourly=temperature_2m&forecast_days=${days}`,
      );
    }
  }

  fetchCity
    .then((response) => response.json())
    .then((data) => {
      codeWeatherCity(city);
      displayDataWeather(city, data);
    });
}

const citySelect = document.getElementById("city-select");
let oneCity = "";

for (i = 0; i < CITIES.length; i++) {
  oneCity += `<option
  value="${CITIES[i].city}">
  ${CITIES[i].city}
  </option>`;
}
citySelect.innerHTML += oneCity;

const daysSelect = document.getElementById("days");
const cityTitle = document.getElementById("city-title");

citySelect.addEventListener("change", (e) => {
  forecast.removeChild(forecast.firstChild);
  cityTitle.textContent = citySelect.value;

  const days = daysSelect.value;
  const city = e.target.value;

  dataDisplayWeatherCity(city, days);
});

daysSelect.addEventListener("change", (e) => {
  forecast.removeChild(forecast.firstChild);

  const city = citySelect.value;
  const days = e.target.value;

  dataDisplayWeatherCity(city, days);
});

//test