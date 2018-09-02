import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import PromiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

//components
import App from './App';

//import reducer
import reducer from './reducers'
import { watcherSaga } from './saga/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    {},
    applyMiddleware(sagaMiddleware, reduxThunk, PromiseMiddleware)
)

sagaMiddleware.run(watcherSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));