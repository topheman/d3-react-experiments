import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import {
  App,
  AppHome,
  D3actBarChart,
  D3actMixedChart,
  RechartsTransitionMultiLineChart,
  VictoryWorldPopulationByAgeRange,
  VictoryTransitionMultiLineChart,
  VictoryCountNpmDownloads,
  D3StaticMultiLineChart,
  D3TransitionMultiLineChart,
  ReactFauxDomStaticMultiLineChart
} from './containers/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AppHome} />
    <Route path="d3act/bar-chart" component={D3actBarChart} />
    <Route path="d3act/mixed-chart" component={D3actMixedChart} />
    <Redirect from="d3act" to="d3act/bar-chart" />
    <Route path="recharts/transition-multi-line-chart" component={RechartsTransitionMultiLineChart} />
    <Redirect from="recharts" to="recharts/transition-multi-line-chart" />
    <Route path="victory/world-population-by-age-range" component={VictoryWorldPopulationByAgeRange} />
    <Route path="victory/transition-multi-line-chart" component={VictoryTransitionMultiLineChart} />
    <Route path="victory/count-npm-downloads" component={VictoryCountNpmDownloads} />
    <Redirect from="victory" to="victory/world-population-by-age-range" />
    <Route path="d3/static-multi-line-chart" component={D3StaticMultiLineChart} />
    <Route path="d3/transition-multi-line-chart" component={D3TransitionMultiLineChart} />
    <Redirect from="d3" to="d3/transition-multi-line-chart" />
    <Route path="d3/react-faux-dom/static-multi-line-chart" component={ReactFauxDomStaticMultiLineChart} />
    <Redirect from="d3/react-faux-dom" to="d3/react-faux-dom/static-multi-line-chart" />
  </Route>
);
