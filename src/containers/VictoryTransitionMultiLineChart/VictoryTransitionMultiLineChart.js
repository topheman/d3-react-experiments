import React from 'react';
import { Link } from 'react-router';

import navigator from '../../components/Navigator/injectNavigator';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import TransitionMultiLineChart from '../../components/victory/TransitionMultiLineChart/TransitionMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/victory/TransitionMultiLineChart/TransitionMultiLineChart.js';

const panelSubText = (
  <div>
    <p>This chart is a React Component based on <code>VictoryChart</code>, <code>VictoryAxis</code> and <code>VictoryLine</code>, from <a href="https://formidable.com/open-source/victory/" title="Victory home page">Victory</a>, a collection of composable React components for building interactive data visualizations.</p>
    <p>Check <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">the sources of this chart</a> against the ones <Link to="/d3">I made in pure d3</Link>.</p>
  </div>
);

const VictoryTransitionMultiLineChart = (props) => (
  <LifeExpectancy
    {...props}
    title={<span><Link to="/victory">Victory</Link> / TransitionMultiLineChart</span>}
    prepareData={prepareDataLifeExpectancy}
    sourcesOnGithub={sourcesOnGithub}
    component={TransitionMultiLineChart}
    panelSubText={panelSubText}
  />
  );

export default navigator()(VictoryTransitionMultiLineChart);
