$(document).ready(function () {

/*
  _____            _                 
 |  __ \          (_)                
 | |  | | ___  ___ _  __ _ _ __      
 | |  | |/ _ \/ __| |/ _` | '_ \     
 | |__| |  __/\__ \ | (_| | | | |    
 |_____/ \___||___/_|\__, |_| |_|    
                      __/ |          
  ______ ______ _____|___/___ ______ 
 |______|______|______|______|______|
*/
    function makeBlackAndWhite() {
        $("#content").toggleClass("blackAndWhite");
        $("img").each(function () {
            $(this).attr("src", $(this).attr("src").replace("white", "black"));
        });
        imageColor = "black";
        $(".backgroundGradientSunset").hide();
        $(".backgroundGradientDay").hide();
        $(".backgroundGradientNight").hide();
    }
    function unMakeBlackAndWhite() {
        $("#content").toggleClass("blackAndWhite");
        $("img").each(function () {
            $(this).attr("src", $(this).attr("src").replace("black", "white"));
        });
        imageColor = "white";
        $(".backgroundGradientSunset").show();
        $(".backgroundGradientDay").show();
        $(".backgroundGradientNight").show();
        updateBackground();
    }

    $("#style").change(function () {
        if ($(this).val() == "Black and White") {
            makeBlackAndWhite();
        }
        else if ($(this).val() == "Natural") {
        	unMakeBlackAndWhite();
        };
    });


    //Gradient background
    function updateBackground() {
        var time = new Date();
        var currentHour = time.getHours();
        var currentMinute = time.getMinutes();
        var transitionProgress;
        console.log("---------------------------");
        //It's day
        if (currentHour >= 08 && currentHour <= 17) {
            $(".backgroundGradientNight").css({
                "opacity": 0
            });
            $(".backgroundGradientSunset").css({
                "opacity": 0
            });

            //It's inbetween day and sunset
            if (currentHour == 16 || currentHour == 17) {
                if (currentHour == 16) {
                    transitionProgress = currentMinute; //The progress is at it's first half (the first hour out of two)
                } else {
                    transitionProgress = currentMinute + 60; //One hour has passed
                }
                $(".backgroundGradientDay").css({
                    "opacity": 1 - transitionProgress / 120
                });
                $(".backgroundGradientSunset").css({
                    "opacity": transitionProgress / 120
                });
                /*
					console.log("Day: ");
					console.log(1-transitionProgress/120);
					console.log("Sunset: ");
					console.log(transitionProgress/120);
					*/
            };
        };

        //It's sunset
        if (currentHour >= 18 && currentHour <= 21) {
            $(".backgroundGradientNight").css({
                "opacity": 0
            });
            $(".backgroundGradientDay").css({
                "opacity": 0
            });

            //It's inbetween sunset and night
            if (currentHour == 20 || currentHour == 21) {
                if (currentHour == 20) {
                    transitionProgress = currentMinute; //The progress is at it's first half (the first hour out of two)
                } else {
                    transitionProgress = currentMinute + 60; //One hour has passed
                }
            }
            $(".backgroundGradientSunset").css({
                "opacity": 1 - transitionProgress / 120
            });
            $(".backgroundGradientNight").css({
                "opacity": transitionProgress / 120
            });
            /*
				console.log("Sunset: ");
				console.log(1-transitionProgress/120);
				console.log("Night: ");
				console.log(transitionProgress/120);
				*/
        };

        if (currentHour >= 22 && currentHour <= 7) {
            console.log("Its night!");
        };

        //It's night
        if (currentHour >= 22 || currentHour <= 07) {

            $(".backgroundGradientSunset").css({
                "opacity": 0
            });
            $(".backgroundGradientDay").css({
                "opacity": 0
            });

            //It's inbetween night and day
            if (currentHour == 06 || currentHour == 07) {
                if (currentHour == 06) {
                    transitionProgress = currentMinute; //The progress is at it's first half (the first hour out of two)
                } else {
                    transitionProgress = currentMinute + 60; //One hour has passed
                }
            }
            $(".backgroundGradientNight").css({
                "opacity": 1 - transitionProgress / 120
            });
            $(".backgroundGradientDay").css({
                "opacity": transitionProgress / 120
            });
            /*
				console.log("Night: ");
				console.log(1-transitionProgress/120);
				console.log("Day: ");
				console.log(transitionProgress/120);
				*/
        };
    }

    function runClock() {
        var now = new Date();
        var timeToNextTick = (120 - now.getSeconds()) * 1000 - now.getMilliseconds(); //Time in ms until next background update, 120 seconds between each
        setTimeout(function () {
            updateBackground();
            console.log("Updated background!");
            runClock();
        }, timeToNextTick);
    }

    updateBackground(); //Calls the updateBackground() instantly when the page is loaded
    runClock();


    $(".header").click(function(){
    	$(".changeLocation").slideToggle(500,function(){
    		$(".header").html(function(){
    			return $(".changeLocation").is(":visible") ?  'Hide location picker' : 'Change location <img src="expand.png" style="height: 10px; margin-left: 7px;">';
    		});
    	});
    });



/*
  _____        _        
 |  __ \      | |       
 | |  | | __ _| |_ __ _ 
 | |  | |/ _` | __/ _` |
 | |__| | (_| | || (_| |
 |_____/ \__,_|\__\__,_|
  ______ ______ ______  
 |______|______|______| 
*/
    //Quick access to elements
    var locationDisplay = document.getElementById("currentLocation");
    var currentTempDisplay = document.getElementById("currentTemperature");
    var weatherTypeDisplay = document.getElementById("weatherIcon");
    var currentTempLabelDisplay = document.getElementById("currentTempLabel");
    var incorrectLocationDisplay = document.getElementById("incorrectLocation");

    function fullLengthCountry(countryCode) {
        switch (countryCode) { //Make sure the country name is displayed full-length
            case "SE":
                countryCode = "Sweden";
                break;
            case "NO":
                countryCode = "Norway";
                break;
            case "DK":
            	countryCode = "Denmark";
            	break;
            case "FR":
                countryCode = "France";
                break;
            case "GB":
                countryCode = "Great Britain";
                break;
            case "CN":
                countryCode = "China";
                break;
            case "DE":
                countryCode = "Germany";
                break;
            case "IE":
                countryCode = "Ireland";
                break;
            case "ES":
                countryCode = "Spain";
                break;
            case "IT":
                countryCode = "Italy";
                break;
            case "MX":
                countryCode = "Mexico";
                break;
            case "US":
                countryCode = "United States of America";
                break;
            case "AE":
                countryCode = "United Arab Emirates";
                break;
            case "AU":
                countryCode = "Australia";
                break;
            case "TH":
                countryCode = "Thailand";
                break;
            case "MC":
                countryCode = "Monaco";
                break;
        }
        return countryCode;
    }
    var imageColor = "white";

    function pickWeatherIcon(weatherTypeID, now) {
        if (weatherTypeID == 800 && now && window.hours >= 20) {
            WeatherIcon = "weatherIcons/" + imageColor + "/sunnyNight.png";
        } else if (weatherTypeID == 800) {
            WeatherIcon = "weatherIcons/" + imageColor + "/sunny.png";
        } else if (weatherTypeID == 801 || weatherTypeID == 802) {
            WeatherIcon = "weatherIcons/" + imageColor + "/sunnyCloudy.png";
        } else if (weatherTypeID >= 803 && weatherTypeID <= 804) {
            WeatherIcon = "weatherIcons/" + imageColor + "/cloudy.png";
        } else if (weatherTypeID >= 200 && weatherTypeID <= 232) {
            WeatherIcon = "weatherIcons/" + imageColor + "/thunder.png";
        } else if (weatherTypeID >= 300 && weatherTypeID <= 321 || weatherTypeID >= 502 && weatherTypeID <= 531) {
            WeatherIcon = "weatherIcons/" + imageColor + "/rain.png";
        } else if (weatherTypeID == 500 || weatherTypeID == 501) { //More accuracy here plz
            WeatherIcon = "weatherIcons/" + imageColor + "/sunnyRain.png";
        } else if (weatherTypeID >= 600 && weatherTypeID <= 622) {
            WeatherIcon = "weatherIcons/" + imageColor + "/snow.png";
        } else if (weatherTypeID >= 701 && weatherTypeID <= 781) {
            WeatherIcon = "weatherIcons/" + imageColor + "/foggy.png";
        }
        return WeatherIcon;
    }



    function getWeatherData(newLocation) {
        //Get weather data from server

        $("#loading").show();
        $("#forecastToday").hide();
        $("#forecast").hide();
        $("#loading").fadeTo(500, 1, "easeInCirc");

        var weatherAPIKey = "&APPID=5f5f57dd6360c9cb8e0542e11844e2ba"; //API key so server knows who's requesting
        var weatherRequestURL;
        if (newLocation && isNaN(newLocation)) { //Search for a city name
            weatherRequestURL = "http://api.openweathermap.org/data/2.5/weather?q=" + newLocation + weatherAPIKey + "&units=metric";
        } else {
            weatherRequestURL = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + window.latitude + "&lon=" + window.longitude + weatherAPIKey + "&units=metric";
        }

        //Actually get all weather data for current situation
        $.getJSON(weatherRequestURL, function (forecastNow) {
            $("#loading").fadeTo(500, 0);
            setTimeout(function () {
                $("#loading").hide();
            }, 501);
            if (forecastNow.cod == "404" || !forecastNow.hasOwnProperty("name") || !isNaN(newLocation)) { //Invalid search input
                console.log("Failed to get weather data!");
                $("#incorrectLocation").show();
                $("#currentWeather").hide();
                $("#locationText").hide();
            } else { //Valid search input
                $("#incorrectLocation").hide();
                $("#currentWeather").show();
                $("#locationText").show();

                //Storing data in variables
                var temp = Math.round(forecastNow.main.temp);
                var city = forecastNow.name;
                var country = forecastNow.sys.country;
                country = fullLengthCountry(country);

                var weatherTypeID = forecastNow.weather[0].id;
                var latitude = forecastNow.coord.lat;
                var longitude = forecastNow.coord.lon;
                //Fixes swedish location names
                city = city.replace("OE", "Ö");

                //Adding data to HTML
                locationDisplay.innerHTML = city + ", <span class='regular'>" + country + "</span><span class='light tiny'>		(Lat: " + latitude + "° Long: " + longitude + "°)</span>";
                currentTempDisplay.innerHTML = temp + "<span class='light'>°C</span>";
                //currentTempLabelDisplay.innerHTML = "Current temperature";

                var currentWeatherIcon = pickWeatherIcon(weatherTypeID, true);
                weatherTypeDisplay.innerHTML = '<img src="' + currentWeatherIcon + '">';
            }
        });

        var forecastTodayRequestURL;

        if (newLocation && isNaN(newLocation)) { //Search for a city name
            forecastTodayRequestURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + newLocation + weatherAPIKey + "&units=metric";
        } else {
            forecastTodayRequestURL = "http://api.openweathermap.org/data/2.5/forecast?" + "lat=" + window.latitude + "&lon=" + window.longitude + weatherAPIKey + "&units=metric";
        }

        //Actually get all weather data for rest of the day
        $.getJSON(forecastTodayRequestURL, function (forecastToday) {
            var forecastTodayDisplay = "#forecastTodayData"; //Where to add forecastToday data
            $(forecastTodayDisplay).empty(); //Clear previous weather data
            $("#loading").fadeTo(500, 0);
            setTimeout(function () {
                $("#loading").hide();
            }, 501);
            $("#forecastToday").show();

            console.log("Every 3 hours:" + forecastTodayRequestURL);
            console.log(forecastToday);
            var currentForecastTodayObject = 0; //Start with the third object in the list, it is the first one that should be displayed

            var forecastTodayDate = forecastToday.list[0].dt_txt.substring(8, 10);
            var isToday = true;

            //Loop through the forecast objects and add their data to the HTML
            while (isToday) {
                if (forecastToday.list[currentForecastTodayObject].dt_txt.substring(8, 10) == forecastTodayDate || forecastToday.list[currentForecastTodayObject].dt_txt.substring(11, 13) == 00) {
                    isToday = true;
                    var todayObjectTime = forecastToday.list[currentForecastTodayObject].dt_txt.substring(11, 13);
                    if (todayObjectTime == 00) {
                        todayObjectTime = 24;
                        numberOfTodayObjects = 1;
                    }; //Fix time format
                    var todayObjectTemp = Math.round(forecastToday.list[currentForecastTodayObject].main.temp);
                    var todayObjectWeatherTypeID = forecastToday.list[currentForecastTodayObject].weather[0].id;
                    var currentWeatherIcon = pickWeatherIcon(todayObjectWeatherTypeID, false);

                    //Add data to HTML
                    var forecastTodayHTML = '\
						<div class="laterTodayMoment">\
						<span class="small fat">' + todayObjectTime + ':00</span>\
						<br>\
						<span class="light big">' + todayObjectTemp + '°</span>\
						<br>\
						<img src="' + currentWeatherIcon + '">\
						</div>';

                    $(forecastTodayHTML).appendTo(forecastTodayDisplay);


                    currentForecastTodayObject++; //Move on to the next object the next time the loop runs
                } else {
                    isToday = false;
                }
            }
        });

        //Get weather data for the coming days
        var forecastRequestURL;

        if (newLocation && isNaN(newLocation)) { //Search for a city name
            forecastRequestURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + newLocation + "&cnt=13" + weatherAPIKey + "&units=metric";
        } else {
            forecastRequestURL = "http://api.openweathermap.org/data/2.5/forecast/daily?" + "lat=" + window.latitude + "&lon=" + window.longitude + "&cnt=13" + weatherAPIKey + "&units=metric";
        }

        $.getJSON(forecastRequestURL, function (forecast) {
            var forecastDisplay = "#forecastData";
            $(forecastDisplay).empty();
            $("#loading").fadeTo(500, 0);
            setTimeout(function () {
                $("#loading").hide();
            }, 501);
            $("#forecast").show();
            console.log("Daily:" + forecastRequestURL);
            console.log(forecast);

            //Process each day
            var forecastDay = window.day;
            console.log("Day: " + forecastDay);
            for (var day = 1; day < 13; day++) {
                var maxTemp = Math.round(forecast.list[day].temp.max);
                var minTemp = Math.round(forecast.list[day].temp.min);
                var weatherTypeIcon = pickWeatherIcon(forecast.list[day].weather[0].id, false);

                //Human-ize day-display
                forecastDay = (forecastDay + 1) % 7;
                var englishDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var forecastDayText = englishDay[forecastDay];

                if (forecastDay == 1) {
                    var nextWeekHTML = '\
						<div style="margin-top: 80px; text-align: left;">Next Week</div>\
						<hr style="height:2px;">';
                    $(nextWeekHTML).appendTo(forecastDisplay);
                };

                //Add data to HTML
                var forecastHTML = '\
					<div class="forecastDataDay">\
					<div class="forecastDay leftfloat light">' + forecastDayText + '</div>\
					<div class="forecastTemperature leftfloat"><span class="light">' + minTemp + '</span> - ' + maxTemp + '°</div>\
					<img src="' + weatherTypeIcon + '">\
					<hr>\
					</div>';

                $(forecastHTML).appendTo(forecastDisplay);
            }
        });



    }

    function getLocation() {
        $("#forecastToday").hide();
        $("#forecast").hide();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showLocationInfo); //Runs the function "showLocationInfo()"
        } else {
            locationDisplay.innerHTML = "Could not find your location, please enter one manually.";
        }
    }

    function showLocationInfo(position) {
        window.latitude = Math.round(position.coords.latitude * 10) / 10;
        window.longitude = Math.round(position.coords.longitude * 10) / 10;
        getWeatherData();
    }
    getLocation();

    //The user wants weather for his current position
    $("#findMe").click(function () {
        getLocation();
    });

    //Submits the user-picked location using the "ENTER"-key
    $("#locationChoice").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $("#locationSubmit").trigger("click");
        }
    });

    //The user picks a custom location
    $("#locationSubmit").click(function () {
        window.newLocation = $("#locationChoice").val().replace(", ", ",").toLowerCase(); //Removes extra space and makes it all lowercase
        newLocation = newLocation.replace("america", "usa");
        console.log(newLocation);
        //Makes sure major cities do not need country to be specified (and fixes related problems)
        switch (newLocation) {
            case "paris":
                newLocation += ",france";
                break;
            case "new york":
            case "washington":
            case "boston":
            case "detroit":
            case "san antonio":
            case "columbus":
            case "jacksonville":
            case "melbourne":
            case "louisville":
            case "richmond":
            case "san francisco":
                newLocation += ",usa";
                break;
            case "london":
            case "manchester":
                newLocation += ",england";
                break;
            case "dublin":
                newLocation += ",ireland";
                break;
            case "sydney":
                newLocation += ",australia";
                break;
            case "melbourne,austrailia":
                newLocation = "melbourne";
                break;
            case "dhaka":
                newLocation += ",bangladesh";
                break;
            case "osaka":
                newLocation += ",japan";
                break;
            case "seoul":
                newLocation += ",south korea";
                break;
            case "barcelona":
                newLocation += ",spain";
                break;

        }
        getWeatherData(window.newLocation);
    });
	//Update weather data every 30 minutes
    setInterval(function(){
        getWeatherData(window.newLocation);
    },1800000);
});