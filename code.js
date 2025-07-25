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

  let pTime = document.createElement('div')
  pTime.setAttribute("id", `timeTemp${city}`)
  listForecast.appendChild(pTime)

  // let pTemp = document.createElement('div')
  // pTemp.setAttribute("id", `temperature${city}`)
  // listForecast.appendChild(pTemp)

//     const dataWeather = `<div id="city-data" class="flex flex-col items-center gap-4">
//   <h4 class="text-xl">Date: <span id="date${city}" class="text-xl font-bold"></span> </h4>
//   <div class="flex gap-8">
//       <p id="time${city}"></p>
//       <p id="temperature${city}"></p>
//   </div>
// </div>`
}

function displayDataWeather(city, data) {
  // const temperatureСity = document.getElementById(`temperature${city}`)
  const timeCity = document.getElementById(`timeTemp${city}`)
  const dateCity = document.getElementById(`date${city}`)
  
  const date = data.hourly.time[0].split('T')[0].split("-")
  if(date[1] == "07"){
    date[1] = "July"
  }

  dateCity.textContent = date.join(' ')

  // for (let i = 0; i < data.hourly.time.length; i++) {
  //   let pOneTime = document.createElement('p')
  //   let pOneTemp = document.createElement('p')

  //   pOneTime.textContent = data.hourly.time[i].split('T')[1].split(':')[0]
  //   pOneTemp.textContent = `${data.hourly.temperature_2m[i]} °C`

  //   timeCity.appendChild(pOneTime)
  //   temperatureСity.appendChild(pOneTemp)

  // }

//   data.hourly.temperature_2m.forEach(element => { 
//     let spanTempBr = document.createElement('span')
//     spanTempBr.textContent = `${Math.round(element)} °C`
    
//     let br = document.createElement("br")
//     spanTempBr.appendChild(br)

//     temperatureСity.appendChild(spanTempBr)
//   });

//   data.hourly.time.forEach(element => {
//     const dateTime = element.split("T")
//     const simpleHour = dateTime[1].split(":")[0]
    
//     timeCity.innerHTML += `${simpleHour + "<br>"}`
// });
// }

// function mergeArrays(arrTime ,arrTemp){
  for (let i = 0; i < data.hourly.time.length; i++) {
     (data.hourly.time[i].split('T')[0] !== data.hourly.time[i--].split('T')[1].split(':')[0]) 

    let pOneTime = document.createElement('p')
    let pOneTemp = document.createElement('p')
    let space = '\u00A0 \u00A0 \u00A0'

    pOneTime.textContent = `${data.hourly.time[i].split('T')[1].split(':')[0]} ${space} ${Math.round(data.hourly.temperature_2m[i])} °C`
    // pOneTemp.textContent = `${Math.round(data.hourly.temperature_2m[i])} °C

    newDiv.appendChild(pOneTime)


    // temperatureСity.appendChild(pOneTemp)
  }
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
  forecast.removeChild(forecast.firstChild)
  cityTitle.textContent = citySelect.value
  
  const days = daysSelect.value
  const city = e.target.value

  dataDisplayWeatherCity(city, days)
})

daysSelect.addEventListener('change', (e) =>{
  forecast.removeChild(forecast.firstChild)

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

