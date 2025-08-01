const API_URL = "https://api.open-meteo.com/v1/forecast";

const CITIES = [
  { city: "TelAviv", latitude: 32.0809, longitude: 34.7806 },
  { city: "Rostov", latitude: 47.2313, longitude: 39.7233 },
  { city: "Munich", latitude: 48.1374, longitude: 11.5755 },
];

const forecast = document.getElementById("forecast");

function dataDisplayWeatherCity(city, days) {
  for (let i = 0; i < CITIES.length; i++) {
    if (CITIES[i].city == city) {
      fetchCity = fetch(
        `${API_URL}?latitude=${CITIES[i].latitude}&longitude=${CITIES[i].longitude}&hourly=temperature_2m&forecast_days=${days}&timeformat=unixtime`,
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


let dataDivColumn

function displayDataWeather(city, data) {
  const timeTempCity = document.getElementById(`timeTemp${city}`);
  
  for (let i = 0; i < data.hourly.time.length; i++) {

    const timestamp = data.hourly.time[i] * 1000;
    const date = new Date(timestamp)
    
    const nextTimestamp = data.hourly.time[i + 1] * 1000
    const nextDate = new Date(nextTimestamp)

    function whichMonth() {
      if (date.getUTCMonth() == 0) {
        return "January"
      }

      if (date.getUTCMonth() == 7) {
        return "August"
      }
    }
    
    const forecastWhichDay = `${date.getUTCDay()} ${whichMonth()}`

    if ( i == 0) {
      dataDivColumn = document.createElement("div")
      dataDivColumn.textContent = forecastWhichDay
    }


    let prevDate
    let prevTimestamp

    if (i !== 0) {
      prevTimestamp = data.hourly.time[i - 1] * 1000;
      prevDate = new Date(prevTimestamp)

      const isNewDay = date.getUTCDate() !== prevDate.getUTCDate()
    
      if (isNewDay) {
      dataDivColumn = document.createElement("div");
      dataDivColumn.textContent = forecastWhichDay
      }
    }

    let pOneTime = document.createElement("p");
    let pOneTemp = document.createElement("p");

    pOneTime.textContent = date.getUTCHours()
    pOneTemp.textContent = `${Math.round(data.hourly.temperature_2m[i])} °C`;

    let dataOneDiv = document.createElement("div");
    dataOneDiv.className = "flex gap-4 tabular-nums";
    dataOneDiv.appendChild(pOneTime);
    dataOneDiv.appendChild(pOneTemp);

    dataDivColumn.appendChild(dataOneDiv);
    
    const dayEnd = date.getDate() !== nextDate.getDate()

    if (dayEnd) {
      timeTempCity.appendChild(dataDivColumn);
    }
  }
}

const citySelect = document.getElementById("city-select");

for (i = 0; i < CITIES.length; i++) {
  let oneOptionCity = document.createElement('option')
  oneOptionCity.value = `${CITIES[i].city}`
  oneOptionCity.textContent = `${CITIES[i].city}`
  citySelect.appendChild(oneOptionCity)
}

const daysSelect = document.getElementById("days");
const cityTitle = document.getElementById("city-title");

citySelect.addEventListener("change", (e) => {
  if (forecast.firstChild) {
    forecast.removeChild(forecast.firstChild);
  }
  cityTitle.textContent = citySelect.value;
  
  if (citySelect.value == "") {
    return
  }

  const days = daysSelect.value;
  const city = e.target.value;

  dataDisplayWeatherCity(city, days);
});

daysSelect.addEventListener("change", (e) => {
  if (forecast.firstChild) {
    forecast.removeChild(forecast.firstChild);
  }

  if (citySelect.value == "") {
    return
  }

  const city = citySelect.value;
  const days = e.target.value;

  dataDisplayWeatherCity(city, days);
});
