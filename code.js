const API_URL = 'https://api.open-meteo.com/v1/forecast'

const CITIES = [
  {   city: "TelAviv",
      latitude: 32.0809,
      longitude: 34.7806
  },
  {   city: "Rostov",
      latitude: 47.2313,
      longitude: 39.7233
  },
  {   city: "Munich",
      latitude: 48.1374,
      longitude: 11.5755
  }
]

const forecast = document.getElementById("forecast")

function codeWeatherCity(city) {
    const dataWeather = `<div id="city-data" class="flex flex-col items-center gap-4">
  <h3 class="text-2xl font-bold">${city}</h3>
  <h4 class="text-xl">Date: <span id="date${city}" class="text-xl font-bold"></span> </h4>
  <div class="flex gap-8">
      <p id="time${city}"></p>
      <p id="temperature${city}"></p>
  </div>
</div>`

return forecast.innerHTML += dataWeather
}

function displayDataWeather(city, data) {
  const temperatureСity = document.getElementById(`temperature${city}`)
  const timeCity = document.getElementById(`time${city}`)
  const dateCity = document.getElementById(`date${city}`)

  dateCity.innerHTML += data.hourly.time[0].split("T")[0]

  data.hourly.temperature_2m.forEach(element => {     
    temperatureСity.innerHTML += `${Math.round(element) + "°C" + "<br>"}`
  });

  data.hourly.time.forEach(element => {
    const dateTime = element.split("T")
    const simpleHour = dateTime[1].split(":")[0]
    
    timeCity.innerHTML += `${simpleHour + "<br>"}`
});
}

function dataDisplayWeatherCity(city){
    for(let i=0; i < CITIES.length; i++){
      if (CITIES[i].city == city) {
       fetchCity = fetch(`${API_URL}?latitude=${CITIES[i].latitude}&longitude=${CITIES[i].longitude}&hourly=temperature_2m&forecast_days=1`)
      }
    }

    fetchCity.then(response => response.json())
    .then(data => { 
        codeWeatherCity(city)
        displayDataWeather(city, data)
    })
} 

const citySelect = document.querySelector('#city-select')
let oneCity = ''


for(i = 0; i < CITIES.length; i++) {
  oneCity += `<option
  value="${CITIES[i].city}">
  ${CITIES[i].city}
  </option>`
}
citySelect.innerHTML += oneCity


citySelect.addEventListener('change', (e) => {
  const city = e.target.value
  dataDisplayWeatherCity(city)
})

// dataDisplayWeatherCity("TelAviv")
// dataDisplayWeatherCity("Rostov")
// dataDisplayWeatherCity("Munich")