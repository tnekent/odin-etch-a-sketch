const PXL_LINE_COUNT = 100;
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

function colorizePixel() {
    const pixelEl = this;
    pixelEl.style.backgroundColor = "yellow";
}