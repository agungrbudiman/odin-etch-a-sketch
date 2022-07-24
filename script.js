let gridSize = 16;
const gridContainer = document.querySelector("#grid-container");

function createGrid(gridSize) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 1; i <= gridSize*gridSize; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridContainer.append(gridItem);
    }
}

function sketch(e) {
    if (e.target.className == 'grid-item') {
        e.target.classList.add("hover");
    }
}

gridContainer.addEventListener('mousedown', (e) => {
    gridContainer.addEventListener('mouseover', sketch);
})
gridContainer.addEventListener('mouseup', (e) => {
    gridContainer.removeEventListener('mouseover', sketch);
})

const btnSize = document.querySelector("#btn-size");
btnSize.addEventListener('click', (e) => {
    const input = prompt("Enter grid size (max 100): ");
    if (parseInt(input) <= 100) {
        console.log('ok');
        gridSize = parseInt(input);
        gridContainer.textContent = '';
        createGrid(gridSize);
    }
})

const btnClear = document.querySelector("#btn-clear");
btnClear.addEventListener('click', (e) => {
   const gridItems = gridContainer.children;
   for (const gridItem of gridItems) {
       gridItem.classList.remove("hover");
   }
})

createGrid(gridSize);