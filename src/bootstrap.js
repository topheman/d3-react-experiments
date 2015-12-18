global.Promise = global.Promise || require('es6-promise').Promise;

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

const history = createHashHistory({queryKey: 'hash'});

import routes from './routes.js';

const rootElement = <Router history={history}>{routes}</Router>;

ReactDOM.render(rootElement, document.getElementById('app-container'));
