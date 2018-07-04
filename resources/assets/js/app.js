require('./bootstrap');
import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Route, Router} from 'react-router';

import App from './components/App';
import Create from './components/Document/Create';
import Index from './components/Document/Index';

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/add" component={Create}/>
            <Route path="/index" component={Index}/>
        </Route>
    </Router>,
    document.getElementById('app-container'));
