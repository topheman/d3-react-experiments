import React from 'react';

import { Link } from 'react-router';

import BarChartPanel from '../../components/d3act/BarChartPanel/BarChartPanel';
import PieChartPanel from '../../components/d3act/PieChartPanel/PieChartPanel';

export default class D3D3Act extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb">
          <li><Link to="/" activeClassName="active">Home</Link></li>
          <li><Link to="/d3" activeClassName="active">d3</Link></li>
          <li className="active">d3act</li>
        </ol>
        <p style={{marginTop: '10px'}}>Todo: some introduction on d3act ...</p>
        <BarChartPanel/>
        <PieChartPanel/>
      </div>
    );
  }
}
