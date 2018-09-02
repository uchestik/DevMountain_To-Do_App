import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Todo from './components/todo/todo';
import Form from './components/form/form';

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path='/form' component={Form} />
                <Route exact path='/' component={Todo} />
            </div>
        </BrowserRouter>
    )
}

export default App;