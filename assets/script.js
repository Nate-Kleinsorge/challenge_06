//set current date
var now = moment().format("dddd, MMMM Do YYYY");
document.getElementById("current-date").innerHTML = now;

//get city name from button
var weatherBtn = document.getElementById("weatherBtn");
var userInput = document.getElementById("searchCity");
var city = userInput.value.trim();
var apid = "5bcb706be88d247e41f5a053ad2b527b"
var loc = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apid;
weatherBtn.addEventListener("click", getCoords(loc));

//fetch the api to get the coordinates of the city
function getCoords(loc) {
    fetch(loc,{
        method: "GET",
        headers: {}
    })
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        var lat = data[0].lat;
        var lon = data[0].lon;
        url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apid + "&per_page=5";
        getWeather(url);
    });
};


//fetch the api to get the weather forecast for certain coordinates.
function getWeather(url) {
    fetch(url, {
        method: 'GET',
        headers: {}
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
};



