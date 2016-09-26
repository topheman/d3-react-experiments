import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import { Link } from 'react-router';
import LifeExpectancy from '../../components/LifeExpectancy/LifeExpectancy';

import StaticMultiLineChart from '../../components/ReactFauxDom/StaticMultiLineChart/StaticMultiLineChart';
import { prepareDataLifeExpectancy } from '../../resources/helper';
import { urlFromViewSourceOnGithub } from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';

const sourcesOnGithub = '/src/components/ReactFauxDom/StaticMultiLineChart/StaticMultiLineChart.js';

const panelSubText = (
  <div>
    <p>This chart contains nearly the same code as the <Link to="/d3/static-multi-line-chart">d3/StaticMultiLineChart component</Link> but is based on <a href="https://github.com/Olical/react-faux-dom" title="react-faux-dom on Github">react-faux-dom</a>, a library that provides a DOM like structure that renders to React.</p>
    <p>That way, we don't access directly to the DOM, but let React do the rendering - like it should do, by calling <code>.toReact()</code> on the object created by <strong>react-faux-dom</strong> and passed to d3 to be manipulated.</p>
    <p><a href={urlFromViewSourceOnGithub(sourcesOnGithub)} title="View source on github">View source code</a></p>
    <p>It is also fully <strong>responsive</strong>.</p>
  </div>
);

const ReactFauxDomStaticMultiLineChart = (props) => {
  return (
    <LifeExpectancy
      {...props}
      title={<span><Link to="/d3">d3</Link> / <Link to="/d3/react-faux-dom">react-faux-dom</Link> / StaticMultiLineChart</span>}
      prepareData={prepareDataLifeExpectancy}
      sourcesOnGithub={sourcesOnGithub}
      component={StaticMultiLineChart}
      panelSubText={panelSubText}
    />
  );
};

export default navigator()(ReactFauxDomStaticMultiLineChart);
