import { GO_TURN, TOGGLE_SORT, JUMP_TO } from '../constants/ActionTypes';


const initState = {
    history: [{
        squares: createSquares(10),
        movedLocation: {
            col: null,
            row: null,
            value: null
        }
    }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
    isAscending: true
}

export default function toDoReducers(state = initState, action) {
    switch (action.type) {
        case GO_TURN:
            const history = JSON.parse(JSON.stringify(state.history.slice(0, state.stepNumber + 1)));
            const current = history[history.length - 1];
            const squares = JSON.parse(JSON.stringify(current.squares));
            const row = action.row;
            const col = action.col;


            const winner = calculateWinner(current.squares, current.movedLocation.row, current.movedLocation.col);

            if (winner) {
                return {
                    ...state,
                    winner: winner
                };
            }

            if (squares[row][col].value != null || winner) {
                return state;
            }

            squares[row][col].value = (state.xIsNext ? 'X' : 'O');

            return {
                ...state,
                history: history.concat([{
                    squares: squares,
                    movedLocation: {
                        col: col,
                        row: row,
                        value: squares[row][col].value
                    }
                }]),
                xIsNext: !state.xIsNext,
                stepNumber: history.length

            };

        case JUMP_TO:
            return {
                ...state,
                stepNumber: action.move,
                xIsNext: (action.move % 2) === 0
            };

        case TOGGLE_SORT:
            return {
                ...state,
                isAscending: !state.isAscending
            };

        default:
            return state;

    }
}


function createSquares(numberOfRows) {
    let array = new Array(numberOfRows);

    for (let i = 0; i < numberOfRows; i++) {
        array[i] = new Array(numberOfRows);
        for (let j = 0; j < numberOfRows; j++) {
            array[i][j] = {
                col: j,
                row: i,
                value: null,
                isWin: false
            }
        }
    }
    return array;
}

function calculateWinner(board, row, col) {

    let arr = [];
    if (!row || !col) {
        return null;
    }
    const state = board[row][col].value;
    const n = board.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
        if (count === 5) {
            return arr;
        }

        if (board[row][i].value === state) {
            count++;
            arr.push({ row: row, col: i });
        } else {
            count = 0;
            arr = [];
        }
    }


    count = 0;
    arr = [];
    for (let i = 0; i < n; i++) {
        if (count === 5) {
            return arr;
        }

        if (board[i][col].value === state) {
            count++;
            arr.push({ row: i, col: col });
        } else {
            count = 0;
            arr = [];
        }


    }

    count = 0;
    arr = [];
    for (let i = 0; i < n; i++) {
        if ((row - i) < 0 || (col - i) < 0) {
            break;
        }
        if (board[row - i][col - i].value === state) {
            count++;
            arr.push({ row: row - i, col: col - i });
        } else {
            break;
        }
    }
    for (let i = 0; i < board.length; i++) {
        if ((row + i) > (n - 1) || (col + i) > n - 1) {
            break;
        }
        if (board[row + i][col + i].value === state && i > 0) {
            count++;
            arr.push({ row: row + i, col: col + i });
        } else if (i === 0) {

        } else {
            break;
        }
    }
    if (count >= 5) {
        return arr;
    }

    count = 0;
    arr = [];
    for (let i = 0; i < n; i++) {
        if ((row + i) > n - 1 || (col - i) < 0) {
            break;
        }
        if (board[row + i][col - i].value === state) {
            count++;
            arr.push({ row: row + i, col: col - i });
        } else {
            break;
        }
    }
    for (let i = 0; i < board.length; i++) {
        if ((row - i) < 0 || (col + i) > n - 1) {
            break;
        }
        if (board[row - i][col + i].value === state && i > 0) {
            arr.push({ row: row - i, col: col + i });
            count++;
        } else if (i === 0) {

        } else {
            break;
        }
    }
    if (count >= 5) {
        return arr;
    }

    return null;
}