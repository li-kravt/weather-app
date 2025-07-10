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
    
    let res = `latitude=${latitude}&longitude=${longitude}`
    return res
}

function locationMunich() {
    const latitude = 48.1374
    const longitude = 11.5755

    let res = `latitude=${latitude}&longitude=${longitude}`
    return res
}


const tempRostov = fetch(`https://api.open-meteo.com/v1/forecast?${locationRostov()}&hourly=temperature_2m&forecast_days=1`)

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


tempRostov.then(response => response.json())
.then(data => { 

    codeWeatherCity("Rostov")

const temperatureRostov = document.getElementById("temperatureRostov")
const timeRostov = document.getElementById("timeRostov")
const date = document.getElementById("date")

    
    const curDate = data.hourly.time[0].split("T")[0]
    dateRostov.innerHTML += curDate
    
    data.hourly.temperature_2m.forEach(element => {
        
        temperatureRostov.innerHTML += `${Math.round(element) + "°C" + "<br>"}`
    });
    
    data.hourly.time.forEach(element => {
        const dateTime = element.split("T")
        const simpleHour = dateTime[1].split(":")[0]
        
        timeRostov.innerHTML += `${simpleHour + "<br>"}`
    });
    
})


const tempMunich = fetch(`https://api.open-meteo.com/v1/forecast?${locationMunich()}&hourly=temperature_2m&forecast_days=1`)
tempMunich.then(response => response.json())
.then(data => {
    
    codeWeatherCity("Munich")

    const temperatureMunich = document.getElementById("temperatureMunich")
    const timeMunich = document.getElementById("timeMunich")
    const date = document.getElementById("date")

    dateMunich.innerHTML += `${data.hourly.time[0].split("T")[0]}`

    data.hourly.temperature_2m.forEach(element =>{
        temperatureMunich.innerHTML += `${Math.round(element) + "°C" + "<br>"}`
    })

    data.hourly.time.forEach(element => {
        const simpleHour = element.split("T")[1].split(":")[0]
        timeMunich.innerHTML += `${simpleHour + "<br>"}`
    })

})