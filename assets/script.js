//set current date
var now = moment().format("dddd, MMMM Do YYYY");
document.getElementById("current-date").innerHTML = now;
//get location coordinates by city name
var city = "detroit"
var apid = "5bcb706be88d247e41f5a053ad2b527b"
var loc = "api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apid;




// var weather = "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apid;

fetch(loc,{
    method: "GET",
    headers: {}
})
    .then(function (response) {
    return response.json();
    })
    .then(function(data) {
        console.log(data);
    });