const gridSize = 40;
const cellSize = gridSize - 2;
const offset = gridSize;

let canvas = document.createElement('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
document.body.appendChild(canvas);

let ctx = canvas.getContext('2d');
ctx.font = '20px sans serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

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
            ctx.fillStyle = 'black';
            ctx.fillText(cell.v, x, y);
        }
    });
}
