# Weather-Dashboard

Please visit my completed webpage at:  https://dvicj.github.io/Weather-Dashboard/

Hello, and welcome to my README! This is for my Week 6 Challenge, which was to create a Weather Dashboard. I learned a lot while doing this, and I am happy to be able to share my experience with you. 

It was my job to ensure my Weather Dashboard met the following criteria: 

    - when the user searches for a city, they are presented with the current and future conditions for that city and the city is added to the search history.
    - the search brings back: 
        1. the city name
        2. the current date
        3. an icon representing the current conditions
        4. the current temperature
        5. the humidity
        6. the wind speed
        7. the UV index - colour coded based on whether the conditions are favorable (green), moderate (yellow), or severe (orange/red)
    - a 5 day forecast which displays the date, an icon representing the conditions, the temperature and the humidity.
    - when the user clicks on the search history, then the information for that city is reloaded. 

<br>

I was to create this Weather Dashboard, and meet all of the requirements listed above, by using: 

	- HTML
    - CSS 
    - JavaScript
    - Web APIs
    - Third Party APIs - Moment.js, jQuery, Bootstrp
    - Server Side APIs - OpenWeatherMap
	
I completed this project as I wanted to be able to
search a database and display relevant information to the user in an appealing and simple way. 

It is important that I am able to showcase what I can do in an interactive and meaningful way. 

Features: 


* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [Learning](#learning)
* [License](#license)


## Installation

There is no installation required. All files must remain in the position in which they are saved to ensure that all links, styles and photos function properly. 

Below are examples of the links for the CSS style sheet and the images used in this webpage. 

![style sheet relative path](https://github.com/dvicj/Horiseon-Accessibility/blob/main/style%20sheet%20relative%20path.PNG)

![image relative path](https://github.com/dvicj/Horiseon-Accessibility/blob/main/image%20relative%20path.PNG)

## Usage

![website demo](https://github.com/dvicj/Weather-Dashboard/blob/main/assets/images/websitedemo.gif)

Here are some user experience highlights from my page: 

    - when the user searches for a city, they are shown data for that city. 
        - the current date 
        - an icon showing current weather conditions
        - temperature, feels like, humidity, wind  speed and UV index. 
        - a 5 day forecast showing the date, an icon, temperature, and humidity

    - the cities the user searches for are saved to local storage and appear on the page. When the user refreshes the page the saved cities persist.
     
    - when the user clicks on one of the saved cities, the data for that city is re-loaded onto the page. 

    - the user can clear the search history if it becomes to crowded by clicking the "Clear History" button. This will also remove the data from local storage. 

## Credits
These are some sources I used to help me along:

- [HTML Web Storage API](https://www.w3schools.com/html/html5_webstorage.asp)

- [Google Fonts](https://fonts.google.com/)

- [Font Awesome Icons](https://fontawesome.com/icons?d=gallery)

- [OpenWeatherMap](https://openweathermap.org/api)

- [jQuery](https://jquery.com/)

- [Bootstrap](https://getbootstrap.com/)

- [Moment.js](https://momentjs.com/)


## Learning
Here are the highlights of what I learned and issues I had while writing this code.

1. Whenever I clicked on the saved city history, it would add the info to the main page underneath the old city info instead of updating with new info. I tried to clear the content of the main page by doing "cityEl = "";", but that only cleared the content when I pressed the "search" button. I finally realized that the way I was setting up all of the weather divs each time a city was searched for, instead of filling in the hardcoded HTML by id. 

2. Once I fixed this, I discovered that everytime I clicked on the saved city history, it was bringing back the same data as the current city that was being displayed. I changed the "var" to "const" in my function and it fixed this. I still dont understand why this fixed it, but oh well. 

3. I had to use seperate API calls for the regular weather data, the 5 day forecast and the weather icon. This took a lot of trial and error before I was able to figure it out. I wish that the docs for OpenWeatherMap were more descriptive. I think they assume that the user has more experience using APIs than might be true for some people. 

4. I have come to the conclusion that it is absolutley necessary for me to draw out all of my webpages before I try to do any styling. I find it impossible to invision grids without drawing them out first. I find that the Bootstrap grid system is much easier for me to understand than the regular CSS grid. 

My webpage skeleton:

![webpage skeleton](https://github.com/dvicj/Weather-Dashboard/blob/main/assets/images/websiteplan.JPG)



## License

MIT License

Copyright (c) 2021 Devin Jones 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.