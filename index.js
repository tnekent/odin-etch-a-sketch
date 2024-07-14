function getRandomCSSColor() {
    const redValue = parseInt(Math.random() * 255);
    const greenValue = parseInt(Math.random() * 255);
    const blueValue = parseInt(Math.random() * 255);

    return `${redValue},${greenValue},${blueValue}`;
}

function getOpacityValue(rgbString) {
    if (rgbString[3] !== "a")
        return 1;

    const splitStr = rgbString.split(",");
    const opacityValue = splitStr[3].slice(0, -1);
    return parseFloat(opacityValue);
}

function increasePixelOpacity(pixelEl) {
    const pixelBgColor = pixelEl.style.backgroundColor;
    const currentOpacity = getOpacityValue(pixelBgColor);
    if (currentOpacity !== 1) {
        const newOpacity = currentOpacity + .1;
        return newOpacity; 
    }
}

function transformPixel() {
    const pixelEl = this;
    const randomRGB = getRandomCSSColor();
    const nextOpacity = increasePixelOpacity(pixelEl);
    pixelEl.style.backgroundColor = `rgba(${randomRGB},${nextOpacity})`;
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
        pxlDiv.style.backgroundColor = "rgba(0,0,0,0)"
        pxlDiv.classList.add("pixel");

        pxlDiv.addEventListener("mouseenter", transformPixel);
    }
}

const setupCanvasButton = document.querySelector("#setup-canvas");
setupCanvasButton.addEventListener("click", setupCanvas);