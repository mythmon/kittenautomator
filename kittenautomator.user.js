// ==UserScript==
// @name        Kitten Automator
// @namespace   http://mythmon.com/greasemonkey
// @description Automates some of the Kittens Game
// @include     http://bloodrizer.ru/games/kittens/
// @include     http://bloodrizer.ru/games/kittens/#
// @version     2
// @grant       none
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	/* globals gamePage:false, $:false */

	"use strict";

	var tickRate = 10;

	// Percentages at which extra resource should be used
	var dumpThreshholds = {
	  "culture": .95,
	  "science": .95
	};

	var workshopInstructions = [{ from: "catnip", to: "wood", amount: 30 }, { from: "wood", to: "beam", amount: 1 }, { from: "minerals", to: "slab", amount: 1 }, { from: "coal", to: "steel", amount: 1 }, { from: "iron", to: "plate", amount: 1 }, { from: "titanium", to: "alloy", amount: 1 }];

	function tick() {
	  tickWorkshop();
	  tickHunt();
	  tickStars();
	  tickBooks();
	}

	function tickBooks() {
	  var culture = gamePage.resPool.get("culture");
	  var science = gamePage.resPool.get("science");
	  if (culture.value / culture.maxValue > dumpThreshholds.culture) {
	    if (gamePage.workshop.getCraft("manuscript").unlocked && gamePage.resPool.get("parchment").value >= 25) {
	      gamePage.craft("manuscript", 1);
	    }
	  }
	  if (science.value / science.maxValue > dumpThreshholds.science) {
	    if (gamePage.workshop.getCraft("manuscript").unlocked && gamePage.resPool.get("manuscript").value >= 50) {
	      // Yes, "compendium" is misspelled in the source.
	      gamePage.craft("compedium", 1);
	    }
	  }
	}

	function tickWorkshop() {
	  for (var i = 0; i < workshopInstructions.length; i++) {
	    var fromRes = gamePage.resPool.get(workshopInstructions[i].from);

	    var toGo = fromRes.maxValue - fromRes.value;
	    var ratePerTick = fromRes.perTickUI * tickRate;
	    var enabled = gamePage.workshop.getCraft(workshopInstructions[i].to).unlocked;

	    if (toGo <= ratePerTick * 2 && enabled) {
	      gamePage.craft(workshopInstructions[i].to, workshopInstructions[i].amount);
	    }
	  }
	}

	function tickHunt() {
	  var catpower = gamePage.resPool.get("manpower");
	  if (catpower.value / catpower.maxValue > 0.95) {
	    $("a:contains('Send hunters')").click();
	    if (gamePage.workshop.getCraft("parchment").unlocked) {
	      gamePage.craftAll("parchment");
	    }
	  }
	}

	function tickStars() {
	  $("#gameLog input").click();
	}

	console.log("%cSetting up Kitten Automator...", "color: #12e");
	setTimeout(function () {
	  gamePage.timer.addEvent(tick, tickRate); // Every two seconds
	  console.log("%cKitten Automator active.", "color: #12e");
	}, 3000);

/***/ }
/******/ ]);