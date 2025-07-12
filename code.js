// const latitude = 52.52
// const longitude = 13.41

// const result = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)


// result
// .then(res => res.json())
// .then(res => console.log(res))

// console.log('hi')


// function locationRostov() {
//     const latitude = 47.2313
//     const longitude = 39.7233
    
//     return res = `latitude=${latitude}&longitude=${longitude}`
// }

// function locationMunich() {
//     const latitude = 48.1374
//     const longitude = 11.5755

//     return res = `latitude=${latitude}&longitude=${longitude}`
// }

// function TelAviv() {

//     const latitude = 32.0809
//     const longitude = 34.7806

//     return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
// }

// //не работает - додумать логику. Идея: имя в самой функции. Что-то не так
// function fetchCity(city, latitude, longitude) {

//     return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)


// }



// const tempRostov = fetch(`https://api.open-meteo.com/v1/forecast?${locationRostov()}&hourly=temperature_2m&forecast_days=1`)
// const tempMunich = fetch(`https://api.open-meteo.com/v1/forecast?${locationMunich()}&hourly=temperature_2m&forecast_days=1`)
// const tempTelAviv = fetch(`https://api.open-meteo.com/v1/forecast?${locationTelAviv()}&hourly=temperature_2m&forecast_days=1`)

const forecast = document.getElementById("forecast")


function codeWeatherCity(city) {

var dataWeather = `<div id="city-data" class="flex flex-col items-center gap-4">
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

// tempRostov.then(response => response.json())
// .then(data => { 

//     codeWeatherCity("Rostov")
//     displayDataWeather("Rostov", data)

// })


// tempMunich.then(response => response.json())
// .then(data => {
    
//     codeWeatherCity("Munich")
//     displayDataWeather("Munich", data)

// })

// locationTelAviv.then(response => response.json())
// .then(data => {
    
//     codeWeatherCity("TelAviv")
//     displayDataWeather("TelAviv", data)

// })

//функция для вывода данных в html. Первый шаг: function fetchCity(latitude, longitude), далее 

function dataDisplayWeatherCity(city){
    city.then    (response => response.json())
    .then(data => { 
        codeWeatherCity(`"${city}"`)
        displayDataWeather(`"${city}"`, data)
    })
}

//функция для получения данных в html сразу. Используя название грода, широту и долготу. Проверить. Нужен return? нет наверное
function dataDisplayWeatherCity(city, latitude, longitude){
    
        fetchCity = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
    
    fetchCity.then(response => response.json())
    .then(data => { 
        codeWeatherCity(city)
        displayDataWeather(city, data)
    })
} 

dataDisplayWeatherCity("TelAviv", 32.0809, 34.7806)
dataDisplayWeatherCity("Rostov", 47.2313, 39.7233)
dataDisplayWeatherCity("MunichR", 48.1374, 11.5755)

