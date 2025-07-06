const latitude = 52.52
const longitude = 13.41

const result = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)


result
.then(res => res.json())
.then(res => console.log(res)
)

console.log('hi')
