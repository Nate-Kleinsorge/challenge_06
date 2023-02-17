//set current date
var now = moment().format("dddd, MMMM Do YYYY");
document.getElementById("current-date").innerHTML = now;

var weatherBtn = document.getElementById("weatherBtn");
var userInput = document.querySelector(".search-form");
var apid = "5bcb706be88d247e41f5a053ad2b527b"

weatherBtn.addEventListener('click', () => {
  var city = userInput.children[0].value;
  var loc = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apid}`;
  fetch(loc,{
    method: "GET",
    headers: {}
  })
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apid}&per_page=5`;
    getWeather(url);
  }).catch(function (error) {
    console.error(error);
  });
});

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
        renderCurrentWeather(data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

var searchHistoryContainer = document.querySelector("#history");
var todayWeather = document.querySelector('.today');

//redner search history
function renderSearchHistory() {
    searchHistoryContainer.innerHTML = '';
    for (var i = searchHistory.length - 1; i >= 0; i--) {
      var btn = document.createElement('button');
      btn.setAttribute('type', 'button');
      btn.setAttribute('text', searchHistory[i]); 
      btn.textContent = searchHistory[i];
      searchHistoryContainer.append(btn);
    }
}
  
function appendToHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
      return;
    }
    searchHistory.push(search);
  
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    renderSearchHistory();
}
  
  // Function to get search history from local storage
function initSearchHistory() {
    var storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
      searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory();
}

function renderCurrentWeather(city, weather) {
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidEl = document.createElement('p');

    cardBody.setAttribute('class', 'card-body');
    card.setAttribute('class', 'card');
    card.append(cardBody);

    heading.textContent = `${city}`
    tempEl.textContent = '30*'
    windEl.textContent = '20mph'
    humidEl.textContent = '30%'
    cardBody.append(heading, tempEl, windEl, humidEl);

    todayWeather.innerHTML = '';
    todayWeather.append(card);
}
