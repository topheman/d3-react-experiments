import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import StaticMultiLineChart from '../../components/ReactFauxDom/StaticMultiLineChart/StaticMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/ReactFauxDom/StaticMultiLineChart/StaticMultiLineChart.js';

const panelSubText = (
  <div>
    <p>This is a <strong>react-faux-dom</strong> based component. <a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">source code</a></p>
    <p>It is also fully <strong>responsive</strong>.</p>
  </div>
);

const ReactFauxDomStaticMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title="FauxDom - StaticMultiLineChart"
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={StaticMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(ReactFauxDomStaticMultiLineChart);
