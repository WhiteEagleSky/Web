let animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

//Canvas
let divArena;
let canArena;
let conArena;
let ArenaWidth = 500;
let ArenaHeight = 300;

//Background
let xBackgroundOffset = 0;
let xBackgroundSpeed = 1;
let backgroundWidth = 1782;

///////////////////////////////////
//Keys
let keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

let keyStatus = {};
let canFire = true;

function keyDownHandler(event) {
    "use strict";
    let keycode = event.keyCode,
        key;
    for(key in keys) {
        if(keys[key] === keycode) {
            // noinspection EqualityComparisonWithCoercionJS
            if(!canFire && keycode == keys.SPACE) {
                continue;
            }

            // noinspection EqualityComparisonWithCoercionJS
            if(keycode == keys.SPACE) {
                canFire = false;
            }
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}

function keyUpHandler(event) {
    let keycode = event.keyCode,
        key;
    for(key in keys) {
        if(keys[key] === keycode) {
            // noinspection EqualityComparisonWithCoercionJS
            if(keycode == keys.SPACE) {
                canFire = true;
            }
            keyStatus[keycode] = false;
        }
    }
}

///////////////////////////////////


/////////////////////////////////
// Hero Player
let player = new Player();
let score = 0;
/////////////////////////////////

let lasers = [];
let targets = [];
let sinceLastTarget = 0;

function detectCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;
}

function updateScene() {
    "use strict";
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}

function updateItems() {
    "use strict";
    clearItems();

    sinceLastTarget++;
    if(sinceLastTarget > 100 * ((Math.random() * 10) % 3 + 2)) {
        targets.push(new Target(ArenaWidth, Math.random() * ArenaHeight));
        sinceLastTarget = 0;
    }

    for(let keyCode in keyStatus) {
        // noinspection JSUnfilteredForInLoop
        if(keyStatus[keyCode] === true) {
            // noinspection EqualityComparisonWithCoercionJS
            if(keyCode == keys.UP) {
                player.moveUp();
            }
            // noinspection EqualityComparisonWithCoercionJS
            if(keyCode == keys.DOWN) {
                player.moveDown();
            }
            // noinspection EqualityComparisonWithCoercionJS
            if(keyCode == keys.SPACE) {
                lasers.push(new Laser(player.x + player.playerWidth / 4, player.y + player.playerHeight / 4))
            }
        }
        // noinspection JSUnfilteredForInLoop
        keyStatus[keyCode] = false;
    }

    for(let laser in lasers) {
        lasers[laser].updatePosition();
        if(lasers[laser].x > ArenaWidth) {
            lasers.splice(laser, 1);
        }
    }

    for(let target in targets) {
        targets[target].updatePosition();
        if(targets[target].x < 0) {
            targets.splice(target, 1);
        }
    }

    for(let laser in lasers) {
        for(let target in targets) {
            if(detectCollision(targets[target].getCollisionRect(), lasers[laser].getCollisionRect())) {
                score ++;
                targets.splice(target, 1);
                lasers.splice(laser, 1);
            }
        }
    }

    for(let target of targets) {
        if(detectCollision(player.getCollisionRect(), target.getCollisionRect())) {
            alert("Game Over");
            targets.splice(target, 1);
            score = 0;
            return;
        }
    }
}

function drawScene() {
    "use strict";
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px";

    conArena.font = "bold 20px Comic Sans MS";
    conArena.fillStyle = "#419eff";
    //conArena.strokeStyle = "#00c3ff";
    conArena.textAlign = "left";
    conArena.clearRect(0, 0, ArenaWidth, 100);
    conArena.fillText("Score: " + score, 10, 20);
    conArena.strokeText("Score: " + score, 10, 20);
}

function drawItems() {
    "use strict";
    conArena.drawImage(player.img, 0, 0, player.imgWidth, player.imgHeight, player.x, player.y, player.playerWidth, player.playerHeight);

    for(let laser of lasers) {
        conArena.fillStyle = "red";
        conArena.fillRect(laser.x + laser.width / 2, laser.y + laser.height / 2, laser.width, laser.height);
    }

    for(let target of targets) {
        conArena.drawImage(target.img, 0, 0, target.imgWidth, target.imgHeight, target.x, target.y, target.targetWidth, target.targetHeight);
    }
}

function clearItems() {
    "use strict";
    conArena.clearRect(player.x, player.y, player.playerWidth, player.playerHeight);

    for(let laser of lasers) {
        conArena.clearRect(laser.x - laser.width / 2, laser.y - laser.height / 2, laser.width * 2, laser.height * 2);
    }

    for(let target of targets) {
        conArena.clearRect(target.x - target.targetWidth / 2, target.y - target.targetHeight / 2, target.imgWidth * 2, target.imgHeight * 2);
    }
}

function updateGame() {
    "use strict";
    updateScene();
    updateItems();
}

function drawGame() {
    "use strict";
    drawScene();
    drawItems();
}


function mainloop() {
    "use strict";
    updateGame();
    drawGame();
}

function recursiveAnim() {
    "use strict";
    mainloop();
    animFrame(recursiveAnim);
}

function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.setAttribute("height", ArenaHeight + "px");
    canArena.setAttribute("width", ArenaWidth + "px");
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    animFrame(recursiveAnim);
}

window.addEventListener("load", init, false);
