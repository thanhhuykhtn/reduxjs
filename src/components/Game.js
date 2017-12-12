
import React from 'react'
import Board from './Board'

class Game extends React.Component {

    render() {
        const history = this.props.todos.history;
        const current = history[this.props.todos.stepNumber];
        const winner = calculateWinner(current.squares, current.movedLocation.row, current.movedLocation.col);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Jump to (' + step.movedLocation.row + ',' + step.movedLocation.col + ')' :
                'Game start';
            if (step.movedLocation.row === current.movedLocation.row &&
                step.movedLocation.col === current.movedLocation.col) {
                return (
                    <li key={move}>
                        <button className="yellow">{desc}</button>
                    </li>
                );
            }
            else {
                return (
                    <li key={move}>
                        <button onClick={()=> this.props.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });
        console.log("winner", winner);
        if (winner) {
            winner.map((step, index) => {
                current.squares[step.row][step.col].isWin = true;
            });
        }


        let status;
        if (winner) {
            status = 'Winner : ' + current.squares[winner[0].row][winner[0].col].value;
        }
        else {
            status = 'Next Player : ' + (this.props.todos.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} goTurn={(row, col) => this.props.goTurn(row, col)} />
                </div>
                <div className="game-info">
                    <button className="btn" onClick={() => this.props.toggleSort()}>
                        TOGGLE SORT
                    </button>
                    <div>{status}</div>
                    <ol>{this.props.todos.isAscending ? moves : moves.reverse()}</ol>
                </div>
            </div>
        );
    }
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

export default Game

