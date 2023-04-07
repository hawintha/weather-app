import { moment } from './ui.js';
import { weather } from './api.js';
const weatherDisplays = (() => {
    const weatherIcons = ["icons/sunny.svg", "icons/partly-cloudy.svg", "icons/fog.svg", "icons/drizzle.svg", "icons/drizzle-freezing.svg", "icons/rain.svg", "icons/rain-freezing.svg", "icons/snow.svg", "icons/hail.svg", "icons/rain-showers.svg", "icons/snow-showers.svg", "icons/thunderstorms.svg", "icons/thunderstorms-hail.svg"];
    const weatherTypes = ["Clear Sky", "Partly Cloudy", "Fog", "Drizzle", "Freezing Drizzle", "Rain", "Freezing Rain", "Snow", "Hail", "Rain Showers", "Snow Showers", "Thunderstorms", "Thunderstorms & Hail"];

    const current = (code, current, apparent, windSpd, humidity, max, min) => {
        const parent = document.querySelector('.current-weather');
        parent.replaceChildren(); //Clear old forecast
        const conditions = document.createElement('div');
        conditions.classList.add("conditions");
        parent.appendChild(conditions);
        const icon = document.createElement('img');
        icon.src = weatherIcons[weather.interpretCode(code)]; //Set weather icon
        icon.alt = weatherTypes[weather.interpretCode(code)];
        conditions.appendChild(icon);
        const temp = document.createElement('span');
        temp.innerText = current;
        conditions.appendChild(temp);
        const degrees = document.createElement('div');
        degrees.classList.add("degrees");
        conditions.appendChild(degrees);
        const symbol = document.createElement('span');
        symbol.innerText = "°";
        degrees.appendChild(symbol);
        const fahrenheit = document.createElement('span');
        fahrenheit.innerText = "F";
        fahrenheit.classList.add("fahrenheit");
        degrees.appendChild(fahrenheit);
        const celsius = document.createElement('span');
        celsius.innerText = "C";
        celsius.classList.add("celsius", "faded");
        degrees.appendChild(celsius);
        const details = document.createElement('div');
        details.classList.add("details");
        parent.appendChild(details);
        const description = document.createElement('span');
        description.innerText = weatherTypes[weather.interpretCode(code)]; //Set weather description
        description.classList.add("description");
        details.appendChild(description);
        const highLow = document.createElement('span');
        highLow.innerText = `High: ${max}°/Low: ${min}°`;
        details.appendChild(highLow);
        const feelsLike = document.createElement('span');
        feelsLike.innerText = `Feels like: ${apparent}°`;
        details.appendChild(feelsLike);
        const wind = document.createElement('span');
        wind.innerText = `Wind: ${windSpd}mph`;
        details.appendChild(wind);
        const percentage = document.createElement('span');
        percentage.innerText = `Humidity: ${humidity}%`;
        details.appendChild(percentage);
        const updatedTime = document.createElement('span');
        updatedTime.innerText = `Updated: ${document.querySelector('.hours').innerText}:${document.querySelector('.minutes').innerText} ${document.querySelector('.meridiem').innerText}`;
        details.appendChild(updatedTime);
    };

    const daily = (code, date, high, low) => {
        const container = document.createElement('div');
        document.querySelector('.daily-weather').appendChild(container);
        const day = document.createElement('span');
        day.innerText = moment.findWeekday(date) + " " + Number(date.substring(8)); //Use first 3 letters of weekday & day number without leading zero
        container.appendChild(day);
        const icon = document.createElement('img');
        icon.src = weatherIcons[weather.interpretCode(code)]; //Set weather icon
        container.appendChild(icon);
        const temps = document.createElement('div');
        temps.classList.add('high-low');
        container.appendChild(temps);
        const highTemp = document.createElement('span');
        highTemp.classList.add('high');
        highTemp.innerText = Math.round(high) + "° / "; //Round temp to nearest whole number
        temps.appendChild(highTemp);
        const lowTemp = document.createElement('span');
        lowTemp.classList.add('low');
        lowTemp.innerText = Math.round(low) + "°";
        temps.appendChild(lowTemp);
    };
    return { current, daily };
})();

export { weatherDisplays };