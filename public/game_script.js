
setBackground('green');

setFullScreen();

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

addToGame(player);

ifKeyPressedDo('ArrowUp', () => {
    accelerateAtAngle(player, player.acceleration);
});
ifKeyPressedDo('ArrowDown', () => {
    accelerateAtAngle(player, -player.acceleration);
});
ifKeyPressedDo('ArrowRight', () => {
    player.angle += player.rotationSpeed;
});
ifKeyPressedDo('ArrowLeft', () => {
    player.angle -= player.rotationSpeed;
});

alwaysDo(() => {
    applyInertia(player);
    applyFriction(player, 0.05);
    keepInScreen(player);
})

loop();
