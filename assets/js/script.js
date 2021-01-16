//GLOBAL VARIABLES 

var APIKey = "d766966c411b7f57a270ea89ff2f7bdc"; 
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#cityname"); 
var mainContainerEl = document.querySelector("#main-container");
var forecastContainerEl = document.querySelector('#forecast-container')
var citySearchTerm = document.querySelector("#city-search-term");
var cityEl = document.createElement("div"); 
cityEl.classList = "weather-container";
var cityname = nameInputEl.value.trim();
var clearEl = document.querySelector("#clear-history"); 
var historyEl = document.querySelector("#history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || []; //add the search history to local storage OR an empty array 
console.log(searchHistory); 
var searchEl = document.querySelector("#search-button"); 

var currentTempEl = document.querySelector("#temperature");
currentTempEl.classList = "weather-info";
var feelsLikeEl = document.querySelector("#feels-like"); 
feelsLikeEl.classList = "weather-info";
var humidityEl = document.querySelector("#humidity"); 
humidityEl.classList = "weather-info";
var windEl = document.querySelector("#wind-speed"); 
windEl.classList = "weather-info"; 
var uvEl = document.querySelector("#uv-index"); 
uvEl.classList = "weather-info"; 

//this function "fetches" the weather info (HTTP request) from OpenWeather API. OpenWeather replies with JSON data. 
var getCityWeather = function(cityName) {
    //format the OpenWeather api url - can enter any cityname in "city"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey; 
    //make a request to the URL(404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
            response.json().then(function(data) {
                displayCities(data,cityName); //when the response data is converted to JSON, it will be sent from getCityWeather to displayCities 
                getCityIndex(data); 
                forecast(data); 
            });
        } else { //ok = false (not in the 200s)
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

//this function "fetches" the UV index info (HTTP request) from OpenWeatherAPI. OpenWeather replies with JSON data
var getCityIndex = function(weather,lat,lon) {
    var lat = weather.coord.lat; 
    var lon = weather.coord.lon; 
    var apiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var uvi = data.value; 
                uvEl.innerHTML = '<span class="badge badge-pill badge-light" id="uvi-badge" <i class="fas fa-sun"></i>' + " UV Index: " + uvi + "</span>";
                cityEl.appendChild(uvEl);
                if (uvi < 2) { //apply green background colour if less than 2 
                    $("#uvi-badge").css("background-color", "green")
                } else if (uvi < 5) { //apply yellow background colour if less than 5 
                    $("#uvi-badge").css("background-color", "yellow")
                } else if (uvi < 7) { //apply orange background colour if less than 7
                    $("#uvi-badge").css("background-color", "orange")
                } else { //apply red background colour if more than 7 
                    $("#uvi-badge").css("background-color", "red")
                }
            });
        }else {//alert the user if there was an error 
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) { //6.2.6 - catch is way of handling nextwork errors - if successful will get returned in the .then() method if request fails it will be sent to .catch() method 
        alert("Unable to connect to OpenWeather"); 
    }); 
};

//will accept both the array of the city data(weather) and the term we searched(searchTerm) for as parameters
var displayCities = function(weather, searchTerm) {
    console.log (weather); 
    //clear old city inputted content before displaying new content
    //show current date 
    var currentDate = moment().format("(L)");
    //current weather icon 
    var currentIcon = weather.weather[0].icon; 
    var iconUrl = "http://openweathermap.org/img/wn/"+currentIcon +"@2x.png";
    $(citySearchTerm).html(searchTerm + currentDate + "<img src="+iconUrl+">")//ensures the page displays the cityname/search term/date and icon 
        var currentTemp = "Current temperature: " + weather.main.temp + " &deg C"; 
        var feelsLike = "Feels like: " + weather.main.feels_like + " &deg C"; 
        var humidity = "Humidity: " + weather.main.humidity + "%";  
        var wind = "Wind speed: " + weather.wind.speed + " m/sec";
            //add current temp info to element 
            currentTempEl.innerHTML = "<i class='fas fa-thermometer-empty'></i> " + currentTemp; 
            cityEl.appendChild(currentTempEl); 

            //add feels like info to element  
            feelsLikeEl.innerHTML = "<i class='far fa-grin-beam-sweat'></i> " + feelsLike;  
            cityEl.appendChild(feelsLikeEl);

            //add humidty info to element 
            humidityEl.innerHTML = "<i class='fas fa-water'></i> " +  humidity; 
            cityEl.appendChild(humidityEl);

            //add wind info to element 
            windEl.innerHTML = "<i class='fas fa-wind'></i> " + wind; 
            cityEl.appendChild(windEl);
        
        //append container to the dom 
        mainContainerEl.appendChild(cityEl); 
}; 

var forecast = function(city) {
    //get 5 day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.name + "&units=metric&appid=" + APIKey; 
    fetch(forecastURL).then(function(response){
        if (response.ok) {
            response.json().then(function(response) {
                var forecastEls = document.querySelectorAll(".forecast");
                //loop through array to find the forecasts
                for (var i=0; i<forecastEls.length;i++) {
                    forecastEls[i].innerHTML=""; 
                    var forecastIndex = i*8 + 4; 
                    var forecastDate = moment(response.list[forecastIndex].dt, "X").format("(L)"); 
                    var forecastDateEl = document.createElement("p"); //create p element to hold the date 
                    forecastDateEl.innerHTML = forecastDate; 
                    forecastEls[i].append(forecastDateEl); 
                    var forecastWeatherEl = document.createElement("img") //create img element to hold the icon
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p"); //create p element to hold the temperature 
                    forecastTempEl.innerHTML = "Temperature: " + response.list[forecastIndex].main.temp + "&deg C";
                    forecastEls[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p"); //create p element to hold the humidity 
                    forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl); 
                    
                    // add each forecast at each array to the page    
                    forecastContainerEl.appendChild(forecastEls[i]);  
                    mainContainerEl.appendChild(forecastContainerEl);      
                }
            })
        }
    })
};  

//when search button is clicked, find the value of the searchTerm, run the main function with that searchTerm as a parameter, push to the index, save to local storage and add to the search history
searchEl.addEventListener("click",function() { 
    var searchTerm = nameInputEl.value;
    getCityWeather(searchTerm); 
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory(); 
})

//when the clear button is clicked, empty searchHistory array, remove the items from the search history 
clearEl.addEventListener("click", function() {
    searchHistory = []; 
    renderSearchHistory(); 
    localStorage.removeItem("search", searchHistory);
})

//create a new input item for each history item, based on the searcHistory length 
function renderSearchHistory() {
    historyEl.innerHTML = ""; 
    for (let i=0; i<searchHistory.length; i++){
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "search-history-term");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            getCityWeather(historyItem.value); //when the history is clicked, run the main fuction with the item clicked as the parameter
        })
        historyEl.append(historyItem); //add history item to the rest 
        console.log(historyItem.value);
    }
}

renderSearchHistory();
if (searchHistory.length > 0) {
    getCityWeather(searchHistory[searchHistory.length -1]);
}


