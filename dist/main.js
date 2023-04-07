/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"geocode\": () => (/* binding */ geocode),\n/* harmony export */   \"weather\": () => (/* binding */ weather)\n/* harmony export */ });\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./src/render.js\");\n\r\n\r\n\r\nconst geocode = (() => {\r\n    let current = \"Seattle\";\r\n    let latitude;\r\n    let longitude;\r\n    let timezone;\r\n    let country;\r\n    const input = document.querySelector('input');\r\n    const check = (newCity) => {\r\n        if (newCity !== current) find(newCity); //If city changed, find the new city's location\r\n    };\r\n    const find = async (city) => {\r\n        try {\r\n            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);\r\n            const data = await response.json(); //Convert data to JSON\r\n            latitude = data.results[0].latitude;\r\n            longitude = data.results[0].longitude;\r\n            timezone = data.results[0].timezone;\r\n            country = data.results[0].country;\r\n            current = data.results[0].name;\r\n            input.value = `${current}, ${country}`; //Add country to input value\r\n            weather.find(latitude, longitude, timezone); //Find weather data\r\n        } catch { //If city could not be found\r\n            const msg = document.querySelector(\"#errorMsg\");\r\n            msg.className = \"show\";\r\n            setTimeout(function () { msg.className = msg.className.replace(\"show\", \"\"); }, 3000); //Show error message for 3 seconds\r\n            input.select(); //Select all text to prepare edit\r\n        }\r\n    };\r\n    return { check, find };\r\n})();\r\n\r\nconst weather = (() => {\r\n    const find = async (latitude, longitude, timezone) => {\r\n        try {\r\n            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=${timezone}`);\r\n            const data = await response.json(); //Convert data to JSON\r\n\r\n            let hour = data.current_weather.time.substring(11, 13).replace(/^0+(\\d)/, '$1'); //Get current hour & remove leading zero except for one ie.) midnight 00 becomes 0\r\n            let currentTemp = Math.round(data.current_weather.temperature); //Get current temp & round to the nearest whole number\r\n            let currentCode = data.current_weather.weathercode; //Get current weather code\r\n            let apparent = Math.round(data.hourly.apparent_temperature[hour]); //Get current apparent temp & round to the nearest whole number\r\n            let wind = data.hourly.windspeed_10m[hour]; //Get current wind speed\r\n            let humidity = data.hourly.relativehumidity_2m[hour]; //Get current humidity\r\n            let codes = data.daily.weathercode; //Get daily weather codes\r\n            let dates = data.daily.time; //Get dates for the week\r\n            let highs = data.daily.temperature_2m_max; //Get daily max temps\r\n            let lows = data.daily.temperature_2m_min; //Get daily min temps\r\n            let sunrise = _ui_js__WEBPACK_IMPORTED_MODULE_0__.moment.convertToMinutes(data.daily.sunrise[0].substring(11)); //Set current day's sunrise time in minutes\r\n            let sunset = _ui_js__WEBPACK_IMPORTED_MODULE_0__.moment.convertToMinutes(data.daily.sunset[0].substring(11)); //Set current day's sunset time in minutes\r\n            \r\n            _ui_js__WEBPACK_IMPORTED_MODULE_0__.moment.set(timezone, sunset, sunrise); //Set time\r\n            _render_js__WEBPACK_IMPORTED_MODULE_1__.weatherDisplays.current(currentCode, currentTemp, apparent, wind, humidity, highs[0], lows[0]); //Display current weather data\r\n            document.querySelector('.daily-weather').replaceChildren(); //Remove old forecasts\r\n            for (let i = 0; i < 7; i++) { //For each weekday's forecast,\r\n                _render_js__WEBPACK_IMPORTED_MODULE_1__.weatherDisplays.daily(codes[i], dates[i], highs[i], lows[i]); //Show the data\r\n            }\r\n        } catch (error) {\r\n            console.log(error);\r\n        }\r\n    };\r\n    const interpretCode = (code) => { //Use weather code to find index of weather icon & description\r\n        if (code < 1) {\r\n            return 0;\r\n        } else if (code < 4) {\r\n            return 1;\r\n        } else if (code < 49) {\r\n            return 2;\r\n        } else if (code < 56) {\r\n            return 3;\r\n        } else if (code < 58) {\r\n            return 4;\r\n        } else if (code < 66) {\r\n            return 5;\r\n        } else if (code < 68) {\r\n            return 6;\r\n        } else if (code < 76) {\r\n            return 7;\r\n        } else if (code < 78) {\r\n            return 8;\r\n        } else if (code < 83) {\r\n            return 9;\r\n        } else if (code < 87) {\r\n            return 10;\r\n        } else if (code < 96) {\r\n            return 11;\r\n        } else if (code < 100) {\r\n            return 12;\r\n        }\r\n    };\r\n    return { find, interpretCode };\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n\r\n\r\n\r\n_api_js__WEBPACK_IMPORTED_MODULE_1__.geocode.find(document.querySelector('input').value); //Find default city weather\r\n_ui_js__WEBPACK_IMPORTED_MODULE_0__.city.listen(); //Add event listeners to city input\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"weatherDisplays\": () => (/* binding */ weatherDisplays)\n/* harmony export */ });\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n\r\n\r\nconst weatherDisplays = (() => {\r\n    const weatherIcons = [\"icons/sunny.svg\", \"icons/partly-cloudy.svg\", \"icons/fog.svg\", \"icons/drizzle.svg\", \"icons/drizzle-freezing.svg\", \"icons/rain.svg\", \"icons/rain-freezing.svg\", \"icons/snow.svg\", \"icons/hail.svg\", \"icons/rain-showers.svg\", \"icons/snow-showers.svg\", \"icons/thunderstorms.svg\", \"icons/thunderstorms-hail.svg\"];\r\n    const weatherTypes = [\"Clear Sky\", \"Partly Cloudy\", \"Fog\", \"Drizzle\", \"Freezing Drizzle\", \"Rain\", \"Freezing Rain\", \"Snow\", \"Hail\", \"Rain Showers\", \"Snow Showers\", \"Thunderstorms\", \"Thunderstorms & Hail\"];\r\n\r\n    const current = (code, current, apparent, windSpd, humidity, max, min) => {\r\n        const parent = document.querySelector('.current-weather');\r\n        parent.replaceChildren(); //Clear old forecast\r\n        const conditions = document.createElement('div');\r\n        conditions.classList.add(\"conditions\");\r\n        parent.appendChild(conditions);\r\n        const icon = document.createElement('img');\r\n        icon.src = weatherIcons[_api_js__WEBPACK_IMPORTED_MODULE_1__.weather.interpretCode(code)]; //Set weather icon\r\n        icon.alt = weatherTypes[_api_js__WEBPACK_IMPORTED_MODULE_1__.weather.interpretCode(code)];\r\n        conditions.appendChild(icon);\r\n        const temp = document.createElement('span');\r\n        temp.innerText = current;\r\n        conditions.appendChild(temp);\r\n        const degrees = document.createElement('div');\r\n        degrees.classList.add(\"degrees\");\r\n        conditions.appendChild(degrees);\r\n        const symbol = document.createElement('span');\r\n        symbol.innerText = \"°\";\r\n        degrees.appendChild(symbol);\r\n        const fahrenheit = document.createElement('span');\r\n        fahrenheit.innerText = \"F\";\r\n        fahrenheit.classList.add(\"fahrenheit\");\r\n        degrees.appendChild(fahrenheit);\r\n        const celsius = document.createElement('span');\r\n        celsius.innerText = \"C\";\r\n        celsius.classList.add(\"celsius\", \"faded\");\r\n        degrees.appendChild(celsius);\r\n        const details = document.createElement('div');\r\n        details.classList.add(\"details\");\r\n        parent.appendChild(details);\r\n        const description = document.createElement('span');\r\n        description.innerText = weatherTypes[_api_js__WEBPACK_IMPORTED_MODULE_1__.weather.interpretCode(code)]; //Set weather description\r\n        description.classList.add(\"description\");\r\n        details.appendChild(description);\r\n        const highLow = document.createElement('span');\r\n        highLow.innerText = `High: ${max}°/Low: ${min}°`;\r\n        details.appendChild(highLow);\r\n        const feelsLike = document.createElement('span');\r\n        feelsLike.innerText = `Feels like: ${apparent}°`;\r\n        details.appendChild(feelsLike);\r\n        const wind = document.createElement('span');\r\n        wind.innerText = `Wind: ${windSpd}mph`;\r\n        details.appendChild(wind);\r\n        const percentage = document.createElement('span');\r\n        percentage.innerText = `Humidity: ${humidity}%`;\r\n        details.appendChild(percentage);\r\n        const updatedTime = document.createElement('span');\r\n        updatedTime.innerText = `Updated: ${document.querySelector('.hours').innerText}:${document.querySelector('.minutes').innerText} ${document.querySelector('.meridiem').innerText}`;\r\n        details.appendChild(updatedTime);\r\n    };\r\n\r\n    const daily = (code, date, high, low) => {\r\n        const container = document.createElement('div');\r\n        document.querySelector('.daily-weather').appendChild(container);\r\n        const day = document.createElement('span');\r\n        day.innerText = _ui_js__WEBPACK_IMPORTED_MODULE_0__.moment.findWeekday(date) + \" \" + Number(date.substring(8)); //Use first 3 letters of weekday & day number without leading zero\r\n        container.appendChild(day);\r\n        const icon = document.createElement('img');\r\n        icon.src = weatherIcons[_api_js__WEBPACK_IMPORTED_MODULE_1__.weather.interpretCode(code)]; //Set weather icon\r\n        container.appendChild(icon);\r\n        const temps = document.createElement('div');\r\n        temps.classList.add('high-low');\r\n        container.appendChild(temps);\r\n        const highTemp = document.createElement('span');\r\n        highTemp.classList.add('high');\r\n        highTemp.innerText = Math.round(high) + \"° / \"; //Round temp to nearest whole number\r\n        temps.appendChild(highTemp);\r\n        const lowTemp = document.createElement('span');\r\n        lowTemp.classList.add('low');\r\n        lowTemp.innerText = Math.round(low) + \"°\";\r\n        temps.appendChild(lowTemp);\r\n    };\r\n    return { current, daily };\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/render.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"city\": () => (/* binding */ city),\n/* harmony export */   \"moment\": () => (/* binding */ moment)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n\r\n\r\nconst moment = (() => {\r\n    let hours = document.querySelector('.hours');\r\n    let minutes = document.querySelector('.minutes');\r\n    let seconds = document.querySelector('.seconds');\r\n    let meridiem = document.querySelector('.meridiem');\r\n\r\n    const convertToMinutes = (time) => {\r\n        let splitTime = time.split(':');\r\n        return Number(splitTime[0] * 60) + Number(splitTime[1]); //Convert military time to minutes\r\n    };\r\n\r\n    const update = (zone, sunset, sunrise) => {\r\n        let present = new Date(); // Thu Apr 06 2023 15:29:04 GMT-0700 (Pacific Daylight Time)\r\n        let date = present.toLocaleString('default', { timeZone: zone, weekday: 'long', month: 'long', day: 'numeric' }); // Timezone-specific Weekday, Month, Day\r\n        let now = present.toLocaleString('default', { timeZone: zone, hour12: false }); // Timezone-specific MM/DD/YYYY, HH:MM:SS\r\n        let hh = now.substring(10, 12); //Get hours\r\n        let mm = now.substring(13, 15); //Get minutes\r\n        let ss = now.substring(16); //Get seconds\r\n        let amPM = \"AM\"; //Get meridiem\r\n        let militaryTime = now.substring(10, 15); // HH:MM:SS\r\n        checkSun(convertToMinutes(militaryTime), sunset, sunrise); //Match background with time of day\r\n        if (hh > 12) { //Convert military time to 12-hour format\r\n            hh = hh - 12;\r\n            if (hh < 10) hh = \"0\" + hh; //If converted hours becomes a single digit, add leading zero\r\n            amPM = \"PM\";\r\n        } else if (hh === 12) amPM = \"PM\"; //Set noon to PM\r\n        else if (hh === 0) hh = 12; //Set midnight to 12 instead of 0\r\n\r\n        hours.innerText = hh;\r\n        minutes.innerText = mm;\r\n        seconds.innerText = ss;\r\n        meridiem.innerText = amPM;\r\n        document.querySelector('.date').innerText = date;\r\n    };\r\n    let timer;\r\n    const set = (timezone, sunset, sunrise) => {\r\n        update(timezone, sunset, sunrise); //Set initial time\r\n        clearInterval(timer); //Clear old timers when new cities are searched\r\n        timer = setInterval(update, 1000, timezone, sunset, sunrise); //Update time every second\r\n    };\r\n    const video = document.querySelector('video');\r\n    const changeBG = (src) => {\r\n        if (src !== video.getAttribute('src')) { //If current time of day is different from background\r\n            video.setAttribute('src', src); //Update background\r\n        }\r\n    };\r\n    const checkSun = (time, sunset, sunrise) => {\r\n        if (time > sunset + 120 || time < sunrise) { //If time is between 2 hours after sunset, and sunrise\r\n            changeBG('videos/garden-night.mp4'); //Use night background\r\n        } else if (time > sunset - 60) { //Else if time is greater than 1 hour before sunset\r\n            changeBG('videos/garden-evening.mp4'); //Use evening background\r\n        } else { //Else time must be between sunrise, & 1 hour before sunset\r\n            changeBG('videos/garden-day.mp4'); //Use day background\r\n        }\r\n    };\r\n\r\n    const findWeekday = (dateStr) => {\r\n        let date = new Date(dateStr); //Create Date object from YYYY-MM-DD string\r\n        return date.toUTCString().substring(0, 3); //Return the weekday abbreviation\r\n    };\r\n    return { convertToMinutes, set, findWeekday };\r\n})();\r\n\r\nconst city = (() => {\r\n    const form = document.querySelector('form');\r\n    const input = document.querySelector('input');\r\n    const location = document.querySelector('.location');\r\n    const search = document.querySelector('.search');\r\n    const listen = () => {\r\n        form.addEventListener('submit', (e) => { //When enter is pressed in input,\r\n            e.preventDefault(); //Don't refresh page\r\n            input.blur();\r\n            _api_js__WEBPACK_IMPORTED_MODULE_0__.geocode.find(input.value); //Find the city\r\n        });\r\n        input.addEventListener('mouseenter', () => { //When hovering over input\r\n            location.setAttribute('trigger', 'loop'); //Animate location icon\r\n        });\r\n        input.addEventListener('mouseleave', () => { //When not hovering over input\r\n            location.setAttribute('trigger', 'loop-on-hover'); //Only animate when hovering over icon\r\n        });\r\n        input.addEventListener('focusin', () => { //When input is active\r\n            search.classList.remove('hidden'); //Show search icon\r\n        });\r\n        input.addEventListener('focusout', (e) => { //When input is no longer active\r\n            search.classList.add('hidden'); //Hide search icon\r\n            setTimeout(() => { //Wait an extra tick to check which element removed the focus\r\n                if (document.activeElement.tagName === 'BUTTON') { //If search button was clicked\r\n                    _api_js__WEBPACK_IMPORTED_MODULE_0__.geocode.find(input.value); //Find the city\r\n                } else {\r\n                    _api_js__WEBPACK_IMPORTED_MODULE_0__.geocode.check(input.value); //Check if city was changed\r\n                }\r\n                search.classList.add('hidden'); //Hide search icon\r\n            }, 1);\r\n        });\r\n        location.addEventListener('click', () => { //When location icon is clicked\r\n            input.focus();\r\n            input.setSelectionRange(input.value.length, input.value.length); //Place cursor at the end\r\n        });\r\n    };\r\n    return { listen };\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;