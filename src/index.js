import './css/styles.css';
import { fetchCountries } from '../fetchCounties';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  onCountryCardTemplate,
  onCountryListTemplate,
} from './markupTemplateCountries';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// const refs {
//     inputSearch: document.querySelector('#search-box'),
//     countryList: document.querySelector('.country-list'),
//     countryInfo: document.querySelector('.country-info'),
// }

inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  event.preventDefault();
  let searchIn = inputSearch.value;
  if (searchIn.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchIn.trim())
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
      }
      if (countries.length > 1 && countries.length <= 10) {
        const markup = countries.map(country => onCountryListTemplate(country));
        countryList.innerHTML = markup.join('');
        countryInfo.innerHTML = '';
      }
      if (countries.length === 1) {
        const cardMarkup = countries.map(country =>
          onCountryCardTemplate(country)
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = cardMarkup.join('');
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return error;
    });
}
