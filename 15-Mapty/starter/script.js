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

  _createDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._createDescription();
  }

  calcPace() {
    this.pace = (this.duration / this.distance).toFixed(1);
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._createDescription();
  }

  calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(1);
    return this.speed;
  }
}

class App {
  workouts = [];
  #map;
  #mapEvent;
  #mapZoom = 13;

  constructor() {
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField); // in _toggleElevationField we don't use the this keyword so no need for binding
    containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoom);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.workouts.forEach(work => this._renderWorkoutMarker(work));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    inputDistance.focus();
    form.classList.remove('hidden');
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // console.log(this); // without binding it would point to form HTML element - element to which addEventListener is attached to
    e.preventDefault(); // prevents reloading the page on submit

    const fields = [inputDistance, inputDuration];
    inputType.value === 'running'
      ? fields.push(inputCadence)
      : fields.push(inputElevation);

    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(+input.value) && +input.value > 0);

    if (!validInputs(...fields))
      return alert('Please fill all the inputs with positive numbers!');

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
    this._renderWorkoutInList(newWorkout);
    this._renderWorkoutMarker(newWorkout);
    this._hideForm();
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(workout.description, {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`,
      })
      .openPopup();
  }

  _renderWorkoutInList(workout) {
    const { id, type, description, distance, duration } = workout;
    const workoutElement = `
        <li class="workout workout--${type}" data-id="${id}">
        <h2 class="workout__title">${description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${duration}</span>
          <span class="workout__unit">min</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${
            type === 'running' ? workout.pace : workout.speed
          }</span>
          <span class="workout__unit">${
            type === 'running' ? 'min/km' : 'km/h'
          }</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${type === 'running' ? '🦶🏼' : '⛰'}</span>
          <span class="workout__value">${
            type === 'running' ? workout.cadence : workout.elevationGain
          }</span>
          <span class="workout__unit">${type === 'running' ? 'spm' : 'm'}</span>
        </div>
      </li>
  `;
    form.insertAdjacentHTML('afterend', workoutElement);
  }

  _moveToMarker(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workout = this.workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // as we restore it from local storage we loose the prototype chain - proto is now only Object
    // now we cannot use inherited methods

    if (!data) return;
    // this.workouts = data; - this will have lost prototype chain

    // we can fix this by creating objects again using classes
    this.workouts = data.map(work => {
      const { coords, distance, duration, cadence, elevationGain } = work;
      const workout =
        work.type === 'running'
          ? new Running(coords, distance, duration, cadence)
          : new Cycling(coords, distance, duration, elevationGain);
      return workout;
    });

    this.workouts.forEach(work => this._renderWorkoutInList(work));
    // this.workouts.forEach(work => this._renderWorkoutMarker(work)); cannot do that here as the map doesn't exist yet
  }

  clearLocalStorage() {
    localStorage.removeItem('workouts');
    location.reload(); // reload the page
  }
}

const app = new App();
