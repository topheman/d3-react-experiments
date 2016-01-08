import React from 'react';

import Slider from '../../Slider/Slider';

export default class WorldPopulationSexRatio extends React.Component {

  constructor(props) {
    super(props);
    this.defaultValues = {
      year: 2015,
      innerRadius: 0,
      yearPlayingInterval: 1000
    };
    this.state = {
      ...this.defaultValues
    };
  }

  updateYear(year) {
    this.setState({
      ...this.state,
      year
    });
  }

  updateYearPlayingInterval(yearPlayingInterval) {
    this.setState({
      ...this.state,
      yearPlayingInterval
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
        <div className="panel-heading">World population 2010-2034 - sex ratio</div>
        <div className="panel-body text-center">
          <Slider min={2010} max={2034} step={1} defaultValue={this.defaultValues.year} label="Year: %value" update={this.updateYear.bind(this)} showPlayButton playing playingInterval={this.state.yearPlayingInterval}/>
          <Slider min={20} max={2000} step={10} defaultValue={1000} label="Refresh: 1/%valuems" update={this.updateYearPlayingInterval.bind(this)}/>
          <Slider min={0} max={60} step={1} defaultValue={this.defaultValues.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius.bind(this)}/>
        </div>
      </div>
    );
  }

}
