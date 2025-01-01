async function weatherAPI(posicion) {

    let lat = posicion.coords.latitude;
    let long = posicion.coords.longitude;
    let key = "074bf85e3ae4d5af363f75b0eea1db6b";
    let weatherIcon = document.getElementById("weatherIcon")
    let weatherTemp = document.getElementById("weatherTemp");

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            let icon = data.weather[0].icon
            let iconURL = `http://openweathermap.org/img/w/${icon}.png`
            weatherIcon.setAttribute('src', iconURL)
            //Text showing degrees in C
            weatherTemp.innerText = `IRL Temp: ${data.main.temp} °C`

        });

}

navigator.geolocation.getCurrentPosition(weatherAPI);