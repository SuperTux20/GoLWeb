class CellularAutomaton {
    constructor() {
        this.cell_size = 4;
        this.dead_color = `#000000`;
        this.alive_color = `#007f7f`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

        this.arrayInit = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                this.inactive_array[i] = [];
                for (let j = 0; j < this.cells_in_column; j++)
                    this.inactive_array[i][j] = false;
                this.inactive_array[i][this.cells_in_column] = "PADDING";
            }
            this.active_array = this.inactive_array;
        };

        this.arrayRand = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column - 1; j++)
                    this.active_array[i][j] = (Math.random() > 0.5) ? true : false;
            }
        };

        this.fillArray = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column - 1; j++) {
                    let color;
                    if (this.active_array[i][j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }
        };

        this.cntNghbrs = () => {
            this.valueHelper = (row, col) => { try { return this.inactive_array[row][col] ? 1 : 0; } catch { return 0; } };
            this.cntNghbrs = (row, col) => {
                let total_neighbors = 0;
                total_neighbors += this.valueHelper(row - 1, col);
                total_neighbors += this.valueHelper(row, col - 1);
                total_neighbors += this.valueHelper(row + 1, col);
                total_neighbors += this.valueHelper(row, col + 1);
                if (moore) {
                    total_neighbors += this.valueHelper(row - 1, col - 1);
                    total_neighbors += this.valueHelper(row + 1, col - 1);
                    total_neighbors += this.valueHelper(row + 1, col + 1);
                    total_neighbors += this.valueHelper(row - 1, col + 1);
                } else if (extendvn) {
                    total_neighbors += this.valueHelper(row - 2, col);
                    total_neighbors += this.valueHelper(row, col - 2);
                    total_neighbors += this.valueHelper(row + 2, col);
                    total_neighbors += this.valueHelper(row, col + 2);
                }
                return total_neighbors;
            };
        };

        this.upCellVal = (row, col) => {
            var total = this.cntNghbrs(row, col);
            if (!this.active_array[row][col]) {
                for (var reproducible in reproduction) {
                    if (total == reproducible && reproduction[reproducible]) {
                        return reproduction[reproducible];
                    }
                }
            } else if (this.active_array[row][col]) {
                for (var survivable in survival) {
                    if (total == survivable && survival[survivable]) {
                        return survival[survivable];
                    }
                }
            }
        };

        this.upLifeCyc = () => {
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column - 1; j++) {
                    let new_state = this.upCellVal(i, j);
                    this.active_array[i][j] = new_state;
                }
            }
            this.inactive_array = this.active_array;
        };

        this.runGame = () => {
            this.upLifeCyc();
            this.fillArray();
        };

        this.saveState = () => {
            if (localStorage) {
                var state = this.active_array;
                for (let row in state) {
                    for (let col in state[row]) {
                        if (state[row][col] === undefined) {
                            state[row][col] = false;
                        }
                    }
                }
                localStorage.setItem("state", state);
            } else {
                alert("This browser does not support session storage, save states cannot be used. Sorry buddy ¯\\_(ツ)_/¯");
            }
        };

        this.loadState = () => {
            var state = localStorage.state.split(",PADDING,");
            for (let row in state) {
                state[row] = state[row].split(",");
            }
            state[state.length - 1] = state[state.length - 1].filter(item => item !== "PADDING");
            for (let row in state) {
                for (let col in state[row]) {
                    state[row][col] = JSON.parse(state[row][col]);
                }
                state[row][this.cells_in_column] = "PADDING";
            }
            if (state != null) {
                this.active_array = state;
                this.inactive_array = state;
            }
        };
    }
}