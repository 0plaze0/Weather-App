export const setPlaceholderText = ()=>{
    const input = document.getElementById("searchBar__text");
    window.innerWidth < 400 ?
    (input.placeholder = "City, State, Country"):
    (input.placeholder = "City, State, Country or Zip");
}
export const addSpinner = (element) =>{
    animateButton(element);
    setTimeout(animateButton,1000,element);
}

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
}
//display

export const displayError = (headerMsg, srMsg)=>{
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(srMsg);
}

export const displayApiError = (text) =>{
    const properText = toProperText(text);
    updateWeatherLocationHeader(properText);
    updateScreenReaderConfirmation(properText);
}
const toProperText = (text)=>{
    const words = text.split(" ");
    const properText = words.map(words => {
        return words.charAt(0).toUpperCase() + words.slice(1);
    })
    return properText.join(" ");
}

const updateWeatherLocationHeader = (msg)=>{
    const h1 = document.getElementById("currentForecast_location");
    h1.textContent = msg;
}
export const updateScreenReaderConfirmation = (msg)=>{
    document.getElementById("confirmation").textContent = msg;
}