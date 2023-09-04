let addressForm = document.querySelector("#input-form");




//update default text with previously searched weather
function updatePage() {
    document.getElementById("displayedCity").textContent = localStorage.getItem("recentCity");
    document.getElementById("displayedWeather").textContent = localStorage.getItem("recentWeather") + "°F";
    document.getElementById("pastCity1").textContent = pastCities[1].city;
    document.getElementById("pastWeather1").textContent = pastCities[1].weather + "°F";
    document.getElementById("pastCity2").textContent = pastCities[2].city;
    document.getElementById("pastWeather2").textContent = pastCities[2].weather + "°F";
    document.getElementById("pastCity3").textContent = pastCities[3].city;
    document.getElementById("pastWeather3").textContent = pastCities[3].weather + "°F";
    document.getElementById("pastCity4").textContent = pastCities[4].city;
    document.getElementById("pastWeather4").textContent = pastCities[4].weather + "°F";
}




//Pull requested city from search box, send it to weather search function
function submitInfo(event) {
    event.preventDefault();

    //get city from page, turn it into a url
    let city = document.getElementById("city").value;
    let unspacedCity = city.replace(/ /g, "+");
    search = 'http://api.openweathermap.org/geo/1.0/direct?q=' + unspacedCity + '&limit=1&appid=20218664feca793b07da2ba8243b7197';

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
                document.getElementById("displayedWeather").textContent = weather + "°F";
                localStorage.setItem("recentWeather", weather)
                pastCities.unshift({city,weather})
                console.log("city: " + city + " weather: " + weather)
                if (pastCities.length > 5){
                    pastCities.pop();
                    console.log(pastCities);
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
if (localStorage.getItem("recentCity") && localStorage.getItem("recentWeather")) { updatePage() }
addressForm.addEventListener("submit", submitInfo)
//updates list of previously viewed cities and weathers 

console.log(pastCities);
console.log(pastCities[1].city);