import{
    setLocationObject
} from "./dataFunction.js";
import{
    addSpinner,displayError
} from "./domFunction.js";
import CurrentLocation from "./currentLocation.js";
const currentLoc = new CurrentLocation();

const initApp = ()=>{
    //add event listener
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click",getGeoWeather);
    //setup
    //load weather
}
document.addEventListener("DOMContentLoaded",initApp);

const getGeoWeather = (event) =>{
    if(event){
        if(event.type == "click"){
            const mapIcon = document.querySelector(".fa-map-marker-alt"); 
            addSpinner(mapIcon);
        }
    }
    if(!navigator.geolocation)return geoError();
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
const geoError = (errObj) =>{
    const errMsg = errObj?errObj.message:"Geo location not supported";
    displayError(errMsg, errMsg);
}
const geoSuccess = (position)=>{
    const myCoordObj = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
        name :`Lat:${position.coords.latitude} Log:${position.coords.longitude}`
    }
    //set obj location
    setLocationObject(currentLoc, myCoordObj);
    console.log(currentLoc);
}