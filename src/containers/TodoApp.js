
import React from 'react';
import Game from '../components/Game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/TodoActions'



class TodoApp extends React.Component{
	render(){
		const {todos, actions} = this.props;
		return <Game jumpTo = {(move)=> actions.jumpTo(move)} 
					 goTurn = {(row, col)=> actions.goTurn(row,col)} 
					 toggleSort={() => actions.toggleSort()} 
					 todos ={todos} />
	};

}

function mapStateToProps(state){
	return {
		todos : {
			history : state.TodoReducers.history,
			stepNumber : state.TodoReducers.stepNumber,
			xIsNext : state.TodoReducers.xIsNext,
			isAscending : state.TodoReducers.isAscending,
			winner : state.TodoReducers.winner
		}
		
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions : bindActionCreators(TodoActions, dispatch)
	};
}

 export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);