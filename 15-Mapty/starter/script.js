'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = Date.now().toString().slice(-10); // should be some external library unique id
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance;
    this.duration = duration;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = (this.duration / this.distance).toFixed(2);
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(2);
    return this.speed;
  }
}

// const run = new Running([39, -12], 5.2, 34, 178);
// const cycling = new Cycling([39, -12], 5.2, 95, 523);
// console.log(run, cycling);

class App {
  workouts = [];
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField); // in _toggleElevationField we don't use the this keyword so no need for binding
  }

  // protected method - just a convention - now we have real private class methods using #
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this), // if we just pass this._loadMap - this (class obj) won't be passed down - so in loadMap this would be undefined
      // this._loadMap - would just call it like a regular function - in regular functions this is undefined!
      function () {
        alert('Could not get your position!');
        ``;
      }
    );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(`https://www.google.pl/maps/@${latitude},${longitude}`);
    // I can use L directly because it is a global variable in the script loaded BEFORE this one
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    inputDistance.focus();
    form.classList.remove('hidden');
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    console.log(this); // without binding it would point to form HTML element - element to which addEventListener is attached to
    e.preventDefault(); // prevents reloading the page on submit

    const fields = [inputDistance, inputDuration];
    inputType.value === 'running'
      ? fields.push(inputCadence)
      : fields.push(inputElevation);

    if (fields.some(field => Number(field.value) <= 0)) {
      alert('Please fill all the inputs with positive numbers!');
      return;
    }

    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];

    const newWorkout =
      inputType.value === 'running'
        ? new Running(
            coords,
            inputDistance.value,
            inputDuration.value,
            inputCadence.value
          )
        : new Cycling(
            coords,
            inputDistance.value,
            inputDuration.value,
            inputElevation.value
          );

    this.workouts.push(newWorkout);
    const sidebar = document.querySelector('.workouts');

    const newLiElement = `
    <li class="workout workout--${inputType.value}" data-id="${newWorkout.id}">
    <h2 class="workout__title">${
      inputType.value[0].toUpperCase() + inputType.value.slice(1)
    } on ${months[newWorkout.date.getMonth()]} ${newWorkout.date.getDate()}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        inputType.value === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${inputDistance.value}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${inputDuration.value}</span>
      <span class="workout__unit">min</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${
        inputType.value === 'running' ? newWorkout.pace : newWorkout.speed
      }</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">${
        inputType.value === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        inputType.value === 'running'
          ? newWorkout.cadence
          : newWorkout.elevationGain
      }</span>
      <span class="workout__unit">${
        inputType.value === 'running' ? 'spm' : 'm'
      }</span>
    </div>
  </li>
    `;

    sidebar.insertAdjacentHTML('afterbegin', newLiElement);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('Workout', {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${inputType.value}-popup`,
      })
      .openPopup();

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.classList.add('hidden');
  }
}

const app = new App();
