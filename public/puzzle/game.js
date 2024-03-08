const actions = [
    { col:  1, row:  0 },
    { col:  0, row:  1 },
    { col: -1, row:  0 },
    { col:  0, row: -1 },
];

function generateState(rows, cols) {
    let newState = [];
    let value = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            newState.push({
                row: i,
                col: j,
                v: value,
            });
            value++;
        }
    }
    return newState;
}

function update(state, action) {
    let emptyCell = state.find(x => x.v == 0);
    let col = emptyCell.col - action.col;
    let row = emptyCell.row - action.row;

    let movedCell = state.find(x => x.row == row && x.col == col);
    
    if (movedCell) {
        emptyCell.v = movedCell.v;
        movedCell.v = 0;
    }
}

function shuffle(state) {
    let count = 100 * state.length;
    for (var i = 0; i < count; i++) {
        let action = actions[Math.floor(actions.length * Math.random())];
        update(state, action);
    }
}

function originalPosition(value) {
    let col = value % cols;
    let row = (value - col) / cols;
    return { row, col };
}
