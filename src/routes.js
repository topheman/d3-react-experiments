import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  AppHome,
  D3actBarChart,
  D3actMixed,
  VictoryWorldPopulationSexRatio
} from './containers/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AppHome}/>
    <Route path="d3act-barchart" component={D3actBarChart}/>
    <Route path="d3act-mixed" component={D3actMixed}/>
    <Route path="victory-world-population-sex-ratio" component={VictoryWorldPopulationSexRatio}/>
  </Route>
);
