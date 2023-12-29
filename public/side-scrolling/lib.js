export default {
 
    background: null,

    setBackground(value) {
        this.background = value;
    },

    configureCanvas() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    },

    draw() {
        this.ctx.resetTransform();
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.objects.forEach(obj => {
            this.ctx.resetTransform();
            this.ctx.translate(obj.x, obj.y);
            if (obj.angle) {
                this.ctx.rotate(obj.angle);
            }
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(-obj.width/2, -obj.height/2, obj.width, obj.height);
        })
    },

    setFullScreen() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },


    objects: [],

    addToGame(obj) {
        this.objects.push(obj);
    },


    input: {
        pressed: false,
        x: 0,
        y: 0,
    },

    inputActions: {
        pressed: [],
    },

    ifPressedDo(action) {
        this.inputActions.pressed.push(action);
    },

    configureInputListeners() { 
        this.canvas.addEventListener("mousedown", event => {
            this.input.pressed = true;
            this.input.x = event.clientX;
            this.input.y = event.clientY;
        });
        this.canvas.addEventListener("mouseup", event => {
            this.input.pressed = false;
        });
    },

    executeInputActions() {
        if (this.input.pressed) {
            this.inputActions.pressed.forEach(action => action());
        }
    },

    actions: [],

    alwaysDo(action) {
        this.actions.push(action);
    },

    loop() {
        this.executeInputActions();

        this.actions.forEach(action => action());

        this.draw();

        window.requestAnimationFrame(() => this.loop());
    },

    accelerateUp(obj, value) {
        obj.vy -= value;
    },

    onGround(obj) {
        return obj.y == this.canvas.height - obj.height/2;
    },

    applyGravity(obj, value) {
        obj.vy += value;
    },

    applyInertia(obj) {
        obj.x += obj.vx;
        obj.y += obj.vy;
    },

    applyFriction(obj, friction) {
        obj.vx *= (1-friction);
        obj.vy *= (1-friction);
    },

    keepInScreen(obj) {
        if (obj.x < 0) {
            obj.x = 0;
            if (obj.vx < 0) obj.vx = 0;
        }
        if (obj.x > this.canvas.width) {
            obj.x = this.canvas.width;
            if (obj.vx > 0) obj.vx = 0;
        }
        if (obj.y < 0) {
            obj.y = 0;
            if (obj.vy < 0) obj.vy = 0;
        }
        if (obj.y + obj.height/2 > this.canvas.height) {
            obj.y = this.canvas.height - obj.height/2;
            if (obj.vy > 0) obj.vy = 0;
        }
    },
}
