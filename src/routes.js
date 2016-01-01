import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import {
  App,
  AppHome,
  D3,
  D3Home,
  D3D3act,
  D3Victory,
  RxJS,
  RxJSHome
} from './containers/index';

import sensorsObserver from './services/sensorsObserver';

const requireSensor = (nextState, replaceState, cb) => {
  sensorsObserver().then(mode => {
    console.log('mode', mode);
    cb(null);
  });
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AppHome}/>
    <Route path="d3" component={D3}>
      <IndexRoute component={D3Home}/>
      <Route path="d3act" component={D3D3act}/>
      <Route path="victory" component={D3Victory}/>
    </Route>
    <Route path="rxjs" component={RxJS} onEnter={requireSensor}>
      <IndexRoute component={RxJSHome}/>
    </Route>
    <Redirect from="d3-rxjs" to="/"/>
  </Route>
);
