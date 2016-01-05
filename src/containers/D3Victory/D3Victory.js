import React from 'react';

import { Link } from 'react-router';

import PieChartPanel from '../../components/victory/PieChartPanel/PieChartPanel';

const D3Victory = () => {
  return (
    <div>
      <ol className="breadcrumb">
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li><Link to="/d3" activeClassName="active">d3</Link></li>
        <li className="active">Victory</li>
      </ol>
      <p style={{marginTop: '10px'}}>In this part, I'll be using victory ...</p>
      <PieChartPanel/>
    </div>
  );
};

export default D3Victory;
