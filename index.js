let moore = true;
let extendvn = false;

let survival = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
};

let reproduction = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
};
var GoL;
var speed;

const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const game = new CellularAutomaton()
game.arrayInit()

function toggleNeighborhood() {
    if (document.getElementById("mncheck").checked) {
        document.getElementById("moore-newman").textContent = "Moore (8-cell) Neighborhood";
        document.getElementById("extcheck").style = "display: hidden;";
        document.getElementById("extended-newman").style = "display: hidden;";
        moore = true;
    } else {
        document.getElementById("moore-newman").textContent = "Von Neuman (4-cell) Neighborhood";
        document.getElementById("extcheck").style = "display: inline-block;";
        document.getElementById("extended-newman").style = "display: inline-block;";
        moore = false;
    }
}

function extendNewman() {
    extendvn = document.getElementById("extcheck").checked;
}

function surCheck(number) {
    survival[number] = document.getElementById("s".concat(number)).checked;
}

function repCheck(number) {
    reproduction[number] = document.getElementById("r".concat(number)).checked;
}

var slider = document.getElementById("speed");
var output = document.getElementById("speedlabel");

function speedcheck() {
    speed = slider.value;
    if (speed == 0)
        output.innerHTML = "MAX"
    else
        output.innerHTML = speed.concat("ms per update");
}

speedcheck();

slider.oninput = function() {
    speedcheck()
    try { clearInterval(GoL); } catch {}
    GoL = setInterval(() => { game.runGame(); }, speed);
}

onload = () => {
    toggleNeighborhood();
    extendNewman();
    for (var i = 0; i < 9; i++) {
        surCheck(i)
        repCheck(i)
    }
    document.getElementById("start").addEventListener(
        "click", () => {
            try { clearInterval(GoL); } catch {}
            game.arrayRand();
            game.fillArray();
            GoL = setInterval(() => { game.runGame(); }, speed);
        }
    )
    document.getElementById("stop").addEventListener("click", () => { clearInterval(GoL); })
}