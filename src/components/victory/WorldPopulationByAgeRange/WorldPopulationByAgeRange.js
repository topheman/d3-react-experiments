import React from 'react';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';
import Slider from '../../Slider/Slider';
import {VictoryPie} from 'victory-pie';
import {VictoryBar} from 'victory-bar';

import { victoryWorldPopulationByAgeRange, victoryLabelWorldPopulationByAgeRange } from '../../../resources/helper';
const piePopulationByAgeRangeByYear = victoryWorldPopulationByAgeRange('pie');
const barPopulationByAgeRangeByYear = victoryWorldPopulationByAgeRange('bar');
const barLabelPopulationByAgeRangeByYear = victoryLabelWorldPopulationByAgeRange();

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
      barData: barPopulationByAgeRangeByYear(year),
      barLabel: barLabelPopulationByAgeRangeByYear(year),
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
          <div className="row">
            <div className="col-md-12">
              <Slider min={2010} max={2034} step={1} defaultValue={this.defaultValues.year} label="Year: %value" update={this.updateYear.bind(this)} showPlayButton playing playingInterval={this.state.yearPlayingInterval}/>
              <Slider min={20} max={2000} step={10} defaultValue={1000} label="Refresh: 1/%valuems" update={this.updateYearPlayingInterval.bind(this)}/>
              <Slider min={0} max={80} step={1} defaultValue={this.defaultValues.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius.bind(this)}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <VictoryPie
                style={{
                  labels: {
                    fill: 'black',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }
                }}
                colorScale={[
                  '#F66D3B',
                  '#D92E1D',
                  '#FFAF59'
                ]}
                width={this.state.size}
                height={this.state.size}
                innerRadius={this.state.innerRadius}
                data={this.state.pieData}/>
            </div>
            <div className="col-md-6">
              <VictoryBar
                style={{
                  data: {width: this.state.size / 6, fill: '#900000'},
                  labels: {fontSize: 14}
                }}
                padding={70}
                domain={{y: [0, 6000000000]}}
                width={this.state.size}
                height={this.state.size}
                labels={this.state.barLabel}
                data={this.state.barData}/>
            </div>
          </div>
          <p>World population distribution by age range 2010-2034 - <strong>year {this.state.year}</strong></p>
        </div>
      </div>
    );
  }

}
