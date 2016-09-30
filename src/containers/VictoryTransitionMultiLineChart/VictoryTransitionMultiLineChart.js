import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import { Link } from 'react-router';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import TransitionMultiLineChart from '../../components/victory/TransitionMultiLineChart/TransitionMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/victory/TransitionMultiLineChart/TransitionMultiLineChart.js';

const panelSubText = (
  <div>
    <p>
      This chart was made with victory. <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">View sources</a>.
    </p>
  </div>
);

const VictoryTransitionMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title={<span><Link to="/victory">Victory</Link> / TransitionMultiLineChart</span>}
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={TransitionMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(VictoryTransitionMultiLineChart);
