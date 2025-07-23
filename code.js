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
  let dataWeatherElement = document.createElement('div')
  dataWeatherElement.className = "flex flex-col items-center gap-4"
  forecast.appendChild(dataWeatherElement)

  let h4Date = document.createElement("h4")
  h4Date.className = "text-xl"
  dataWeatherElement.appendChild(h4Date)

  let spanDate = document.createElement("span")
  spanDate.setAttribute('id', `date${city}`)
  spanDate.className = "text-xl font-bold"
  h4Date.appendChild(spanDate)

  let listForecast = document.createElement("div")
  listForecast.className = "flex gap-8"
  dataWeatherElement.appendChild(listForecast)

  let pTime = document.createElement('p')
  pTime.setAttribute("id", `time${city}`)
  listForecast.appendChild(pTime)

  let pTemp = document.createElement('p')
  pTemp.setAttribute("id", `temperature${city}`)
  listForecast.appendChild(pTemp)

//     const dataWeather = `<div id="city-data" class="flex flex-col items-center gap-4">
//   <h4 class="text-xl">Date: <span id="date${city}" class="text-xl font-bold"></span> </h4>
//   <div class="flex gap-8">
//       <p id="time${city}"></p>
//       <p id="temperature${city}"></p>
//   </div>
// </div>`
}

function displayDataWeather(city, data) {
  const temperatureСity = document.getElementById(`temperature${city}`)
  const timeCity = document.getElementById(`time${city}`)
  const dateCity = document.getElementById(`date${city}`)
  
  const date = data.hourly.time[0].split('T')[0].split("-")
  if(date[1] == "07"){
    date[1] = "July"
  }

  dateCity.textContent = date.join(' ')

  data.hourly.temperature_2m.forEach(element => {     
    temperatureСity.innerHTML += `${Math.round(element) + "°C" + "<br>"}`
  });

  data.hourly.time.forEach(element => {
    const dateTime = element.split("T")
    const simpleHour = dateTime[1].split(":")[0]
    
    timeCity.innerHTML += `${simpleHour + "<br>"}`
});
}

function dataDisplayWeatherCity(city, days){
    for(let i=0; i < CITIES.length; i++){
      if (CITIES[i].city == city) {
       fetchCity = fetch(`${API_URL}?latitude=${CITIES[i].latitude}&longitude=${CITIES[i].longitude}&hourly=temperature_2m&forecast_days=${days}`)
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

const daysSelect = document.getElementById("days")
const cityTitle = document.getElementById("city-title")

citySelect.addEventListener('change', (e) => {
  cityTitle.textContent = citySelect.value
  
  const days = daysSelect.value
  const city = e.target.value

  dataDisplayWeatherCity(city, days)
})

daysSelect.addEventListener('change', (e) =>{
  document.getElementById("forecast").innerHTML = ""

  const city = citySelect.value
  const days = e.target.value

    dataDisplayWeatherCity(city, days)
})

// dataDisplayWeatherCity("TelAviv", 3)
// dataDisplayWeatherCity("Rostov")
// dataDisplayWeatherCity("Munich")

// let dataWeatherElement = document.createElement('div')
// dataWeatherElement.className = "flex flex-col items-center gap-4"
// forecast.appendChild(dataWeatherElement)

// let h4Date = document.createElement("h4")
// h4Date.className = "text-xl"
// dataWeatherElement.appendChild(h4Date)

// let spanDate = document.createElement("span")
// spanDate.className = "text-xl font-bold"
// h4Date.appendChild(spanDate)

// let listForecast = document.createElement("div")
// listForecast.className = "flex gap-8"
// dataWeatherElement.appendChild(listForecast)

// let pTime = document.createElement('p')
// listForecast.appendChild(pTime)

// let pTemp = document.createElement('p')
// listForecast.appendChild(pTemp)