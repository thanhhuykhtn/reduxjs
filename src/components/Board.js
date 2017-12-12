
import React from 'react';
import Square from './Square';

class Board extends React.Component{


	renderSquare(row, col){
		return <Square  winner={this.props.squares[row][col].isWin} value={this.props.squares[row][col].value} goTurn={() => this.props.goTurn(row, col)}/>
		
	}

	renderSquares(row){
		let render = [];
		for(let i = 0; i < row; i++){
			let cell = [];
			for(let j=0 ; j<row; j++){
				cell.push(this.renderSquare(i,j));
			}
			render.push(<div key={i} className = "board-row">{cell}</div>);
			
		}

		return render;
	}

	render(){
		return (
			<div>{this.renderSquares(10)}</div>
		);
	}
}

export default Board