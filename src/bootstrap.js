import 'array-includes/shim';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // will go away in 'production' mode
import { hashHistory } from 'react-router';

import routes from './routes';
import Root from './components/Root/Root';

global.Promise = global.Promise || require('es6-promise').Promise;

const renderApp = (appRoutes, history) => {
  render(
    <AppContainer>
      <Root routes={appRoutes} history={history} />
    </AppContainer>,
    document.getElementById('app-container')
  );
};

renderApp(routes, hashHistory);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderApp(newRoutes, hashHistory);
  });
}
