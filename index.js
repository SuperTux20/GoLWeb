let moore = true;

let survival = {
    0: false,
    1: false,
    2: true,
    3: true,
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
    3: true,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false
};

const canvas = document.querySelector("#gamefield");
const ctx = canvas.getContext("2d");
const game = new CellularAutomaton()
game.arrayInit()

function toggleNeighborhood() {
    if (document.getElementById("mncheck").checked) {
        document.getElementById("moore-newman").textContent = "Moore (8-cell) Neighborhood";
        moore = true;
    } else {
        document.getElementById("moore-newman").textContent = "Von Neuman (4-cell) Neighborhood";
        moore = false;
    }
}

window.onload = () => {
    toggleNeighborhood();
    document.querySelector("#start").addEventListener(
        "click", () => {
            game.arrayRand();
            game.fillArray();
            window.setInterval(() => { game.runGame(); }, 300)
        }
    )
    document.querySelector("#stop").addEventListener("click", () => { game.gameSetUp(); })
}