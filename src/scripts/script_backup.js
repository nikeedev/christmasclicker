
let snowballs = 0;

let cursorCost = 15;
let cursors = 0;

let gardenerCost = 150;
let gardeners = 0;

let fertilizerCost = 50;
let fertilizers = 0;

let clickingPower = 1;




function buyCursor() {
	if (snowballs >= cursorCost) {
		snowballs = snowballs - cursorCost;
		cursors = cursors + 1;
		cursorCost = Math.round(cursorCost * 1.15);

		

		document.getElementById("snowballs").innerHTML = snowballs;
		document.getElementById("cursorcost").innerHTML = cursorCost;
		document.getElementById("cursors").innerHTML = cursors;
		updateScorePerSecond();
	}
}



function buyGardener() {
	if (snowballs >= gardenerCost) {
		snowballs = snowballs - gardenerCost;
		gardeners = gardeners + 1;
		gardenerCost = Math.round(gardenerCost * 1.15);

		document.getElementById("snowballs").innerHTML = snowballs;
		document.getElementById("gardenercost").innerHTML = gardenerCost;
		document.getElementById("gardeners").innerHTML = gardeners;
		updateScorePerSecond();
	}
}


function buyFertilizer() {
	if (snowballs >= fertilizerCost) {
		snowballs = snowballs - fertilizerCost;
		fertilizers = fertilizers + 1;
		fertilizerCost = Math.round(fertilizerCost * 1.15);

		document.getElementById("snowballs").innerHTML = snowballs;
		document.getElementById("fertilizercost").innerHTML = fertilizerCost;
		document.getElementById("fertilizers").innerHTML = fertilizers;
		updateScorePerSecond();
	}
}


document.getElementById("btn").onclick = function () {
	snowballs += clickingPower;

	
	document.getElementById("snowballs").innerHTML = snowballs;
}



function updateScorePerSecond() {
	scorePerSecond = cursors + (fertilizers * 5) + (gardeners * 13);
	document.getElementById("scorepersecond").innerHTML = scorePerSecond;
}

myStorage = window.localStorage;


function loadGame() {
	var savedGame = JSON.parse(myStorage.getItem("gameSave"));
	if (typeof savedGame.snowballs !== "undefined") {
		snowballs = savedGame.snowballs; 
	}
	if (typeof savedGame.clickingPower !== "undefined") {
		clickingPower = savedGame.clickingPower;
	}
	if (typeof savedGame.cursorCost !== "undefined") { 
		cursorCost = savedGame.cursorCost;
	}
	if (typeof savedGame.cursors !== "undefined") {
		cursors = savedGame.cursors;
	}
	if (typeof savedGame.gardenerCost !== "undefined") {
		gardenerCost = savedGame.gardenerCost;
	}
	if (typeof savedGame.gardeners !== "undefined") {
		gardeners = savedGame.gardeners;
	}
	if (typeof savedGame.fertilizerCost !== "undefined") {
		fertilizerCost = savedGame.fertilizerCost;
	}
	if (typeof savedGame.fertilizers !== "undefined") {
		fertilizers = savedGame.fertilizers;
	}
	document.getElementById("snowballs").innerHTML = snowballs;
	document.getElementById("cursorcost").innerHTML = cursorCost;
	document.getElementById("cursors").innerHTML = cursors;
	document.getElementById("gardenercost").innerHTML = gardenerCost;
	document.getElementById("gardeners").innerHTML = gardeners;
	document.getElementById("fertilizercost").innerHTML = fertilizerCost;
	document.getElementById("fertilizers").innerHTML = fertilizers;
}

window.onload = function() {
	loadGame();
	updateScorePerSecond();
};


function saveGame() {
	var gameSave = {
		snowballs: snowballs,
		clickingPower: clickingPower,
		cursorCost: cursorCost,
		cursors: cursors,
		gardenerCost: gardenerCost,
		gardeners: gardeners,
		fertilizerCost: fertilizerCost,
		fertilizers: fertilizers
	};
	myStorage.setItem("gameSave", JSON.stringify(gameSave));
}


function resetGame() {
	
	var gameSave = { };
	myStorage.setItem("gameSave", JSON.stringify(gameSave));
	document.getElementById("snowballs").innerHTML = snowballs;
	document.getElementById("cursorcost").innerHTML = cursorCost;
	document.getElementById("cursors").innerHTML = cursors;
	document.getElementById("gardenercost").innerHTML = gardenerCost;
	document.getElementById("gardeners").innerHTML = gardeners;
	document.getElementById("fertilizercost").innerHTML = fertilizerCost;
	document.getElementById("fertilizers").innerHTML = fertilizers;
	location.reload();

}


setInterval(function() {
	snowballs = snowballs + cursors;
	snowballs = snowballs + fertilizers * 5;
	snowballs = snowballs + gardeners * 13;
	document.getElementById("snowballs").innerHTML = snowballs;


	document.title = snowballs + " snowballs - Plant Clicker";
}, 1000);


setInterval(function() {
	saveGame();
}, 500);


