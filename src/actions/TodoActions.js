import * as types from '../constants/ActionTypes';

export const goTurn = function(row, col){
	return {
		type : types.GO_TURN,
		row,
		col
	}
}

export const jumpTo = function(move){
	return {
		type : types.JUMP_TO,
		move
	}
}

export const toggleSort = function(){
	return{
		type : types.TOGGLE_SORT
	}
}

