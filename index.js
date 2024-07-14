function colorizePixel() {
    const pixelEl = this;
    pixelEl.style.backgroundColor = getRandomCSSColor();
}

function darkenPixel() {
    const pixelEl = this;
    let currentOpacity = pixelEl.style.opacity;
    currentOpacity = parseFloat(currentOpacity) * 100;
    if (currentOpacity !== 100) {
        const newOpacity = currentOpacity + 10;
        pixelEl.style.opacity = newOpacity + "%"; 
    }
}

function getRandomCSSColor() {
    const redValue = parseInt(Math.random() * 255);
    const greenValue = parseInt(Math.random() * 255);
    const blueValue = parseInt(Math.random() * 255);

    return `rgb(${redValue},${greenValue},${blueValue})`;
}

function getUserPixelLineCountPref() {
    let userPixelLineInput = parseInt(prompt(
        "Specify a number from 1-100 that a row and column will both have:"
    ))
    

    if (isNaN(userPixelLineInput) ||
        userPixelLineInput < 1 ||
        userPixelLineInput > 100) {
        alert("Please input a number between 1-100.");
        return getUserPixelLineCountPref();
    }

    return userPixelLineInput;
}

function setupCanvas() {
    const PXL_LINE_COUNT = getUserPixelLineCountPref();
    const TOTAL_PXL_COUNT = PXL_LINE_COUNT ** 2;

    const containerDiv = document.querySelector(".container");
    containerDiv.innerHTML = "";
    const containerWidth = containerDiv.offsetWidth;

    const pxlWidth = containerWidth / PXL_LINE_COUNT;
    const pxlWidthPercent = pxlWidth / containerWidth * 100;

    for (let i = 0; i < TOTAL_PXL_COUNT; i++) {
        const pxlDiv = document.createElement("div");
        containerDiv.appendChild(pxlDiv);
        pxlDiv.style.flexBasis = pxlWidthPercent + "%";
        pxlDiv.style.opacity = "0";
        pxlDiv.classList.add("pixel");

        pxlDiv.addEventListener("mouseenter", colorizePixel)
        pxlDiv.addEventListener("mouseenter", darkenPixel)
    }
}

const setupCanvasButton = document.querySelector("#setup-canvas");
setupCanvasButton.addEventListener("click", setupCanvas);