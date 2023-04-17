const WEATHER_API_KEY = "8727119bfcded5c210649afc2fcde4f3";

export const setLocationObject = (locationObj, coordObj) => {
  const { lat, lon, name, unit } = coordObj;
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};

export const getHomeLocation = () => {
  return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
  const lat = locationObj.getLat();
  const lon = locationObj.getLon();
  const units = locationObj.getUnit();
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  try {
    const weatherStream = fetch(url);
    const weatherStreamJson = (await weatherStream).json();
    return weatherStreamJson;
  } catch (err) {
    console.error(err);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  const regex = /^\d+$/g;
  const flag = regex.test(entryText) ? "zip" : "q";
  const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&APPID=${WEATHER_API_KEY}`;
  const encodedUrl = encodeURI(url);
  try {
    const dataStream = await fetch(encodedUrl);
    const jsonData = await dataStream.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.error(err.stack);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  const entryText = text.replaceAll(regex, " ").trim();
  return entryText;
};
