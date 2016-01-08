import React from 'react';

import { Link } from 'react-router';

import WorldPopulationSexRatio from '../../components/victory/WorldPopulationSexRatio/WorldPopulationSexRatio';

const D3Victory = () => {
  return (
    <div>
      <ol className="breadcrumb">
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li><Link to="/d3" activeClassName="active">d3</Link></li>
        <li className="active">Victory</li>
      </ol>
      <p style={{marginTop: '10px'}}>In this part, I'll be using victory ...</p>
      <WorldPopulationSexRatio/>
    </div>
  );
};

export default D3Victory;
