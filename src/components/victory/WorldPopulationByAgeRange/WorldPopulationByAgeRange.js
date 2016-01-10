import React from 'react';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';
import Slider from '../../Slider/Slider';
import {VictoryPie} from 'victory-pie';

import { victoryPieWorldPopulationByAgeRange } from '../../../resources/helper';
const piePopulationByAgeRangeByYear = victoryPieWorldPopulationByAgeRange();

export default class WorldPopulation extends React.Component {

  constructor(props) {
    super(props);
    this.defaultValues = {
      year: 2015,
      innerRadius: 0,
      yearPlayingInterval: 1000,
      size: (window && window.innerWidth < 700) ? 250 : 400
    };
    this.state = {
      ...this.defaultValues
    };
  }

  updateYear(year) {
    this.setState({
      ...this.state,
      pieData: piePopulationByAgeRangeByYear(year),
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
        <div className="panel-heading">World population 2010-2034 by age range - <strong>year {this.state.year}</strong></div>
        <ViewSourceOnGithub path="/src/components/victory/WorldPopulationByAgeRange/WorldPopulationByAgeRange.js"/>
        <div className="panel-body text-center">
          <Slider min={2010} max={2034} step={1} defaultValue={this.defaultValues.year} label="Year: %value" update={this.updateYear.bind(this)} showPlayButton playing playingInterval={this.state.yearPlayingInterval}/>
          <Slider min={20} max={2000} step={10} defaultValue={1000} label="Refresh: 1/%valuems" update={this.updateYearPlayingInterval.bind(this)}/>
          <Slider min={0} max={80} step={1} defaultValue={this.defaultValues.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius.bind(this)}/>
          <VictoryPie
            style={{
              labels: {
                fill: 'black',
                fontSize: 12,
                fontWeight: 'bold'
              }
            }}
            width={this.state.size}
            height={this.state.size}
            innerRadius={this.state.innerRadius}
            data={this.state.pieData}/>
          <p>World population distribution by age range 2010-2034 - <strong>year {this.state.year}</strong></p>
        </div>
      </div>
    );
  }

}
