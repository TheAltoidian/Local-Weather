let addressForm = document.querySelector("#input-form");

// capitalizes first letter of city when searched
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//update default text with previously searched weather
function updatePage() {
    document.getElementById("displayedCity").textContent = localStorage.getItem("recentCity");
    document.getElementById("displayedWeather").textContent = localStorage.getItem("recentWeather") + "°F/" + Math.round((localStorage.getItem("recentWeather") - 32) * 5 / 9) + "°C";
    document.getElementById("displayedIcon").src = weatherImage(pastCities[0].icon);
    document.getElementById("pastCity1").textContent = pastCities[1].city;
    document.getElementById("pastWeather1").textContent = pastCities[1].weather + "°F/" + Math.round((pastCities[1].weather - 32) * 5 / 9) + "°C";
    document.getElementById("pastIcon1").src = weatherImage(pastCities[1].icon);
    document.getElementById("pastCity2").textContent = pastCities[2].city;
    document.getElementById("pastWeather2").textContent = pastCities[2].weather + "°F/" + Math.round((pastCities[2].weather - 32) * 5 / 9) + "°C";
    document.getElementById("pastIcon2").src = weatherImage(pastCities[2].icon);
    document.getElementById("pastCity3").textContent = pastCities[3].city;
    document.getElementById("pastWeather3").textContent = pastCities[3].weather + "°F/" + Math.round((pastCities[3].weather - 32) * 5 / 9) + "°C";
    document.getElementById("pastIcon3").src = weatherImage(pastCities[3].icon);
    document.getElementById("pastCity4").textContent = pastCities[4].city;
    document.getElementById("pastWeather4").textContent = pastCities[4].weather + "°F/" + Math.round((pastCities[4].weather - 32) * 5 / 9) + "°C";
    document.getElementById("pastIcon4").src = weatherImage(pastCities[4].icon);
}

//create image of weather
function weatherImage(code) {
    if (code == 0) {
        return ('./icons/sun.png')
    } else if ([1, 2, 3].includes(code)) {
        return ('./icons/cloudy.png')
    } else if ([45, 48].includes(code)) {
        return ('./icons/fog.png')
    } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return ('./icons/rain.png')
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return ('./icons/snow.png')
    } else if ([95, 96, 98].includes(code)) {
        return ('./icons/lightning.png')
    } else {
        console.log("code: " + code)
        return ("")
    };
}


//Pull requested city from search box, send it to weather search function
function submitInfo(event) {
    event.preventDefault();

    //get city from page, turn it into a url
    let city = document.getElementById("city").value;
    city = capitalizeFirstLetter(city)
    document.getElementById('city').value = ''
    search = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=20218664feca793b07da2ba8243b7197';

    //turn city into coordinates, pass coordinates to weather function
    fetch(search)
        .then(function (response) {
            response.json().then(function (data) {
                let lat = data[0].lat;
                let lon = data[0].lon;

                //display city, store as most recent city
                document.getElementById("displayedCity").textContent = city;
                localStorage.setItem("recentCity", city);
                weatherSearch(lat, lon, city);
            })
        });
};

//take coordinates from submitInfo(), send it to open-meteo weather API
function weatherSearch(lat, lon, city) {
    let weatherRequest = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&temperature_unit=fahrenheit';
    fetch(weatherRequest)
        .then(function (response) {
            response.json().then(function (data) {

                //display weather, store as most recent weather, add to list of recent searches, trim list length to 5
                let weather = data.current_weather.temperature
                let icon = data.current_weather.weathercode
                document.getElementById("displayedWeather").textContent = weather + "°F";
                document.getElementById("displayedIcon").textContent = icon
                localStorage.setItem("recentWeather", weather)
                localStorage.setItem("recentIcon", icon)
                pastCities.unshift({ city, weather, icon })
                if (pastCities.length > 5) {
                    pastCities.pop();
                }
                localStorage.setItem("pastCities", JSON.stringify(pastCities))
                updatePage();
            });
        });
}

//check if there's previously stored information to update the page with, then accept inputs
let pastCities = [];
if (localStorage.getItem("pastCities")) {
    pastCities = JSON.parse(localStorage.getItem("pastCities"))
}
if (localStorage.getItem("recentCity") && localStorage.getItem("recentWeather") && localStorage.getItem("recentIcon")) { updatePage() }
addressForm.addEventListener("submit", submitInfo)