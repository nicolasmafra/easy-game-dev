import lib from './lib.js';

lib.configureCanvas();

lib.setBackground('cyan');

lib.setFullScreen();

const player = {
    color: 'yellow',
    x: 100,
    y: 400,
    width: 40,
    height: 80,
    angle: 0,
    vx: 0,
    vy: 0,
    jumpSpeed: 20,
};

lib.addToGame(player);

lib.configureInputListeners();

lib.ifPressedDo(() => {
    if (lib.onGround(player)) {
        lib.accelerateUp(player, player.jumpSpeed);
    }
});

lib.alwaysDo(() => {
    lib.applyGravity(player, 0.5);
    lib.applyInertia(player);
    lib.keepInScreen(player);
})

lib.loop();
