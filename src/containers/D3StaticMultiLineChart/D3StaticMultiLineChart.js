import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import { Link } from 'react-router';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import StaticMultiLineChart from '../../components/d3/StaticMultiLineChart/StaticMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/d3/StaticMultiLineChart/StaticMultiLineChart.js';

const panelSubText = (
  <div>
    <p>
      This chart is a React Component with home-made d3. As you'll see in the <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">source code</a>, it's nearly a simple copy/paste from <a href="https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f" title="See example from bl.ocks.org">bl.ocks.org</a> of regular d3 code, which works <strong>out of the box</strong> in React ...
    </p>
    <p>It is also fully <strong>responsive</strong>.</p>
  </div>
);

const D3StaticMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title={<span><Link to="/d3">d3</Link> / StaticMultiLineChart</span>}
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={StaticMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(D3StaticMultiLineChart);
