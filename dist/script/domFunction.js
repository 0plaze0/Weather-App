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

const updateWeatherLocationHeader = (msg)=>{
    const h1 = document.getElementById("currentForecast_location");
    h1.textContent = msg;
}
export const updateScreenReaderConfirmation = (msg)=>{
    document.getElementById("confirmation").textContent = msg;
}