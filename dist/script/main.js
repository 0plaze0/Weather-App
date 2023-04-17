import {
  setLocationObject,
  getHomeLocation,
  getWeatherFromCoords,
  getCoordsFromApi,
  cleanText,
} from "./dataFunction.js";
import {
  setPlaceholderText,
  addSpinner,
  displayError,
  displayApiError,
  updateScreenReaderConfirmation,
} from "./domFunction.js";
import CurrentLocation from "./currentLocation.js";
const currentLoc = new CurrentLocation();

const initApp = () => {
  //add event listener
  const geoButton = document.getElementById("getLocation");
  geoButton.addEventListener("click", getGeoWeather);
  const homeButton = document.getElementById("Home");
  homeButton.addEventListener("click", loadWeather);
  const saveButton = document.getElementById("saveLocation");
  saveButton.addEventListener("click", saveLocation);
  const unitButton = document.getElementById("unit");
  unitButton.addEventListener("click", setUnitPref);
  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", refreshWeather);
  const locationEntry = document.getElementById("searchBar__Form");
  locationEntry.addEventListener("submit", submitNewLocation);
  //setup
  setPlaceholderText();
  //load weather
  loadWeather();
};
document.addEventListener("DOMContentLoaded", initApp);

const getGeoWeather = (event) => {
  if (event) {
    if (event.type == "click") {
      const mapIcon = document.querySelector(".fa-map-marker-alt");
      addSpinner(mapIcon);
    }
  }
  if (!navigator.geolocation) return geoError();
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
const geoError = (errObj) => {
  const errMsg = errObj ? errObj.message : "Geo location not supported";
  displayError(errMsg, errMsg);
};
const geoSuccess = (position) => {
  const myCoordObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    name: `Lat:${position.coords.latitude} Log:${position.coords.longitude}`,
  };
  //set obj location
  setLocationObject(currentLoc, myCoordObj);
  updateDataAndDisplay(currentLoc);
};
const loadWeather = (event) => {
  const savedLocation = getHomeLocation();
  if (!savedLocation && !event) return getGeoWeather();
  if (!savedLocation && event.type == "click") {
    displayError(
      "No Home location set",
      "Sorry, please set your home location"
    );
  } else if (savedLocation && !event) {
    displayHomeLocationWeather(savedLocation);
  } else {
    const HomeIcon = document.querySelector(".fa-home");
    addSpinner(HomeIcon);
    displayHomeLocationWeather(savedLocation);
  }
};
const displayHomeLocationWeather = (home) => {
  if (typeof home == "string") {
    const locationHome = JSON.parse(home);
    const coordObj = {
      lat: locationHome.lat,
      lon: locationHome.lon,
      name: locationHome.name,
      unit: locationHome.unit,
    };
    setLocationObject(currentLoc, coordObj);
    updateDataAndDisplay(currentLoc);
  }
};
const saveLocation = () => {
  if (currentLoc.getLat() && currentLoc.getLon()) {
    const saveIcon = document.querySelector(".fa-save");
    addSpinner(saveIcon);
  }
  const coordObj = {
    lat: currentLoc.getLat(),
    lon: currentLoc.getLon(),
    name: currentLoc.getName(),
    unit: currentLoc.getUnit(),
  };
  localStorage.setItem("defaultWeatherLocation", JSON.stringify(coordObj));
  updateScreenReaderConfirmation(
    `Saved ${currentLoc.getName} as Home Location`
  );
};
const setUnitPref = () => {
  const unitIcon = document.querySelector(".fa-chart-bar");
  addSpinner(unitIcon);
  currentLoc.toggleUnit();
  updateDataAndDisplay(currentLoc);
};
const refreshWeather = () => {
  const refreshIcon = document.querySelector(".fa-rotate");
  addSpinner(refreshIcon);
  updateDataAndDisplay(currentLoc);
};

const submitNewLocation = async (event) => {
  event.preventDefault(); /* prevents from refreshing the page */
  const text = document.getElementById("searchBar__text").value;
  const entryText = cleanText(text);
  if (!entryText.length) return;
  const searchIcon = document.querySelector(".fa-search");
  addSpinner(searchIcon);
  const coordData = await getCoordsFromApi(entryText, currentLoc.getUnit());
  if (coordData) {
    if (coordData.cod === 200) {
      const coordObj = {
        lat: coordData.coord.lat,
        lon: coordData.coord.lon,
        name: coordData.sys.country
          ? `${coordData.name},${coordData.sys.country}`
          : coordData.name,
      };
      setLocationObject(currentLoc, coordObj);
      updateDataAndDisplay(currentLoc);
    } else {
      displayApiError(coordData);
    }
  } else {
    displayError("connection Error", "connection Error");
  }
};
const updateDataAndDisplay = async (locationObj) => {
  //   const weatherJson = await getWeatherFromCoords(locationObj);
  //   console.log(weatherJson);
  // if(weatherJson) updateDataAndDisplay(weatherJson,locationObj);
};
