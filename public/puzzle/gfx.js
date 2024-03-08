let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

let gridSize;
let cellSize;
let offset;
let fontSize;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gridSize = Math.min(canvas.width/(cols+1), canvas.height/(rows+1));
    cellSize = gridSize - 2;
    offset = gridSize;
    fontSize = gridSize/2;
    
    ctx.font = `${fontSize}px sans serif`;
}

function calcColor(position) {
    let r = 100 + Math.round(100*position.row/(rows-1));
    let g = 100 + Math.round(100*position.col/(cols-1));
    let b = 255 - (r + g - 200);
    return `rgb(${r},${g},${b})`;
}

function draw(state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.forEach(cell => {
        if (cell.v) {
            let x = offset + cell.col * gridSize;
            let y = offset + cell.row * gridSize;
            ctx.fillStyle = calcColor(originalPosition(cell.v));
            ctx.fillRect(x - cellSize/2, y - cellSize/2, cellSize, cellSize);
        }
    });
    ctx.fillStyle = 'black';
    state.forEach(cell => {
        if (cell.v) {
            let x = offset + cell.col * gridSize;
            let y = offset + cell.row * gridSize;
            ctx.fillText(cell.v, x - fontSize/2, y + fontSize/2);
        }
    });
}
