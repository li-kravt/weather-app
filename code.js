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


const temperature = document.getElementById("temperature")
const time = document.getElementById("time")



tempRostov.then(response => response.json())
.then(data => { 
    data.hourly.temperature_2m.forEach(element => {
        temperature.innerHTML += `${element + "<br>"}`
    });
    data.hourly.time.forEach(element => {
        time.innerHTML += `${element + "<br>"}`
    });
})