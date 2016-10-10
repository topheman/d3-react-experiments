global.Promise = global.Promise || require('es6-promise').Promise;
import 'array-includes/shim';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import routes from './routes.js';

const rootElement = <Router history={hashHistory}>{routes}</Router>;

ReactDOM.render(rootElement, document.getElementById('app-container'));
