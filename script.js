let addressForm = document.querySelector("#input-form");

function submitInfo(event) {
    event.preventDefault();

    //get city from page, turn it into a url
    let city = document.getElementById("city").value.replace(/ /g, "+");
    search = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=20218664feca793b07da2ba8243b7197';

    //turn city into coordinates, pass coordinates to weather function
    fetch(search)
        .then(function (response) {
            response.json().then(function (data) {
                let lat = data[0].lat;
                let lon = data[0].lon;
                console.log("lat/lon: " + lat + ", " + lon);
                weatherSearch(lat, lon);
            })
        });
};

//take coordinates from submitInfo(), send it to open-meteo weather API
function weatherSearch(lat, lon) {
    let weatherRequest = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&temperature_unit=fahrenheit';
    fetch(weatherRequest)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data.current_weather.temperature);
            });
        });
}

addressForm.addEventListener("submit", submitInfo)