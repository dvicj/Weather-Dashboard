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
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=d766966c411b7f57a270ea89ff2f7bdc"; 
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
var displayRepos = function(name, searchTerm) {
    console.log(name);
    console.log("This is the city's cityname: " + searchTerm);
    //clear old city inputted content before displaying new content 6.2.5
    repoContainerEl.textContent = ""; //clears text from repoContainerEl 6.2.5
    repoSearchTerm.textContent = searchTerm; //ensures the page displays the cityname/search term  
    for (var i=0; i<name.length; i++) {
        //format repo name 6.2.5 
        //taking each repository "repos[i]"" and writing some of it's data to the page (owner and login and name)
        var weatherStats = weather.main + "/" + weather.icon + "/" + main.temp + "/" + main.humidity 
        console.log("blah blah" + name);
        //create a conatiner for each repo 6.2.5
        var repoEl = document.createElement("div"); //create a new div element called repoEl 6.2.5
        repoEl.classList = "list-item flex-row justify-space-between align-center"; //apply classes to repoEl <div> 6.2.5
        //create a span element to hold repository name 6.2.5
        var titleEl = document.createElement("span"); //create a new span element called titleEl 6.2.5 
        titleEl.textContent = weatherStats; // add repoName to titleEl - to hold formatted repository name 
        //append to container 6.2.5
        repoEl.appendChild(titleEl); //append title to container 6.2.5 - add span to div 
        //create status element 
        var statusEl = document.createElement("span"); //create a new span element called statusEL 6.2.5 
        statusEl.classList = "flex-row align-center"; //apply classes to statusEl <span> - 6.2.5 
        //append to container 6.2.5
        repoEl.appendChild(statusEl); 
        
        //append container to the dom 6.2.5
        repoContainerEl.appendChild(repoEl); //append repo to dom 6.2.5 - add div to container 
    }
}; 
//add event listener - when submit button is clicked, formSubmitHandler function will execute 6.2.4
cityFormEl.addEventListener("submit", formSubmitHandler);

