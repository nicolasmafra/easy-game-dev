var background;

function setBackground(value) {
    background = value;
}

const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

function draw() {
    ctx.resetTransform();
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objects.forEach(obj => {
        ctx.resetTransform();
        ctx.translate(obj.x, obj.y);
        if (obj.angle) {
            ctx.rotate(obj.angle);
        }
        ctx.fillStyle = obj.color;
        ctx.fillRect(-obj.width/2, -obj.height/2, obj.width, obj.height);
    })
}

function setFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


const objects = [];

function addToGame(obj) {
    objects.push(obj);
}


const keyActions = {};

function ifKeyPressedDo(key, fn) {
    keyActions[key] = {
        fn: fn,
        pressed: false,
    };
}

document.addEventListener("keydown", event => {
    let keyAction = keyActions[event.key];
    if (keyAction) {
        keyAction.pressed = true;
    }
}, false);
document.addEventListener("keyup", event => {
    let keyAction = keyActions[event.key];
    if (keyAction) {
        keyAction.pressed = false;
    }
}, false);

function executeInputActions() {
    for (var key in keyActions) {
        let keyAction = keyActions[key];
        if (keyAction.pressed) {
            keyAction.fn();
        }
    }
}

const actions = [];

function alwaysDo(action) {
    actions.push(action);
}

function loop() {
    executeInputActions();

    actions.forEach(action => action());

    draw();

    window.requestAnimationFrame(loop);
}

function accelerateAtAngle(obj, value) {
    obj.vx += value * Math.cos(obj.angle);
    obj.vy += value * Math.sin(obj.angle);
}

function applyInertia(obj) {
    obj.x += obj.vx;
    obj.y += obj.vy;
}

function applyFriction(obj, friction) {
    obj.vx *= (1-friction);
    obj.vy *= (1-friction);
}

function keepInScreen(obj) {
    if (obj.x < 0) {
        obj.x = 0;
        if (obj.vx < 0) obj.vx *= -1;
    }
    if (obj.x > canvas.width) {
        obj.x = canvas.width;
        if (obj.vx > 0) obj.vx *= -1;
    }
    if (obj.y < 0) {
        obj.y = 0;
        if (obj.vy < 0) obj.vy *= -1;
    }
    if (obj.y > canvas.height) {
        obj.y = canvas.height;
        if (obj.vy > 0) obj.vy *= -1;
    }
}
