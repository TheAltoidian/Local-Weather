let addressForm = document.querySelector("#input-form");

function submitInfo(event) {
    event.preventDefault();
    
    let address = document.getElementById("street-address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("State-Abbreviation").value;
    let zipcode = document.getElementById("zipcode").value;
    console.log(address + ", " + city + ", " + state + " " + zipcode)
}
console.log(addressForm)
addressForm.addEventListener("submit", submitInfo)