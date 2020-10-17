let canvas;
let ctx;
let width;
let height;

let mouseObj;

//gravity
const g = 982;

//How much energy is lost on every collision
const restitution = 0.93;

class Droplet {
    static verticalSpeed = 200;
    static verticalVariation = 100;
    static horizontalSpeed = 200;
    static horizontalVariation = 150;
    static timeToLive = 20000;

    x;
    y;
    vx;
    vy;
    radius;
    colour;
    mass;
    isColliding;
    birth;

    constructor() {
        this.x = Math.floor(Math.random() * (width + 1 + Droplet.verticalSpeed + Droplet.verticalVariation));
        this.y = -100;
        this.vx = -(Droplet.horizontalSpeed + Math.floor(Math.random() * Droplet.horizontalVariation));
        this.vy = Droplet.verticalSpeed + Math.floor(Math.random() * Droplet.verticalVariation);
        this.radius = 30;
        this.colour = "white";
        this.mass = 1;
        this.isColliding = false;
        this.birth = Date.now();
    }

    update(dt) {
        //Apply gravity
        this.vy += g * dt;

        this.x += this.vx * dt;
        this.y += this.vy * dt;
    };

    draw(){
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    }
}

class mouse {
    px;
    py;
    x;
    y;
    vx;
    vy;
    radius;
    mass;
    colour;

    constructor() {
        this.px = 0;
        this.py = 0;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = 80;
        this.mass = 1000000000;
        this.colour = "white";
    }

    update(dt) {
        this.vx = 0.4 * (this.x - this.px) / dt;
        this.vy = 0.4 * (this.y - this.py) / dt;
        this.px = this.x;
        this.py = this.y;
    }

    draw(){
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    }
}

class staticCircle {
    x;
    y;
    vx;
    vy;
    radius;
    mass;
    colour;

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.mass = 1000000000;
        this.colour = "white";
    }

    draw(){
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(Math.floor(this.x), Math.floor(this.y), Math.floor(this.radius), 0, 2 * Math.PI);
        ctx.fill();
    }
}

function detectEdgeCollisions() {
    let obj;
    for(let i = 0; i < droplets.length; i++) {
        obj = droplets[i];

        //Check for left and right
        if(obj.x < obj.radius) {
            obj.vx = Math.abs(obj.vx) * restitution;
            obj.x = obj.radius;
        } else if(obj.x > width - obj.radius) {
            obj.vx = -Math.abs(obj.vx) * restitution;
            obj.x = width - obj.radius;
        }

        //Check for bottom
        if(obj.y > height - obj.radius){
            obj.vy = -Math.abs(obj.vy) * restitution;
            obj.y = height - obj.radius;
        }
    }
}

function detectCollisions() {
    let obj1;
    let obj2;

    for(let i = 0; i < droplets.length; i++) {
        droplets[i].isColliding = false;
    }

    let result;
    for (let i = 0; i < droplets.length; i++) {

        obj1 = droplets[i];

        //Calculate collision with mouse
        if(circleIntersect(mouseObj.x, mouseObj.y, mouseObj.radius, obj1.x, obj1.y, obj1.radius)){
            obj1.isColliding = true;

            result = calculateCollisionResult(obj1, mouseObj);

            if(result.speed >= 0) {
                let impulse = 2 * result.speed / (mouseObj.mass + obj1.mass);
                obj1.vx -= (impulse * mouseObj.mass * result.vCollisionNorm.x);
                obj1.vy -= (impulse * mouseObj.mass * result.vCollisionNorm.y);
            }
        }

        //Calculate collisions with other moving circles
        for (let j = i + 1; j < droplets.length; j++) {

            obj2 = droplets[j];

            if(circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                obj1.isColliding = true;
                obj2.isColliding = true;

                result = calculateCollisionResult(obj1, obj2);

                let vCollisionNorm = result.vCollisionNorm;
                let speed = result.speed;

                if (speed < 0) {
                    break;
                }

                let impulse = 2 * speed / (obj1.mass + obj2.mass);
                obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
            }
        }

        //Calculate collisions with static objects
        for(let j = 0; j < statics.length; j++) {
            obj2 = statics[j];

            if(circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)){
                result = calculateCollisionResult(obj1, obj2);
                obj1.isColliding = true;

                if(result.speed >= 0) {
                    let impulse = 2 * result.speed / (obj2.mass + obj1.mass);
                    obj1.vx -= (impulse * obj2.mass * result.vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * result.vCollisionNorm.y);
                }
            }
        }
    }

    for(let i = 0; i < droplets.length; i++) {
        droplets[i].isColliding = false;
    }
}

function calculateCollisionResult(obj1, obj2) {

    let vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};

    let distance = Math.sqrt((obj1.x - obj2.x) * (obj1.x - obj2.x) + (obj1.y - obj2.y) * (obj1.y - obj2.y));

    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

    let vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};

    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    speed *= restitution;

    return {vCollisionNorm: vCollisionNorm, speed: speed}
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
    //Calculate distance between two circles
    let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

    return squareDistance <= ((r1 + r2) * (r1 + r2));
}

function clearRect() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#001";
    ctx.fillRect(0, 0, width, height);
}

function spawnDroplet() {
    if(Math.random() <= 0.03) {
        droplets.push(new Droplet());
    }
}

let droplets = [];
let statics = [];
let lastFrame;

function init(){
    lastFrame = Date.now();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d", {alpha: false});

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    mouseObj = new mouse();

    canvas.addEventListener('mousemove', function (evt) {
        const rect = canvas.getBoundingClientRect();
        mouseObj.x = Math.floor(evt.clientX - rect.left);
        mouseObj.y = Math.floor(evt.clientY - rect.top);

    });

    setInterval(spawnDroplet, 100);

    droplets = [
        new Droplet(),
        new Droplet(),
        new Droplet()
    ];

    statics = [
        new staticCircle(650, 600, 70),
        new staticCircle(0, 800, 400),
        new staticCircle(1000, 300, 150),
        new staticCircle(1500, 400, 250)
    ];

    window.requestAnimationFrame(animate);
}

function animate() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const nextFrame = Date.now();
    const deltaTime = (nextFrame - lastFrame) / 1000;
    lastFrame = nextFrame;

    let droplet;

    for (let i = droplets.length - 1; i >= 0; i--) {
        droplet = droplets[i];

        droplet.update(deltaTime);
    }

    mouseObj.update(deltaTime);

    detectCollisions();
    detectEdgeCollisions();

    clearRect();
    mouseObj.draw();

    for (let i = droplets.length - 1; i >= 0; i--) {
        droplet = droplets[i];

        if(droplet.birth + Droplet.timeToLive < nextFrame) {
            droplets.splice(i, 1);
        } else {
            droplet.draw(width, height);
        }
    }

    for(let i = 0; i < statics.length; i++) {
        stat = statics[i];
        stat.draw();
    }

    window.requestAnimationFrame(animate);
}

$(document).ready(init);