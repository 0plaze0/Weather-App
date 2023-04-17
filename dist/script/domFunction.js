export const setPlaceholderText = () => {
  const input = document.getElementById("searchBar__text");
  window.innerWidth < 400
    ? (input.placeholder = "City, State, Country")
    : (input.placeholder = "City, State, Country or Zip");
};
export const addSpinner = (element) => {
  animateButton(element);
  setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
  element.classList.toggle("none");
  element.nextElementSibling.classList.toggle("block");
  element.nextElementSibling.classList.toggle("none");
};
//display

export const displayError = (headerMsg, srMsg) => {
  updateWeatherLocationHeader(headerMsg);
  updateScreenReaderConfirmation(srMsg);
};

export const displayApiError = (text) => {
  const properText = toProperText(text);
  updateWeatherLocationHeader(properText);
  updateScreenReaderConfirmation(properText);
};
const toProperText = (text) => {
  const words = text.split(" ");
  const properText = words.map((words) => {
    return words.charAt(0).toUpperCase() + words.slice(1);
  });
  return properText.join(" ");
};

const updateWeatherLocationHeader = (msg) => {
  const h1 = document.getElementById("currentForecast_location");
  h1.textContent = msg;
};
export const updateScreenReaderConfirmation = (msg) => {
  document.getElementById("confirmation").textContent = msg;
};

export const updateDisplay = (weatherJson, locationObj) => {
  fadeDisplay();
  clearDisplay();
  const weatherClass = getWeatherClass(weatherJson.current.weather[0].icon);
  setBGImage(weatherClass);
  const screenReaderWeather = buildScreenReaderWeather(
    weatherJson,
    locationObj
  );
  //current condition div
  const ccArray = createCurrentConditonsDivs(
    weatherJson,
    locationObj.getUnit()
  );

  setFocusOnScreen();
  fadeDisplay();
};
const fadeDisplay = () => {
  const cc = document.getElementById("currentForecast__conditions");
  cc.classList.toggle("zero-vis");
  cc.classList.toggle("fade-in");
  const sixDay = document.getElementById("dailyForecast__content");
  sixDay.toggle("zero-vis");
  sixDay.toggle("fade-in");
};

const clearDisplay = () => {
  const currentConditions = document.getElementById(
    "currentForcast__conditions"
  );
  deleteContents(currentConditions);
  const dailyForecast = document.getElementById("dailyForecast__content");
  deleteContents(dailyForecast);
};

const deleteContents = (parentElement) => {
  const child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const getWeatherClass = (icon) => {
  const firstTwoChars = icon.slice(0, 2);
  const lastTwoChars = icon.slice(2);
  const weatherLookup = {
    "09": "snow",
    10: "rain",
    11: "rain",
    13: "snow",
    50: "fog",
  };
  let weatherClass;
  if (weatherLookup[firstTwoChars]) {
    weatherClass = weatherLookup[firstTwoChars];
  } else if (lastTwoChars == "d") {
    weatherClass = "clouds";
  } else {
    weatherClass = "night";
  }
  return weatherClass;
};

const setBGImage = (weatherClass) => {
  document.documentElement.classList.add(weatherClass);
  document.documentElement.classList.forEach((img) => {
    if (img !== weatherClass) document.documentElement.classList.remove(img);
  });
};

const buildScreenReaderWeather = (weatherJson, locationObj) => {
  const location = locationObj.getName();
  const unit = locationObj.getUnit();
  const tempUnit = unit === "imperial" ? "Fahrenheit" : "Celsius";
  return `${weatherJson.current.weather[0].description} and ${Math.roundNumber(
    weatherJson.current.temp
  )}°${tempUnit} in ${location}`;
};

const setFocusOnScreen = () => {
  document.getElementById("searchBar__text").focus();
};

const createCurrentConditonsDivs = (weatherObj, unit) => {
  const tempUnit = unit === "imperial" ? "F" : "C";
  const WindUnit = unit === "imperial" ? "mph" : "m/s";

  const icon = createMainImgDiv(
    weatherObj.current.weather[0].icon,
    weatherObj.current.weather[0].description
  );
  const temp = createElem(
    "div",
    "temp",
    `${Math.round(Number(weatherObj.current.temp))}°`,
    tempUnit
  );
  const properDesc = toProperText(weatherObj.current.weather[0].description);
  const desc = createElem("div", "desc", properDesc);
  const feels = createElem(
    "div",
    "feels",
    `Feels Like ${Math.round(Number(weatherObj.current.feels_like))}°`
  );
  const maxTemp = createElem(
    "div",
    "maxtemp",
    `High ${Math.round(Number(weatherObj.daily[0].temp.max))}°`
  );
  const minTemp = createElem(
    "div",
    "mintemp",
    `Low ${Math.round(Number(weatherObj.daily[0].temp.min))}°`
  );
  const humidity = createElem(
    "div",
    "humidity",
    `Humidity ${weatherObj.current.humidity}%`
  );

  const wind = createElem(
    "div",
    "wind",
    `Wind ${Math.round(Number(weatherObj.current.wind_speed))} ${windUnit}`
  );

  return [icon, temp, desc, feels, maxTemp, minTemp, humidity, wind];
};

const createMainImgDiv = (icon, altText) => {
  const iconDiv = createElem("div", "icon");
  iconDiv.id = "icon";
  const faIcon = translateIconToFontAwesome(icon);
  faIcon.ariaHidden = true;
  faIcon.title = altText;
  iconDiv.appendChild(faIcon);
  return iconDiv;
};

const createElem = (elemType, divClassName, divText, unit) => {
  const div = document.createElement(elemType);
  div.className = divClassName;
  if (divText) {
    div.textContent = divText;
  }
  if (divClassName === "temp") {
    const unitDiv = document.createElement("div");
    unitDiv.className = "unit";
    unitDiv.textContent = unit;
    div.appendChild(unitDiv);
  }
  return div;
};
