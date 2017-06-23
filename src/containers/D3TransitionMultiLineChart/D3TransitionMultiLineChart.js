import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import { Link } from 'react-router';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import TransitionMultiLineChart from '../../components/d3/TransitionMultiLineChart/TransitionMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/d3/TransitionMultiLineChart/TransitionMultiLineChart.js';

const panelSubText = (
  <div>
    <p>
      This chart is a React Component with home-made d3. Some <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">adjustments</a> were made with the lifecycle of React:
    </p>
    <ul>
      <li>to reuse DOM nodes created by d3</li>
      <li>to apply d3 transitions on those nodes</li>
      <li>to ensure draw at first render / redraw when props change</li>
      <li>to prevent unnecessary DOM nodes attributes modifications</li>
    </ul>
    <p>Check the <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">comments in source code</a> for more infos.</p>
    <p>I made a version of this chart using <Link to="/victory/transition-multi-line-chart">the Victory library</Link>, check it out!</p>
    <p>It is also fully <strong>responsive</strong>.</p>
  </div>
);

const D3TransitionMultiLineChart = (props) => (
  <LifeExpectancy
    {...props}
    title={<span><Link to="/d3">d3</Link> / TransitionMultiLineChart</span>}
    prepareData={prepareDataLifeExpectancy}
    sourcesOnGithub={sourcesOnGithub}
    component={TransitionMultiLineChart}
    panelSubText={panelSubText}
  />
  );

export default navigator()(D3TransitionMultiLineChart);
