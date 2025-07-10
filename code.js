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

    let res = ""
    
    res = `latitude=${latitude}&longitude=${longitude}`
    return res
}


const tempRostov = fetch(`https://api.open-meteo.com/v1/forecast?${locationRostov()}&hourly=temperature_2m&forecast_days=1`)

const temperatureRostov = document.getElementById("temperatureRostov")
const timeRostov = document.getElementById("timeRostov")
const date = document.getElementById("date")

tempRostov.then(response => response.json())
.then(data => { 

    const curDate = data.hourly.time[0].split("T")[0]
    date.innerHTML += curDate
    
    data.hourly.temperature_2m.forEach(element => {

        temperatureRostov.innerHTML += `${Math.round(element) + "°C" + "<br>"}`
    });

    data.hourly.time.forEach(element => {
        const dateTime = element.split("T")
        const simpleHour = dateTime[1].split(":")[0]

        timeRostov.innerHTML += `${simpleHour + "<br>"}`
    });

})