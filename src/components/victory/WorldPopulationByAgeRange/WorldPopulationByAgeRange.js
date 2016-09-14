import React from 'react';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';
import Slider from '../../Slider/Slider';
import {VictoryPie} from 'victory-pie';
import {VictoryBar} from 'victory-bar';

import { victoryWorldPopulationByAgeRange, victoryLabelWorldPopulationByAgeRange, victoryLabelSetupPopulationByAgeRange } from '../../../resources/helper';

const labelSetup = victoryLabelSetupPopulationByAgeRange();
const piePopulationByAgeRangeByYear = victoryWorldPopulationByAgeRange('pie', labelSetup);
const piePopulationByAgeRangeByYearColorScale = labelSetup.map(info => info.fill);
const barPopulationByAgeRangeByYear = victoryWorldPopulationByAgeRange('bar', labelSetup);
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
            <div className="col-md-8">
              <Slider min={2010} max={2034} step={1} defaultValue={this.defaultValues.year} label="Year: %value" update={this.updateYear.bind(this)} showPlayButton playing playingInterval={this.state.yearPlayingInterval}/>
              <Slider min={20} max={2000} step={10} defaultValue={1000} label="Refresh: 1/%valuems" update={this.updateYearPlayingInterval.bind(this)}/>
              <Slider min={0} max={80} step={1} defaultValue={this.defaultValues.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius.bind(this)}/>
            </div>
            <div className="col-md-4" style={{paddingTop: '20px'}}>
              {labelSetup.map((info, index) => (
                <span key={index} style={{padding: '0px 5px'}}>
                  <span className="glyphicon glyphicon-stop" style={{color: info.fill}}></span> {info.label}
                </span>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div style={{width: this.state.size, marginLeft: 'auto', marginRight: 'auto'}}>
                <VictoryPie
                  style={{
                    labels: {
                      fill: 'black',
                      fontSize: '12px',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }
                  }}
                  width={this.state.size}
                  height={this.state.size}
                  labelRadius={this.state.size / 5}
                  innerRadius={this.state.innerRadius}
                  data={this.state.pieData}
                  colorScale={piePopulationByAgeRangeByYearColorScale}/>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{width: this.state.size, marginLeft: 'auto', marginRight: 'auto'}}>
                <VictoryBar
                  style={{
                    data: {width: this.state.size / 6, fill: '#900000'},
                    labels: {
                      fill: 'black',
                      fontSize: '12px',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }
                  }}
                  padding={70}
                  domain={{y: [0, 6000000000]}}
                  width={this.state.size}
                  height={this.state.size}
                  labels={this.state.barLabel}
                  data={this.state.barData}/>
              </div>
            </div>
          </div>
          <p>World population distribution by age range 2010-2034 - <strong>year {this.state.year}</strong></p>
        </div>
      </div>
    );
  }

}
