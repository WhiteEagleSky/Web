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
let imgBackground;
let xBackgroundOffset = 0;
let xBackgroundSpeed = 1;
let backgroundWidth = 1782;
let backgroundHeight = 600;

///////////////////////////////////
//Keys
let keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

let keyStatus = {};

function keyDownHandler(event) {
    "use strict";
    let keycode = event.keyCode,
        key;
    for(key in keys) {
        if(keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}

function keyUpHandler(event) {
    let keycode = event.keyCode,
        key;
    for(key in keys)
        if(keys[key] == keycode) {
            keyStatus[keycode] = false;
        }

}

///////////////////////////////////


/////////////////////////////////
// Hero Player
let player = new Player();

/////////////////////////////////


function updateScene() {
    "use strict";
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}

function updateItems() {
    "use strict";
    clearItems();

    let keycode;
    for(keycode in keyStatus) {
        if(keyStatus[keycode] === true) {
            if(keycode == keys.UP) {
                player.moveUp();
            }
            if(keycode == keys.DOWN) {
                player.moveDown();
            }
            if(keycode == keys.SPACE) {
                //shoot
            }
        }
        keyStatus[keycode] = false;
    }
}

function drawScene() {
    "use strict";
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px";

    conArena.font = "bold 20px Comic Sans MS";
    conArena.fillStyle = "#419eff";
    //conArena.strokeStyle = "#00c3ff";
    conArena.textAlign = "left";
    conArena.fillText("Score", 10, 20);
    conArena.strokeText("Score", 10, 20);
}

function drawItems() {
    "use strict";
    conArena.drawImage(player.img, 0, 0, player.imgWidth, player.imgHeight, player.x, player.y, player.playerWidth, player.playerHeight);
}

function clearItems() {
    "use strict";
    conArena.clearRect(player.x, player.y, player.playerWidth, player.playerHeight);
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
    canArena.setAttribute("height", ArenaHeight);
    canArena.setAttribute("width", ArenaWidth);
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    animFrame(recursiveAnim);
}

window.addEventListener("load", init, false);
