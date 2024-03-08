let initialPosition = null;
let moveDist = 100;

function checkMove(currentPosition) {
    if (initialPosition == null) return;

    let action = null;
    if (currentPosition.x > initialPosition.x + moveDist) action = actions[0];
    if (currentPosition.y > initialPosition.y + moveDist) action = actions[1];
    if (currentPosition.x < initialPosition.x - moveDist) action = actions[2];
    if (currentPosition.y < initialPosition.y - moveDist) action = actions[3];

    if (action) {
        initialPosition = null;
        update(currentState, action);
        draw(currentState);
    }
}

function handleTouch(e) {
    e.preventDefault();
    let touch = e.changedTouches[0];
    return {
        x: touch.pageX,
        y: touch.pageY,
    }
}

function handleMouse(e) {
    e.preventDefault();
    return {
        x: e.offsetX,
        y: e.offsetY,
    }
}

document.addEventListener("DOMContentLoaded", () => {
    canvas.addEventListener("touchstart", e => {
        initialPosition = handleTouch(e);
    });
    canvas.addEventListener("touchmove", e => {
        checkMove(handleTouch(e));
    });
    canvas.addEventListener("touchend", () => initialPosition = null);
    canvas.addEventListener("touchcancel", () => initialPosition = null);
    canvas.addEventListener("mousedown", e => {
        initialPosition = handleMouse(e);
    });
    canvas.addEventListener("mousemove", e => {
        checkMove(handleMouse(e));
    });
    canvas.addEventListener("mouseup", () => initialPosition = null);
});

let keyMapping = {
    "ArrowRight": actions[0],
    "ArrowDown": actions[1],
    "ArrowLeft": actions[2],
    "ArrowUp": actions[3],
}
document.addEventListener("keydown", e => {
    let action = keyMapping[e.code];
    if (action) {
        update(currentState, action);
        draw(currentState);
    }
});
