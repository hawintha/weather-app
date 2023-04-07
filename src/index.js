import { city } from './ui.js';
import { geocode } from './api.js';

geocode.find(document.querySelector('input').value); //Find default city weather
city.listen(); //Add event listeners to city input