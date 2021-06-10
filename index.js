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
    var ext = document.getElementsByClassName("extended-newman");
    if (document.getElementById("mncheck").checked) {
        document.getElementById("moore-newman").textContent = "Moore (8-cell) Neighborhood";
        for (let element in ext) {
            ext[element].style = "display: none;";
        }
        moore = true;
    } else {
        document.getElementById("moore-newman").textContent = "Von Neuman (4-cell) Neighborhood";
        for (let element in ext) {
            ext[element].style = "display: inline-block;";
        }
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

function speedCheck() {
    speed = slider.value;
    if (speed == 0)
        output.innerHTML = "MAX"
    else
        output.innerHTML = speed.concat("ms per update");
}

slider.oninput = function() {
    speedCheck()
    try { clearInterval(GoL); } catch {}
    GoL = setInterval(() => { game.runGame(); }, speed);
}

onload = () => {
    toggleNeighborhood();
    extendNewman();
    speedCheck();
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

    document.getElementById("mncheck").addEventListener("input", () => { toggleNeighborhood(); })

    document.getElementById("extcheck").addEventListener("input", () => { extendNewman(); })

    document.getElementById("save").addEventListener("click", () => { game.saveState(); })

    document.getElementById("load").addEventListener("click", () => { game.loadState(); })

    for (let checkbox = 0; checkbox < 9; checkbox++) {
        try {
            document.getElementById(document.getElementsByClassName("s")[checkbox].id).addEventListener(
                "input", () => {
                    surCheck(parseInt(document.getElementsByClassName("s")[checkbox].id.split("")[1]));
                }
            )
        } catch {}
        try {
            document.getElementById(document.getElementsByClassName("r")[checkbox].id).addEventListener(
                "input", () => {
                    repCheck(parseInt(document.getElementsByClassName("r")[checkbox].id.split("")[1]));
                }
            )
        } catch {}
        // you know, I didn't think this would actually work
    }
}