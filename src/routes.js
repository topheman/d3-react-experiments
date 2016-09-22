import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  AppHome,
  D3actBarChart,
  D3actMixedChart,
  VictoryWorldPopulationByAgeRange,
  D3StaticMultiLineChart,
  D3TransitionMultiLineChart
} from './containers/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AppHome}/>
    <Route path="d3act-barchart" component={D3actBarChart}/>
    <Route path="d3act-mixed" component={D3actMixedChart}/>
    <Route path="victory-world-population-by-age-range" component={VictoryWorldPopulationByAgeRange}/>
    <Route path="d3/static-multi-line-chart" component={D3StaticMultiLineChart}/>
    <Route path="d3/transition-multi-line-chart" component={D3TransitionMultiLineChart}/>
  </Route>
);
