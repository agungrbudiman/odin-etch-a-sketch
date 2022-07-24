let gridSize = 16;
const gridContainer = document.querySelector("#grid-container");
const btnRGB = document.querySelector("#btn-rgb");
const btnSize = document.querySelector("#btn-size");
const btnClear = document.querySelector("#btn-clear");

function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 1; i <= gridSize*gridSize; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.style.backgroundColor = "white";
        gridItem.setAttribute("data-brightness","100");
        gridContainer.append(gridItem);
    }
}

function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function sketch(e) {
    if (e.target.className == 'grid-item') {
        if (btnRGB.classList.contains("active")) {
            const brightness = e.target.getAttribute("data-brightness");
            const bgColor = e.target.style.backgroundColor;
            if (bgColor == "white" || bgColor == "black") {
                e.target.style.backgroundColor = randomColor();
            }
            else if (brightness > 0){
                e.target.style.filter = `brightness(${brightness - 10}%)`;
                e.target.setAttribute("data-brightness", brightness - 10);
            }
        } else {
            e.target.style.backgroundColor = "black";
        }
    }
}

gridContainer.addEventListener('mousedown', (e) => {
    sketch(e);
    gridContainer.addEventListener('mouseover', sketch);
})

document.addEventListener('mouseup', () => {
    gridContainer.removeEventListener('mouseover', sketch);
})

btnSize.addEventListener('click', () => {
    const input = prompt("Enter grid size (max 100): ");
    if (parseInt(input) <= 100) {
        gridSize = parseInt(input);
        gridContainer.textContent = '';
        createGrid(gridSize);
    }
})

btnClear.addEventListener('click', () => {
   const gridItems = gridContainer.children;
   for (const gridItem of gridItems) {
       gridItem.style.backgroundColor = "white";
       gridItem.setAttribute("data-brightness", "100");
       gridItem.style.filter = '';
   }
})

btnRGB.addEventListener('click', () => {
    if (btnRGB.classList.contains("active")) {
        btnRGB.classList.remove("active")
    } else {
        btnRGB.classList.add("active");
    }
})

createGrid(gridSize);