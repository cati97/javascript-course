'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = (country, className) => {
  const countryEl = `
    <article class="country ${className}">
        <img class="country__img" alt="${country.flags.alt}" src="${
    country.flags.png
  }" />
        <div class="country__data">
            <h3 class="country__name">${country.name.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
              navigator.language
            ).format(country.population)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(country.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.keys(country.currencies)[0]
            }</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', countryEl);
  countriesContainer.style.opacity = 1;
};

const getAndRenderCountryByName = name => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
  request.send();

  request.addEventListener('load', function () {
    const [country] = JSON.parse(this.responseText);
    renderCountry(country);

    const neighbors = country.borders;
    const req = new XMLHttpRequest();
    req.open('GET', `https://restcountries.com/v3.1/alpha/${neighbors[0]}`);
    req.send();

    req.addEventListener('load', function () {
      const [country] = JSON.parse(this.responseText);
      if (!country) return;
      renderCountry(country, 'neighbour');
    });
  });
};

getAndRenderCountryByName('portugal');
