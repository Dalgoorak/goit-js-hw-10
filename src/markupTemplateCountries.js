export function onCountryCardTemplate({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `
<div>
  <div class = country__container>
   <img src="${flags.svg}" alt="${name.official}" width=100>
   <h2 class = country__name>Country: ${name.official}</h2>
  </div>
  <p class = country__text>Capital: ${capital}</p>
  <p class = country__text>Population: ${population}</p>
  <p class = country__text>Languages: ${Object.values(languages)}</p>
</div>`;
}

export function onCountryListTemplate({ flags, name }) {
  return `
<li class = country__list>
  <img src="${flags.svg}" alt="${name.official}" width=50>
  <h2>${name.official}</h2>
</li>`;
}
