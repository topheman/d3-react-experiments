import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import TransitionMultiLineChart from '../../components/d3/TransitionMultiLineChart/TransitionMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/d3/TransitionMultiLineChart/TransitionMultiLineChart.js';

const panelSubText = (
  <div>
    <p>
      This chart handles transitions (in vanilla d3), it needs some <a href={urlFromViewSourceOnGithub(sourcesOnGithub)}>adjustments</a> with the lifecycle of React, to prevent the re-render.
    </p>
    <p>It is also fully responsive.</p>
  </div>
);

const D3TransitionMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title="TransitionMultiLineChart"
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={TransitionMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(D3TransitionMultiLineChart);
