import { geocode } from './api.js';

const moment = (() => {
    const convertToMinutes = (time) => {
        let splitTime = time.split(':');
        return Number(splitTime[0] * 60) + Number(splitTime[1]); //Convert military time to minutes
    };

    const video = document.querySelector('video');
    const changeBG = (src) => {
        if (src !== video.getAttribute('src')) { //If current time of day is different from background
            video.setAttribute('src', src); //Update background
        }
    };
    const checkSun = (time, sunset, sunrise) => {
        if (time > sunset + 120 || time < sunrise) { //If time is between 2 hours after sunset, and sunrise
            changeBG('videos/garden-night.mp4'); //Use night background
        } else if (time > sunset - 60) { //Else if time is greater than 1 hour before sunset
            changeBG('videos/garden-evening.mp4'); //Use evening background
        } else { //Else time must be between sunrise, & 1 hour before sunset
            changeBG('videos/garden-day.mp4'); //Use day background
        }
    };
    const update = (zone, sunset, sunrise) => {
        let present = new Date(); // Thu Apr 06 2023 15:29:04 GMT-0700 (Pacific Daylight Time)
        let date = present.toLocaleString('default', { timeZone: zone, weekday: 'long', month: 'long', day: 'numeric' }); // Timezone-specific Weekday, Month, Day
        let now = present.toLocaleString('default', { timeZone: zone, hour12: false }); // Timezone-specific MM/DD/YYYY, HH:MM:SS
        let hh = now.substring(now.length - 8, now.length - 6); //Get hours
        let mm = now.substring(now.length - 5, now.length - 3); //Get minutes
        let ss = now.substring(now.length - 2); //Get seconds
        let amPM = "AM"; //Get meridiem
        let militaryTime = now.substring(now.length - 8); // HH:MM:SS
        checkSun(convertToMinutes(militaryTime), sunset, sunrise); //Match background with time of day
        if (+hh > 12) { //PM to midnight
            hh = hh - 12; //Convert military time to 12-hour format
            if (+hh < 10) hh = "0" + hh; //If converted hours becomes a single digit, add leading zero
            if (+hh === 12) amPM = "AM"; //Set midnight to AM
            else amPM = "PM"; //Use PM
        }
        else if (+hh === 12) amPM = "PM"; //Set noon to PM
        else if (+hh === 0) hh = 12; //Set midnight to 12 instead of 0

        document.querySelector('.hours').innerText = hh;
        document.querySelector('.minutes').innerText = mm;
        document.querySelector('.seconds').innerText = ss;
        document.querySelector('.meridiem').innerText = amPM;
        document.querySelector('.date').innerText = date;
    };
    let timer;
    const set = (timezone, sunset, sunrise) => {
        update(timezone, sunset, sunrise); //Set initial time
        clearInterval(timer); //Clear old timers when new cities are searched
        timer = setInterval(update, 1000, timezone, sunset, sunrise); //Update time every second
    };

    const findWeekday = (dateStr) => {
        let date = new Date(dateStr); //Create Date object from YYYY-MM-DD string
        return date.toUTCString().substring(0, 3); //Return the weekday abbreviation
    };
    return { convertToMinutes, set, findWeekday };
})();

const cityInput = (() => {
    const form = document.querySelector('form');
    const input = document.querySelector('input');
    const location = document.querySelector('.location');
    const search = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');

    const validate = () => { //Don't allow >2 commas
        if (!input.value.split(', ')[2]) {
            geocode.find(input.value); //Find the city
        } else {
            message("Either use the \"City, Country\" format or select the correct city.");
            input.value = input.value.split(', ')[0]; //Remove everything after 1st comma
            geocode.suggest(input.value); //Display city suggestions
        }
    }
    const listen = () => {
        form.addEventListener('input', () => { //When input value changes,
            if (input.value !== '') geocode.suggest(input.value); //Display city suggestions
        });
        form.addEventListener('submit', (e) => { //When enter is pressed in input,
            e.preventDefault(); //Don't refresh page
            validate(); //If in correct format, find the city
        });
        suggestions.addEventListener('mousedown', (e) => { //When a suggested city is clicked
            geocode.find(null, e.target.getAttribute('data-id')); //Find city by ID
        })
        search.addEventListener('mousedown', (e) => {
            validate(); //If in correct format, find the city
        })
        input.addEventListener('mouseenter', () => { //When hovering over input
            location.setAttribute('trigger', 'loop'); //Animate location icon
        });
        input.addEventListener('mouseleave', () => { //When not hovering over input
            location.setAttribute('trigger', 'loop-on-hover'); //Only animate when hovering over icon
        });
        input.addEventListener('focusin', () => { //When input is active
            search.classList.remove('hidden'); //Show search icon
            geocode.suggest(input.value); //Display city suggestions
        });
        input.addEventListener('focusout', () => { //When input is no longer active
            search.classList.add('hidden'); //Hide search icon
            suggestions.replaceChildren(); //Close search suggestions
        });
        location.addEventListener('click', () => { //When location icon is clicked
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length); //Place cursor at the end
        });
    };
    const message = (text) => {
        const msg = document.querySelector("#errorMsg");
        msg.className = "show";
        msg.innerText = text;
        setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000); //Show error message for only 3 seconds
        input.select(); //Select all text to prepare edit
    }
    return { listen, message };
})();

const units = (() => {
    const listen = (btn) => {
        btn.addEventListener('click', () => {
            let cityID = document.querySelector('form input').getAttribute('data-id');
            btn.innerText === 'F' ? geocode.find(null, cityID, true) : geocode.find(null, cityID, false); //Switch between imperial & metric units for temperature & wind speed
        });
    };
    return { listen };
})();

export { moment, cityInput, units };