let gridSize = 16;
const gridContainer = document.querySelector("#grid-container");
const btnRGB = document.querySelector("#btn-rgb");
const btnSize = document.querySelector("#btn-size");
const btnClear = document.querySelector("#btn-clear");
const btnEraser = document.querySelector("#btn-eraser");

function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 1; i <= gridSize*gridSize; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.style.backgroundColor = "transparent";
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
            if (brightness == null) {
                e.target.style.backgroundColor = randomColor();
                e.target.setAttribute("data-brightness","100");
            }
            else if (brightness > 0){
                e.target.style.filter = `brightness(${brightness - 10}%)`;
                e.target.setAttribute("data-brightness", brightness - 10);
            }
        } else {
            e.target.style.backgroundColor = "black";
            e.target.removeAttribute("data-brightness");
        }
    }
}

function clearGrid() {
    const gridItems = gridContainer.children;
    for (const gridItem of gridItems) {
        gridItem.style.backgroundColor = "transparent";
        gridItem.removeAttribute("data-brightness");
        gridItem.style.filter = '';
    }
}

function toggleButton(e) {
    if (e.target.classList.contains("active")) {
        e.target.classList.remove("active")
    } else {
        e.target.classList.add("active");
    }
}

function changeGrid() {
    const input = prompt("Enter grid size (max 100): ");
    if (parseInt(input) <= 100) {
        gridSize = parseInt(input);
        gridContainer.textContent = '';
        createGrid(gridSize);
    }
}

function erase(e) {
    e.target.style.backgroundColor = "transparent";
    e.target.removeAttribute("data-brightness");
    e.target.style.filter = '';
}

gridContainer.addEventListener('mousedown', (e) => {
    if (btnEraser.classList.contains("active")) {
        erase(e);
        gridContainer.addEventListener('mouseover', erase);
    } else {
        sketch(e);
        gridContainer.addEventListener('mouseover', sketch);
    }
})

document.addEventListener('mouseup', () => {
    gridContainer.removeEventListener('mouseover', sketch);
    gridContainer.removeEventListener('mouseover', erase);
})

btnSize.addEventListener('click', changeGrid);
btnClear.addEventListener('click', clearGrid);
btnRGB.addEventListener('click', toggleButton);
btnEraser.addEventListener('click', toggleButton);
createGrid(gridSize);