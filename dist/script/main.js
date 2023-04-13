import{
    addSpinner
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
    // if(!navigator.geolocation) geoError();
    // navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}