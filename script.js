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

function weatherSearch(lat, lon) {

} 

addressForm.addEventListener("submit", submitInfo)