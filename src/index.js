import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware  from 'redux-saga';
import PromiseMiddleware from 'redux-promise';

//components
import App from './App';

//import reducer
import reducer from './reducers'
import { rootSaga } from './saga/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    {},
    applyMiddleware(sagaMiddleware, PromiseMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));