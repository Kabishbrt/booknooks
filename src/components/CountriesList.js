// countriesList.js
import { countries } from 'countries-list';

// Get an array of all country names
const CountriesList = Object.values(countries).map(country => country.name);

export default CountriesList;
