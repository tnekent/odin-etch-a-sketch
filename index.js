const BORDER_SIZE = "1px";

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

function getBorderSidesByIndex(pixelEl, i, pixelLineCount) {
    // All pixels will have the bottom, and right borders set
    // and we need to only check the first row to set top
    // borders and the first column to set the left borders
    let topWidth = "0";
    let leftWidth = "0";
    const rightWidth = BORDER_SIZE;
    const bottomWidth = BORDER_SIZE;

    if (i < pixelLineCount) {
        topWidth = BORDER_SIZE;
    }
    
    if (i % pixelLineCount === 0) {
        leftWidth = BORDER_SIZE;
    }

    return `${topWidth} ${rightWidth} ${bottomWidth} ${leftWidth}`
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
        pxlDiv.style.borderWidth = getBorderSidesByIndex(pxlDiv, i, PXL_LINE_COUNT);
        pxlDiv.classList.add("pixel");

        pxlDiv.addEventListener("mouseenter", transformPixel);
    }
}

const setupCanvasButton = document.querySelector("#setup-canvas");
setupCanvasButton.addEventListener("click", setupCanvas);