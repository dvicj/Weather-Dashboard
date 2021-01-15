var APIKey = "d766966c411b7f57a270ea89ff2f7bdc"; 
var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#cityname"); 
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var repoEl = document.createElement("div"); //create a new div element called repoEl 6.2.5
repoEl.classList = "weather-container";
var cityname = nameInputEl.value.trim();
var clearEl = document.querySelector("#clear-history"); 
var historyEl = document.querySelector("#history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || []; 
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




//function that executes upon a form submission browser event 6.2.4
// var formSubmitHandler = function(event) {
//     event.preventDefault(); 
//     repoContainerEl = ''; 
//     var cityname = nameInputEl.value.trim(); 
//     if(cityname) { //checks value - if the cityname matches: 6.2.4 - if the city matches 
//         getcityRepos(cityname); // run function with the selected cityname 6.2.4 - run function with city name ie. getcityRepos(ottawa) 
//         searchHistory.push(cityname); 
//         localStorage.setItem("search", JSON.stringify(searchHistory)); 
//         renderSearchHistory(); 
//         nameInputEl.value = ""; //clears the <input>element's value - clears the form - 6.2.4
//     } else { //if the cityname does not match: 6.2.4
//         alert("Please enter a city.");
//     }
//     console.log(event);
// };


//this function "fetches" the info (HTTP request) from OpenWeather API
//OpenWeather replies with JSON data -- use this for weather server API
var getcityRepos = function(name) {
    //format the github api url - can enter any cityname in "city"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=" + APIKey; 
    //make a request to the URL - 6.2.5 edited - 6.2.6 edited (404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error - 6.2.6
            response.json().then(function(data) {
                displayRepos(data,name); //when the response data is converted to JSON, it will be sent from getcityRepos to displayRepos 
                getCityIndex(data); 
                forecast(data); 
            });
        } else { //ok = false (not in the 200s)
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
    // .catch(function(error) { //6.2.6 - catch is way of handling nextwork errors - if successful will get returned in the .then() method if request fails it will be sent to .catch() method 
    //     //notice this .catch() getting chained onto the end of the .then() method
    //     alert("Unable to connect to OpenWeather"); 
    // }); 
};

clearEl.addEventListener("click", function() {
    searchHistory = []; 
    renderSearchHistory(); 
    localStorage.removeItem("search", searchHistory);
    repoEl.value = ""; 
})

searchEl.addEventListener("click",function() {
    var searchTerm = nameInputEl.value.trim();
    getcityRepos(searchTerm); 
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory(); 
    nameInputEl.value = "";
    repoEl.value = ""; 
})

function renderSearchHistory() {
    historyEl.innerHTML = ""; 
    for (let i=0; i<searchHistory.length; i++){
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function() {
            getcityRepos(historyItem.value); 
        })
        historyEl.append(historyItem);
    }
}

renderSearchHistory();
if (searchHistory.length > 0) {
    getcityRepos(searchHistory[searchHistory.length -1]);
}

//uv index 
var getCityIndex = function(weather,lat,lon) {
    var lat = weather.coord.lat; 
    var lon = weather.coord.lon; 
    var apiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                uvEl.innerHTML = '<i class="fas fa-sun"></i>' + " UV Index: " + data.value; 
                repoEl.appendChild(uvEl);
                console.log(data);
                // if (data.value >= 0 || data.value >= 1 || data.value >= 2) {
                //     uvDiv.classList = "green";
                // } else if (data.value >= 3 || data.value >= 4 || data.value >= 5){
                //     uvDiv.classList = "yellow";
                // } else if (data.value >= 6 || data.value >= 7){
                //     uvDiv.classList = "orange";
                // } else if (data.value >= 8 || data.value >= 9 || data.value >= 10){
                //     uvDiv.classList = "red";
                // }
            });
        }else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) { //6.2.6 - catch is way of handling nextwork errors - if successful will get returned in the .then() method if request fails it will be sent to .catch() method 
        //notice this .catch() getting chained onto the end of the .then() method
        alert("Unable to connect to OpenWeather"); 
    }); 
};

//will accept both the array of the repo data(repos) and the term we searched(searchTerm) for as parameters - 6.2.5
var displayRepos = function(weather, searchTerm) {
    console.log (weather); 
    //clear old city inputted content before displaying new content 6.2.5
    //repoContainerEl.textContent = ""; //clears text from repoContainerEl 6.2.5
    //show current date 
    var currentDate = moment().format("(L)");
    //current weather icon 
    var currentIcon = weather.weather[0].icon; 
    var iconUrl = "http://openweathermap.org/img/wn/"+currentIcon +"@2x.png";
    $(repoSearchTerm).html(searchTerm + currentDate + "<img src="+iconUrl+">")//ensures the page displays the cityname/search term/date and icon 
        //taking each repository "repos[i]"" and writing some of it's data to the page (owner and login and name)
        var currentTemp = "Current temperature: " + weather.main.temp + " &deg C"; 
        var feelsLike = "Feels like: " + weather.main.feels_like + " &deg C"; 
        var humidity = "Humidity: " + weather.main.humidity + "%";  
        var wind = "Wind speed: " + weather.wind.speed + " m/sec";
        //create a conatiner for each repo 6.2.5 
            //create a span element to hold currentTemp 
            currentTempEl.innerHTML = "<i class='fas fa-thermometer-empty'></i> " + currentTemp; 
            repoEl.appendChild(currentTempEl); 

            //create a span element to hold feelsLike 
            feelsLikeEl.innerHTML = "<i class='far fa-grin-beam-sweat'></i> " + feelsLike; 
            repoEl.appendChild(feelsLikeEl); 

            //create a span element to hold humidity 
            humidityEl.innerHTML = "<i class='fas fa-water'></i> " +  humidity; 
            repoEl.appendChild(humidityEl); 

            //create a span element to hold wind
            windEl.innerHTML = "<i class='fas fa-wind'></i> " + wind; 
            repoEl.appendChild(windEl); 
        
        //append container to the dom 6.2.5
        repoContainerEl.appendChild(repoEl); //append repo to dom 6.2.5 - add div to container 
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
                    var forecastDateEl = document.createElement("p"); 
                    forecastDateEl.innerHTML = forecastDate; 
                    forecastEls[i].append(forecastDateEl); 
                    var forecastWeatherEl = document.createElement("img")
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Current temp: " + response.list[forecastIndex].main.temp + "&deg C";
                    forecastEls[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);              
                }
            })
        }
    })
};  

//add event listener - when submit button is clicked, formSubmitHandler function will execute 6.2.4
//cityFormEl.addEventListener("submit", formSubmitHandler);

