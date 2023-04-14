export const setLocationObject = (locationObj, coordObj) => {
    const {lat, lon, name, unit} = coordObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if(unit){
        locationObj.setUnit(unit);
    }
}

export const getHomeLocation = ()=>{
    return localStorage.getItem("defaultWeatherLocation");
}