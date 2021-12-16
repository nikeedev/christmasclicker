var game = {
	snowballs: 0,
	totalSnowballs: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.001,


	addTosnowballs: function(amount) {
		this.snowballs += amount;
		this.totalSnowballs += amount;
		display.updateSnowballs();

	},

	getSnowballsPerSecond: function() {
		var snowballsPerSecond = 0;
		for (i = 0; i < building.name.length; i++) {
			snowballsPerSecond += building.income[i] * building.count[i];

		}
		
		return snowballsPerSecond;

	}

};


var building = {
	name: ["Cursor", "Fertilizer", "Gardener", "Farm", "Mega Farm", "Forest", ],
	image: ["src/assets/big_cursor.png", "src/assets/big_fertilizer.png", "src/assets/big_gardener.png", "src/assets/big_farm.png", "src/assets/big_mega_farm.png", "src/assets/big_forest.png"],
	count: [0, 0, 0, 0, 0, 0],
	income: [5, 25, 50, 100, 375, 500],
	cost: [50, 150, 500, 1000, 5000, 10000],


	purchase: function(index) {
		if (game.snowballs >= this.cost[index]) {
			game.snowballs -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.10);
			display.updateSnowballs();
			display.updateShop();
			display.updateUpgrades();
		}
	}
};

var upgrade = {
	name: [
		"Gold Cursors",
		"Shiny Gold Cursors",
		"Clicker+",
		"Clicker++",
		"Golden Farm",
		"Golden Farm GOLDIER",
		"Mega Golden Farm",
		"Watery Fertillizers",
		"Shiny Watery Fertilizers"
	],
	description: [
		"Cursors are now twice as fast!",
		"4x Better and shinier than Gold Cursors",
		"Your Clicks will be doubled!",
		"This bad boy, gives your clicks 4x more than previous!",
		"Turn all your snowballs into GOLD!",
		"Farms are now 6x goldier than before!",
		"MY GOD, THATS POWERFUL!",
		"MY GOD, THATS EVEN MORE POWERFUL!!!!",
		"Water filled fertilizers",
		"Shiny snowballs!!!!"
	],
	image: [
		"big_gold_cursor.png",
		"big_gold_cursor.png",
		"big_strong_cursor.png",
		"big_strong_cursor.png",
		"big_gold_farm.png",
		"big_gold_farm.png",
		"big_gold_mega_farm.png",
		"big_gold_mega_farm.png",
		"big_watery_fertilizer.png",
		"big_shiny_watery_fertilizer.png"
	],
	type: [
		"building",
		"building",
		"click",
		"click",
		"building",
		"building",
		"building",
		"building",
		"building",
		"building"
	],
	cost: [
		300,
		520,
		700,
		1000,
		50000,
		1000000,
		10000000,
		15000000,
		1000,
		50000,
	],
	buildingIndex: [
		0,
		0,
		0,
		0,
		3,
		3,
		4,
		4,
		1,
		1
	],
	requirement: [
		30,
		45,
		150,
		225,
		50,
		125,
		150,
		250,
		50,
		100

	],
	bonus: [
		2,
		4,
		2,
		4,
		3.4,
		6.5,
		15,
		22,
		6,
		12
	],
	purchased: [
		false, 
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false
	],
	purchase: function(index) {
		if (!this.purchased[index] && game.snowballs >= this.cost[index]) {
			if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
				game.snowballs -= this.cost[index];
				building.income[this.buildingIndex[index]] *= this.bonus[index];
				this.purchased[index] = true;
				 
				display.updateUpgrades();
				display.updateSnowballs();
			} else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
				game.snowballs -= this.cost[index];
				game.clickValue *= this.bonus[index];
				this.purchased[index] = true;
				 
				display.updateUpgrades();
				display.updateSnowballs();
			}
		}
	},
};

var display = {
	updateSnowballs: () => {
		document.getElementById("snowballs").innerHTML = game.snowballs;
		document.getElementById("snowballsPerSecond").innerHTML = game.getSnowballsPerSecond();
		document.title = game.snowballs + " snowballs - Christmas Clicker"; 
	},

	updateShop: () => {
		document.getElementById("shopContainer").innerHTML = "";
		for (i = 0; i < building.name.length; i++) {
			document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'"></td><td id="nameAndCost"><p id="zeros">'+building.name[i]+'</p><p>'+building.cost[i]+'<span id="zeros"> snowballs</span></p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
		}
	},

	updateUpgrades: () => {
		for(i = 0; i < upgrade.name.length; i++) {
			if(!upgrade.purchased[i]) {
				if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
					document.getElementById("upgradeContainer").innerHTML += '<img src="src/assets/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' snowballs)" onclick="upgrade.purchase('+i+')">';
				} else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
					document.getElementById("upgradeContainer").innerHTML += '<img src="src/assets/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' snowballs)" onclick="upgrade.purchase('+i+')">';
				}
			}
            else {
                document.getElementById("upgradeContainer").innerHTML = "<p id='right'>No Upgrades available yet!</p>";
            }
		}
	}
};

function saveGame() {
	var gameSave = {
		snowballs: game.snowballs,
		totalSnowballs: game.totalSnowballs,
		totalClicks: game.totalClicks,
		clickValue: game.clickValue,
		buildingCount: building.count,
		buildingIncome: building.income,
		buildingCost: building.cost,
		upgradePurchased: upgrade.purchased,


	};
	localStorage.setItem("gameSaveSnow", JSON.stringify(gameSave));
}

function loadGame() {
	var savedGame = JSON.parse(localStorage.getItem("gameSaveSnow"));
	if (localStorage.getItem("gameSaveSnow") !== null) {
		if (typeof savedGame.snowballs !== "undefined") {
			game.snowballs = savedGame.snowballs; 
		}
		if (typeof savedGame.totalSnowballs !== "undefined") {
			game.totalSnowballs = savedGame.totalSnowballs;
		}
		if (typeof savedGame.totalClicks !== "undefined") {
			game.totalClicks = savedGame.totalClicks;
		}
		if (typeof savedGame.clickValue !== "undefined") {
			 game.clickValue = savedGame.clickValue;
		}

		if (typeof savedGame.buildingCount !== "undefined") {
			for (i = 0; i < savedGame.buildingCount.length; i++) {
				building.count[i] = savedGame.buildingCount[i];
			}
		}
		if (typeof savedGame.buildingCost !== "undefined") {
			for (i = 0; i < savedGame.buildingCost.length; i++) {
				building.cost[i] = savedGame.buildingCost[i];
			}
		}
		if (typeof savedGame.buildingIncome !== "undefined") {
			for (i = 0; i < savedGame.buildingIncome.length; i++) {
				building.income[i] = savedGame.buildingIncome[i];
			}
		}
		if (typeof savedGame.upgradePurchased !== "undefined") {
			for (i = 0; i < savedGame.upgradePurchased.length; i++) {
				upgrade.purchased[i] = savedGame.upgradePurchased[i];
			}
		}
	}
}

function resetGame() {
	var gameSave = {};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	location.reload();
}

document.getElementById("clicker").addEventListener("click", function() {
	game.totalClicks++;
	game.addTosnowballs(game.clickValue);
}, false);

window.onload = function() {
	loadGame();
	display.updateSnowballs();
	display.updateUpgrades();
	display.updateShop();
};

setInterval(() => {
	game.snowballs += game.getSnowballsPerSecond();
	game.totalSnowballs += game.getSnowballsPerSecond();
	display.updateSnowballs();
}, 1000);

setInterval(function() {
	saveGame();
}, 500);

setInterval(() => {
	display.updateSnowballs();
	display.updateUpgrades();
}, 10000);

