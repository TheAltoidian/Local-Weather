let addressForm = document.querySelector("#input-form");

function submitInfo(event) {
    event.preventDefault();
    
    // take input, turn it into variables, replace spaces with +sign
    let address = document.getElementById("street-address").value.replace(/ /g, "+");
    let city = document.getElementById("city").value.replace(/ /g, "+");
    let state = document.getElementById("State-Abbreviation").value.replace(/ /g, "+");
    let zipcode = document.getElementById("zipcode").value.replace(/ /g, "+");
    console.log(address + ", " + city + ", " + state + " " + zipcode);

    // let cleanAddress = address.replace(/ /g, "+")
    // let cleanCity = city.replace(/ /g, "+")
    // let cleanState = state.replace(/ /g, "+")
    // let cleanZipcode = zipcode.replace(/ /g, "+")
    // console.log(cleanAddress + ", " + cleanCity + ", " + cleanState + " " + cleanZipcode)

    fetch("https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address="+address+"%2C+"+city+"%2C+"+state+"+"+zipcode+"&benchmark=2020&format=json")
        .then(function (response) {
            console.log(response)
        });

}
// console.log(addressForm)
addressForm.addEventListener("submit", submitInfo)