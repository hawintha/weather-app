import { cityInput } from './ui.js';
import { geocode } from './api.js';

geocode.find(document.querySelector('input').value); //Find default city weather
cityInput.listen(); //Add event listeners to city input