'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderMsg = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

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
  // countriesContainer.style.opacity = 1;
};

const getAndRenderCountryByName = name => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
  request.send();

  request.addEventListener('load', function () {
    const [country] = JSON.parse(this.responseText);
    renderCountry(country);

    const neighbors = country.borders;
    if (!neighbors.length) return; // exist if country has no neighbors
    const req = new XMLHttpRequest();
    req.open('GET', `https://restcountries.com/v3.1/alpha/${neighbors[0]}`);
    req.send();

    // this creates a callback loop - one callback nested into another one
    req.addEventListener('load', function () {
      const [country] = JSON.parse(this.responseText);
      renderCountry(country, 'neighbour');
    });
  });
};

// getAndRenderCountryByName('portugal');

const getJSON = (url, errorMsg = 'Something went wrong') => {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getAndRenderCountryByName2 = name => {
  getJSON(`https://restcountries.com/v3.1/name/${name}`, 'Country not found!')
    // .then(response => response.json(), (err) => console.error(err)) - instead of catch we can also put error handling callback as second arg
    .then(data => {
      renderCountry(data[0]);
      const neighbors = data[0]?.borders;
      if (!neighbors?.length) throw new Error('No neighbor found!'); // when I explicity throw new Error in then block - the promise will get rejected and enter catch block
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbors[0]}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      // catch only enters when there is no internet connection - other error codes (500, 404) we need to handle differently in then block
      console.error(err);
      renderMsg(`Something went wrong - ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1; // in finally we will enter no matter of the promise result success or error
      // good real use case for hiding the loading spinner
    });
};

btn.addEventListener('click', () => {
  getAndRenderCountryByName2('portugal');
});
