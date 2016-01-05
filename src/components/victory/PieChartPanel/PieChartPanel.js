import React from 'react';

import Slider from '../../Slider/Slider';

export default class victoryPieChartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: 2015,
      innerRadius: 0
    };
  }

  updateYear(year) {
    this.setState({
      ...this.state,
      year
    });
  }

  updateInnerRadius(innerRadius) {
    this.setState({
      ...this.state,
      innerRadius
    });
  }

  render() {
    return (
      <div className="panel panel-default pie-chart-panel">
        <div className="panel-heading">PieChart - World population 2010-2035</div>
        <div className="panel-body text-center">
          <Slider min={2010} max={2035} step={1} originalValue={this.state.year} label="Year: %value" update={this.updateYear.bind(this)}/>
          <Slider min={0} max={60} step={1} originalValue={this.state.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius.bind(this)}/>
        </div>
      </div>
    );
  }

}
