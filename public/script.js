import lib from './lib.js';

lib.configureCanvas();

lib.setBackground('green');

lib.setFullScreen();

const player = {
    color: 'blue',
    x: 100,
    y: 400,
    width: 40,
    height: 20,
    angle: 0,
    vx: 0,
    vy: 0,
    acceleration: 0.4,
    rotationSpeed: 0.03,
};

lib.addToGame(player);

lib.configureKeyboard();
lib.ifKeyPressedDo('ArrowUp', () => {
    lib.accelerateAtAngle(player, player.acceleration);
});
lib.ifKeyPressedDo('ArrowDown', () => {
    lib.accelerateAtAngle(player, -player.acceleration);
});
lib.ifKeyPressedDo('ArrowRight', () => {
    player.angle += player.rotationSpeed;
});
lib.ifKeyPressedDo('ArrowLeft', () => {
    player.angle -= player.rotationSpeed;
});

lib.alwaysDo(() => {
    lib.applyInertia(player);
    lib.applyFriction(player, 0.05);
    lib.keepInScreen(player);
})

lib.loop();
