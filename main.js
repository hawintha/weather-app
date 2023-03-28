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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ \"./src/ui.js\");\n\r\n\r\n_ui_js__WEBPACK_IMPORTED_MODULE_0__.moment.set();\r\n_ui_js__WEBPACK_IMPORTED_MODULE_0__.city.listen();\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"city\": () => (/* binding */ city),\n/* harmony export */   \"moment\": () => (/* binding */ moment)\n/* harmony export */ });\nconst moment = (() => {\r\n    let hours = document.querySelector('.hours');\r\n    let minutes = document.querySelector('.minutes');\r\n    let seconds = document.querySelector('.seconds');\r\n    let meridiem = document.querySelector('.meridiem');\r\n\r\n    const update = () => {\r\n        let today = new Date();\r\n        let month = today.toLocaleString('default', { month: 'long' });\r\n        let weekday = today.toLocaleString('default', { weekday: 'long' });\r\n        let day = today.getDate();\r\n        let time = {\r\n            hours: today.getHours(),\r\n            minutes: today.getMinutes(),\r\n            seconds: today.getSeconds(),\r\n            meridiem: \"AM\"\r\n        };\r\n\r\n        if (time.hours > 12) { //Convert military time to 12-hour format\r\n            time.hours = time.hours - 12;\r\n            time.meridiem = \"PM\"\r\n        } else if (time.hours === 0) { //Set midnight to 12 instead of 0\r\n            time.hours = 12;\r\n        }\r\n        for (const unit in time) { //Add leading zero for single digits\r\n            if (time[unit] < 10) {\r\n                time[unit] = \"0\" + time[unit];\r\n            }\r\n        };\r\n\r\n        hours.innerText = time.hours\r\n        minutes.innerText = time.minutes;\r\n        seconds.innerText = time.seconds;\r\n        meridiem.innerText = time.meridiem;\r\n        document.querySelector('.weekday').innerText = weekday;\r\n        document.querySelector('.month').innerText = month;\r\n        document.querySelector('.day').innerText = day;\r\n\r\n        checkTime(); //Check current time of day (night/evening/daytime)\r\n    }\r\n\r\n    const set = () => {\r\n        update(); //Set initial time\r\n        setInterval(update, 1000); //Update time every second\r\n    }\r\n\r\n    let video = document.querySelector('video');\r\n    const changeBG = (src) => {\r\n        if (src !== video.getAttribute('src')) { //If current time of day is different from background\r\n            video.setAttribute('src', src) //Update background\r\n        }\r\n    }\r\n    const checkTime = () => {\r\n        if ((meridiem.innerText === \"AM\" && (hours.innerText < 7 || hours.innerText === '12')) || (meridiem.innerText === \"PM\" && hours.innerText > 9)) { //If time is between 10PM - 7AM\r\n            changeBG('videos/garden-night.mp4'); //Use night background\r\n        } else if (meridiem.innerText === \"PM\" && (hours.innerText < 10 || hours.innerText > 4)) { //If time is between 5PM - 10PM\r\n            changeBG('videos/garden-evening.mp4'); //Use evening background\r\n        } else { //7AM - 5PM\r\n            changeBG('videos/garden-day.mp4'); //Use day background\r\n        }\r\n    }\r\n    return { set }\r\n})();\r\n\r\nconst city = (() => {\r\n    const input = document.querySelector('input');\r\n    const location = document.querySelector('.location');\r\n    const search = document.querySelector('.search');\r\n    const listen = () => {\r\n        input.addEventListener('mouseenter', () => { //When hovering over input\r\n            location.setAttribute('trigger', 'loop'); //Animate location icon\r\n        })\r\n        input.addEventListener('mouseleave', () => { //When not hovering over input\r\n            location.setAttribute('trigger', 'loop-on-hover'); //Only animate when hovering over icon\r\n        })\r\n        input.addEventListener('focusin', () => { //When input is active\r\n            search.classList.remove('hidden'); //Show search icon\r\n        })\r\n        input.addEventListener('focusout', () => { //When input is not active\r\n            search.classList.add('hidden'); //Hide search icon\r\n        })\r\n        location.addEventListener('click', () => { //When location icon is clicked\r\n            input.focus();\r\n            input.setSelectionRange(input.value.length, input.value.length); //Place cursor at the end\r\n        })\r\n    }\r\n    return { listen }\r\n})();\r\n\r\n\n\n//# sourceURL=webpack://weather-app/./src/ui.js?");

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