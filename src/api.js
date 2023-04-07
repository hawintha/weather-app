import { moment } from './ui.js';
import { weatherDisplays } from './render.js';

const geocode = (() => {
    let current = "Seattle";
    let latitude;
    let longitude;
    let timezone;
    let country;
    const input = document.querySelector('input');
    const check = (newCity) => {
        if (newCity !== current) find(newCity); //If city changed, find the new city's location
    };
    const find = async (city) => {
        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
            const data = await response.json(); //Convert data to JSON
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
            timezone = data.results[0].timezone;
            country = data.results[0].country;
            current = data.results[0].name;
            input.value = `${current}, ${country}`; //Add country to input value
            weather.find(latitude, longitude, timezone); //Find weather data
        } catch { //If city could not be found
            const msg = document.querySelector("#errorMsg");
            msg.className = "show";
            setTimeout(function () { msg.className = msg.className.replace("show", ""); }, 3000); //Show error message for 3 seconds
            input.select(); //Select all text to prepare edit
        }
    };
    return { check, find };
})();

const weather = (() => {
    const find = async (latitude, longitude, timezone) => {
        try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=${timezone}`);
            const data = await response.json(); //Convert data to JSON

            let hour = data.current_weather.time.substring(11, 13).replace(/^0+(\d)/, '$1'); //Get current hour & remove leading zero except for one ie.) midnight 00 becomes 0
            let currentTemp = Math.round(data.current_weather.temperature); //Get current temp & round to the nearest whole number
            let currentCode = data.current_weather.weathercode; //Get current weather code
            let apparent = Math.round(data.hourly.apparent_temperature[hour]); //Get current apparent temp & round to the nearest whole number
            let wind = data.hourly.windspeed_10m[hour]; //Get current wind speed
            let humidity = data.hourly.relativehumidity_2m[hour]; //Get current humidity
            let codes = data.daily.weathercode; //Get daily weather codes
            let dates = data.daily.time; //Get dates for the week
            let highs = data.daily.temperature_2m_max; //Get daily max temps
            let lows = data.daily.temperature_2m_min; //Get daily min temps
            let sunrise = moment.convertToMinutes(data.daily.sunrise[0].substring(11)); //Set current day's sunrise time in minutes
            let sunset = moment.convertToMinutes(data.daily.sunset[0].substring(11)); //Set current day's sunset time in minutes
            
            moment.set(timezone, sunset, sunrise); //Set time
            weatherDisplays.current(currentCode, currentTemp, apparent, wind, humidity, highs[0], lows[0]); //Display current weather data
            document.querySelector('.daily-weather').replaceChildren(); //Remove old forecasts
            for (let i = 0; i < 7; i++) { //For each weekday's forecast,
                weatherDisplays.daily(codes[i], dates[i], highs[i], lows[i]); //Show the data
            }
        } catch (error) {
            console.log(error);
        }
    };
    const interpretCode = (code) => { //Use weather code to find index of weather icon & description
        if (code < 1) {
            return 0;
        } else if (code < 4) {
            return 1;
        } else if (code < 49) {
            return 2;
        } else if (code < 56) {
            return 3;
        } else if (code < 58) {
            return 4;
        } else if (code < 66) {
            return 5;
        } else if (code < 68) {
            return 6;
        } else if (code < 76) {
            return 7;
        } else if (code < 78) {
            return 8;
        } else if (code < 83) {
            return 9;
        } else if (code < 87) {
            return 10;
        } else if (code < 96) {
            return 11;
        } else if (code < 100) {
            return 12;
        }
    };
    return { find, interpretCode };
})();

export { geocode, weather };