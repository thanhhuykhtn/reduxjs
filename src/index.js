
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import TodoApp from './containers/TodoApp';
import RootReducer from './reducers/RootReducer';
import './index.css';


const initState = {};

const store = createStore(RootReducer, initState);


const appRoot = (
    <Provider store={store}>
        <div>
            <TodoApp />
        </div>
    </Provider>
)

ReactDOM.render(appRoot, document.getElementById('root'))