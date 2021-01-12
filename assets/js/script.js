//card / form element - make form for searching cities 
//reference to <form> with an id of city-form
var cityFormEl = document.querySelector("#city-form");
//reference to <input> with an id of cityname
var nameInputEl = document.querySelector("#cityname"); 
//reference to <div> with an id of repos-container - 6.2.5
var repoContainerEl = document.querySelector("#repos-container");
//reference to <span> container with an id of repo-search-term - 6.2.5
var repoSearchTerm = document.querySelector("#repo-search-term");

//function that executes upon a form submission browser event 6.2.4
var formSubmitHandler = function(event) {
    event.preventDefault(); 
    //get value of the form input element and send to getcityRepos() 6.2.4 - get city value and send to above function 
    var cityname = nameInputEl.value.trim(); //get value from the <input> element, ie. nameInputEl, value is stored in "cityname" variable - use trim to get rid of any leading or trailing white spaces 

    if(cityname) { //checks value - if the cityname matches: 6.2.4 - if the city matches 
        getcityRepos(cityname); // run function with the selected cityname 6.2.4 - run function with city name ie. getcityRepos(ottawa)
        repoContainerEl.textContent=""; 
        nameInputEl.value = ""; //clears the <input>element's value - clears the form - 6.2.4
    } else { //if the cityname does not match: 6.2.4
        alert("Please enter a city.");
    }
    console.log(event);
};

//this function "fetches" the info (HTTP request) from OpenWeather API
//OpenWeather replies with JSON data -- use this for weather server API
var getcityRepos = function(name) {
    //format the github api url - can enter any cityname in "city"
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=d766966c411b7f57a270ea89ff2f7bdc"; 
    //make a request to the URL - 6.2.5 edited - 6.2.6 edited (404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error - 6.2.6
            response.json().then(function(data) {
                displayRepos(data,name); //when the response data is converted to JSON, it will be sent from getcityRepos to displayRepos 
            });
        } else { //ok = false (not in the 200s)
            alert("Error: " + response.statusText); //statusText property - what the issue is 
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
    console.log("This is the city's cityname: " + searchTerm);
    //clear old city inputted content before displaying new content 6.2.5
    repoContainerEl.textContent = ""; //clears text from repoContainerEl 6.2.5
    //show current date 
    var currentDate = moment().format("LL");
    //current weather icon 

    repoSearchTerm.textContent = searchTerm + ". Date: " + currentDate; //ensures the page displays the cityname/search term 
        //taking each repository "repos[i]"" and writing some of it's data to the page (owner and login and name)
        var currentTemp = "Current temperature: " + weather.main.temp + " &deg C"; 
        var feelsLike = "Feels like: " + weather.main.feels_like + " &deg C"; 
        var humidity = "Humidity : " + weather.main.humidity + "%";  
        var sunrise = "Sunrise: " + moment(weather.sys.sunrise).format("h:mm");   
        var sunset = "Sunset: " + moment(weather.sys.sunset).format("h:mm"); 
        var wind = "Wind speed: " + weather.wind.speed + " m/sec";
        //create a conatiner for each repo 6.2.5
        var repoEl = document.createElement("div"); //create a new div element called repoEl 6.2.5
            repoEl.classList = "weather-container"; 
            //create a span element to hold currentTemp 
            var currentTempDiv = document.createElement("div");
            currentTempDiv.classList = "weather-div";
            var currentTempEl = document.createElement("span"); 
            currentTempEl.classList = "weather-info";
            currentTempEl.innerHTML = "<i class='fas fa-thermometer-empty'></i> " + currentTemp; 
            currentTempDiv.appendChild(currentTempEl); 
            repoEl.appendChild(currentTempDiv); 

            //create a span element to hold feelsLike 
            var feelsLikeDiv = document.createElement("div"); 
            feelsLikeDiv.classList = "weather-div";
            var feelsLikeEl = document.createElement ("span"); 
            feelsLikeEl.classList = "weather-info";
            feelsLikeEl.innerHTML = "<i class='far fa-grin-beam-sweat'></i> " + feelsLike; 
            feelsLikeDiv.appendChild(feelsLikeEl); 
            repoEl.appendChild(feelsLikeDiv); 

            //create a span element to hold humidity 
            var humidityDiv = document.createElement("div"); 
            humidityDiv.classList = "weather-div";
            var humidityEl = document.createElement("span");
            humidityEl.classList = "weather-info";
            humidityEl.innerHTML = "<i class='fas fa-water'></i> " +  humidity; 
            humidityDiv.appendChild(humidityEl);
            repoEl.appendChild(humidityDiv); 

            //create a span element to hold sunrise
            var sunriseDiv = document.createElement("div"); 
            sunriseDiv.classList = "weather-div";
            var sunriseEl = document.createElement("span");
            sunriseEl.classList = "weather-info";
            sunriseEl.innerHTML =  "<i class='far fa-sun'></i> " + sunrise; 
            sunriseDiv.appendChild(sunriseEl);
            repoEl.appendChild(sunriseDiv);

            //create a span element to hold sunset 
            var sunsetDiv = document.createElement("div"); 
            sunsetDiv.classList = "weather-div";
            var sunsetEl = document.createElement("span");
            sunsetEl.classList = "weather-info";
            sunsetEl.innerHTML =  "<i class='fas fa-sun'></i> " + sunset; 
            sunsetDiv.appendChild(sunsetEl);
            repoEl.appendChild(sunsetDiv);

            //create a span element to hold wind
            var windDiv = document.createElement("div"); 
            windDiv.classList = "weather-div";
            var windEl = document.createElement("span"); 
            windEl.classList = "weather-info"; 
            windEl.innerHTML = "<i class='fas fa-wind'></i> " + wind; 
            windDiv.appendChild(windEl);
            repoEl.appendChild(windDiv); 

            //create a span element to hold weatherPic
            // var picDiv = document.createElement("div"); 
            // picDiv.classList = "weather-div";
            // var picEl = document.createElement("span"); 
            // picEl.classList = "weather-info";
            // picEl.textContent = weatherPic; 
            // picDiv.appendChild(picEl);
            // repoEl.append(picDiv);
        
        //append container to the dom 6.2.5
        repoContainerEl.appendChild(repoEl); //append repo to dom 6.2.5 - add div to container 
}; 
//add event listener - when submit button is clicked, formSubmitHandler function will execute 6.2.4
cityFormEl.addEventListener("submit", formSubmitHandler);

