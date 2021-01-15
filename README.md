# Weather-Dashboard

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city


ISSUES: 

Whenever I clicked on the stored cities, it would add the info to the main page underneath the old city info instead of changing this. I tried to clear the content of the main page by doing "repoEl = "";", but that only cleared the content when I pressed the "search" button. I finally realized that the way I was setting up all of the weather divs each time a city was searched for, instead of filling in the hardcoded HTML. ie: 


var currentTempDiv = document.createElement("div");
            currentTempDiv.classList = "weather-div";
            var currentTempEl = document.createElement("span"); 
            currentTempEl.classList = "weather-info";
            currentTempEl.innerHTML = "<i class='fas fa-thermometer-empty'></i> " + currentTemp; 
            currentTempDiv.appendChild(currentTempEl); 
            repoEl.appendChild(currentTempDiv); 
