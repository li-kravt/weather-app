// const latitude = 52.52
// const longitude = 13.41

// const result = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)


// result
// .then(res => res.json())
// .then(res => console.log(res))

// console.log('hi')


function locationRostov() {
    const latitude = 47.2313
    const longitude = 39.7233
    
    return res = `latitude=${latitude}&longitude=${longitude}`
}

function locationMunich() {
    const latitude = 48.1374
    const longitude = 11.5755

    return res = `latitude=${latitude}&longitude=${longitude}`
}

function TelAviv() {

    const latitude = 32.0809
    const longitude = 34.7806

    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
}

//не работает - додумать логику. Идея: имя в самой функции. Что-то не так
function fetchCity(city, latitude, longitude) {

    const latitude = 32.0809
    const longitude = 34.7806

    return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
}

const tempOffline = () => new Promise(resolve => setTimeout(() => {
    resolve({
        "latitude": 32.125,
        "longitude": 34.8125,
        "generationtime_ms": 0.017523765563964844,
        "utc_offset_seconds": 0,
        "timezone": "GMT",
        "timezone_abbreviation": "GMT",
        "elevation": 11.0,
        "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C"
        },
        "hourly": {
            "time": [
                "2025-07-10T00:00",
                "2025-07-10T01:00",
                "2025-07-10T02:00",
                "2025-07-10T03:00",
                "2025-07-10T04:00",
                "2025-07-10T05:00",
                "2025-07-10T06:00",
                "2025-07-10T07:00",
                "2025-07-10T08:00",
                "2025-07-10T09:00",
                "2025-07-10T10:00",
                "2025-07-10T11:00",
                "2025-07-10T12:00",
                "2025-07-10T13:00",
                "2025-07-10T14:00",
                "2025-07-10T15:00",
                "2025-07-10T16:00",
                "2025-07-10T17:00",
                "2025-07-10T18:00",
                "2025-07-10T19:00",
                "2025-07-10T20:00",
                "2025-07-10T21:00",
                "2025-07-10T22:00",
                "2025-07-10T23:00"
            ],
            "temperature_2m": [
                24.1,
                23.5,
                23.0,
                22.8,
                23.5,
                25.2,
                27.5,
                28.9,
                29.9,
                29.5,
                30.0,
                30.0,
                30.1,
                29.6,
                29.1,
                28.5,
                27.9,
                27.1,
                26.8,
                26.5,
                26.1,
                25.9,
                25.7,
                25.5
            ]
        }
    })
}, 3_000))

tempOffline().then(res => console.log(res))

const tempRostov = fetch(`https://api.open-meteo.com/v1/forecast?${locationRostov()}&hourly=temperature_2m&forecast_days=1`)
const tempMunich = fetch(`https://api.open-meteo.com/v1/forecast?${locationMunich()}&hourly=temperature_2m&forecast_days=1`)
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

tempRostov.then(response => response.json())
.then(data => { 

    codeWeatherCity("Rostov")
    displayDataWeather("Rostov", data)

})


tempMunich.then(response => response.json())
.then(data => {
    
    codeWeatherCity("Munich")
    displayDataWeather("Munich", data)

})

locationTelAviv.then(response => response.json())
.then(data => {
    
    codeWeatherCity("TelAviv")
    displayDataWeather("TelAviv", data)

})

//функция для вывода данных в html. Первый шаг: function fetchCity(latitude, longitude), далее 

function dataDisplayWeatherCity(city){
    city.then(response => response.json())
    .then(data => { 
        codeWeatherCity(`"${city}"`)
        displayDataWeather(`"${city}"`, data)
    })
}

//функция для получения данных в html сразу. Используя название грода, широту и долготу. Проверить. Нужен return? нет наверное
function dataDisplayWeatherCity(city, latitude, longitude){

        const latitude = 32.0809
        const longitude = 34.7806
    
        fetchCity = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`)
    
    fetchCity.then(response => response.json())
    .then(data => { 
        codeWeatherCity(`"${city}"`)
        displayDataWeather(`"${city}"`, data)
    })
}