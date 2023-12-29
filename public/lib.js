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


    keyActions: {},

    ifKeyPressedDo(key, fn) {
        this.keyActions[key] = {
            fn: fn,
            pressed: false,
        };
    },

    configureKeyboard() { 
        document.addEventListener("keydown", event => {
            let keyAction = this.keyActions[event.key];
            if (keyAction) {
                keyAction.pressed = true;
            }
        }, false);
        document.addEventListener("keyup", event => {
            let keyAction = this.keyActions[event.key];
            if (keyAction) {
                keyAction.pressed = false;
            }
        }, false);
    },

    executeInputActions() {
        for (var key in this.keyActions) {
            let keyAction = this.keyActions[key];
            if (keyAction.pressed) {
                keyAction.fn();
            }
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

    accelerateAtAngle(obj, value) {
        obj.vx += value * Math.cos(obj.angle);
        obj.vy += value * Math.sin(obj.angle);
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
            if (obj.vx < 0) obj.vx *= -1;
        }
        if (obj.x > this.canvas.width) {
            obj.x = this.canvas.width;
            if (obj.vx > 0) obj.vx *= -1;
        }
        if (obj.y < 0) {
            obj.y = 0;
            if (obj.vy < 0) obj.vy *= -1;
        }
        if (obj.y > this.canvas.height) {
            obj.y = this.canvas.height;
            if (obj.vy > 0) obj.vy *= -1;
        }
    },
}
