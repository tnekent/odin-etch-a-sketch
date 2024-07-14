function colorizePixel() {
    const pixelEl = this;
    pixelEl.style.backgroundColor = "yellow";
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
    const containerWidth = containerDiv.offsetWidth;

    const pxlWidth = containerWidth / PXL_LINE_COUNT;
    const pxlWidthPercent = pxlWidth / containerWidth * 100;

    for (let i = 0; i < TOTAL_PXL_COUNT; i++) {
        const pxlDiv = document.createElement("div");
        containerDiv.appendChild(pxlDiv);
        pxlDiv.style.flexBasis = pxlWidthPercent + "%";
        pxlDiv.classList.add("pixel");

        pxlDiv.addEventListener("mouseenter", colorizePixel)
    }
}

const setupCanvasButton = document.querySelector("#setup-canvas");
setupCanvasButton.addEventListener("click", setupCanvas);