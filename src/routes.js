import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import {
  App,
  AppHome,
  D3,
  D3Home,
  D3D3act,
  D3Victory
} from './containers/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AppHome}/>
    <Route path="d3" component={D3}>
      <IndexRoute component={D3Home}/>
      <Route path="d3act" component={D3D3act}/>
      <Route path="victory" component={D3Victory}/>
    </Route>
    <Redirect from="rxjs" to="/"/>
    <Redirect from="d3-rxjs" to="/"/>
  </Route>
);
