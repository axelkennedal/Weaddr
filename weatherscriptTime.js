$(document).ready(function(){
	
	//Adds a zero if neccesary
	function twoDigits (val){
		if (val < 10) {
			val = "0" + val;
		};
		return val;
	}

	//Update the HTML displaying the time
	function updateClockHTML(id,showSeconds){
		var now = new Date();
		window.hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds = now.getSeconds();

		if(!showSeconds){
			//Round minutes
			if (seconds > 30) {
				//++minutes;
				if (minutes >=60) {
					++hours;
					if (hours >= 24) {
						hours = 0;
					}
				}
			}
		}
		var nowTime = hours + ":" + twoDigits(minutes);
		if (showSeconds) {
			nowTime += ":" + twoDigits(seconds);
		}
		document.getElementById(id).innerHTML = nowTime;
	}

	//Run the clock = make sure it's synced with the client system time
	function runClock(){
		var now = new Date();
		var timeToNextTick = (60 - now.getSeconds()) * 1000 - now.getMilliseconds(); //Time in ms until next minute
		setTimeout(function(){
			updateClockHTML("time");
			console.log("Updated time!");

			runClock();
		}, timeToNextTick);
	}

	//Start the clock
	updateClockHTML("time");
	runClock();


	function setLocalText (){
		//Show the current day
		var now = new Date();
		window.day = now.getDay();
		console.log(navigator.language);

		var englishDay   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var swedishDay   = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];
		var norwegianDay = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
		var language = navigator.language;
		var languageArray;
		switch(language){
			case "sv-se":
			case "sv":
				languageArray = swedishDay;
				break;
			case "no":
			case "nb":
			case "nn":
				languageArray = norwegianDay;
				break;
			default:
				languageArray = englishDay;
				break;
		}
		var today = languageArray[day];


		document.getElementById("day").innerHTML = today;
	}
	setLocalText();

	
	
});