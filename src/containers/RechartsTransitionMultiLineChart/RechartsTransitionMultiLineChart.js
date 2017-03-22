import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import { Link } from 'react-router';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import TransitionMultiLineChart from '../../components/recharts/TransitionMultiLineChart/TransitionMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/recharts/TransitionMultiLineChart/TransitionMultiLineChart.js';

const panelSubText = (
  <div>
    <p>
      This chart is a React Component based on <code>LineChart</code>, <code>Line</code>, <code>XAxis</code>, <code>YAxis</code> and <code>Tooltip</code> from <a href="http://recharts.org">Recharts</a>, a composable charting library built on React components.
    </p>
    <p>Check <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">the sources of this chart</a> against the ones <Link to="/d3">I made in pure d3</Link> and <Link to="/victory">Victory</Link>.</p>
    <p>It is also fully <strong>responsive</strong>.</p>
  </div>
);

const RechartsTransitionMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title={<span><Link to="/recharts">Recharts</Link> / TransitionMultiLineChart</span>}
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={TransitionMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(RechartsTransitionMultiLineChart);
