import React from 'react';

import navigator from '../../utils/react/navigator';
import LifeExpectancy from '../../components/reactD3/LifeExpectancy/LifeExpectancy';

const ReactD3LifeExpectancy = () => (
  <div>
    <h2>React D3</h2>
    <LifeExpectancy/>
    <p>Data comes from <a href="https://ourworldindata.org/life-expectancy/" title="ourworldindata.org">ourworldindata.org</a></p>
  </div>
);

export default navigator()(ReactD3LifeExpectancy);
