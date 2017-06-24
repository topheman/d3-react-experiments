import React from 'react';
import { VictoryBar, VictoryPie } from 'victory';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';
import Slider from '../../Slider/Slider';

export default class WorldPopulation extends React.Component {

  static propTypes = {
    labelColorConfig: React.PropTypes.array.isRequired,
    compilePieData: React.PropTypes.func.isRequired,
    compileBarData: React.PropTypes.func.isRequired,
    getBarLabelByYear: React.PropTypes.func.isRequired
  }

  constructor({ compilePieData, compileBarData, labelColorConfig }) {
    super();
    this.pieData = compilePieData(labelColorConfig);
    this.barData = compileBarData(labelColorConfig);
    this.pieColorScale = labelColorConfig.map(info => info.fill);
    this.defaultValues = {
      year: 2015,
      innerRadius: 0,
      yearPlayingInterval: 1000,
      size: (window && window.innerWidth < 700) ? 250 : 400
    };
    this.state = {
      ...this.defaultValues
    };
    this.updateYear = this.updateYear.bind(this);
    this.updateYearPlayingInterval = this.updateYearPlayingInterval.bind(this);
    this.updateInnerRadius = this.updateInnerRadius.bind(this);
  }

  updateYear(year) {
    this.setState({
      ...this.state,
      pieData: this.pieData(year),
      barData: this.barData(year),
      barLabel: this.props.getBarLabelByYear(year),
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
    const { labelColorConfig } = this.props;
    return (
      <div className="panel panel-default pie-chart-panel">
        <div className="panel-heading">World population 2010-2034 by age range - <strong>year {this.state.year}</strong></div>
        <ViewSourceOnGithub path="/src/components/victory/WorldPopulationByAgeRange/WorldPopulationByAgeRange.js" />
        <div className="panel-body text-center">
          <div className="row">
            <div className="col-md-8">
              <Slider min={2010} max={2034} step={1} defaultValue={this.defaultValues.year} label="Year: %value" update={this.updateYear} showPlayButton playing playingInterval={this.state.yearPlayingInterval} />
              <Slider min={20} max={2000} step={10} defaultValue={1000} label="Refresh: 1/%valuems" update={this.updateYearPlayingInterval} />
              <Slider min={0} max={80} step={1} defaultValue={this.defaultValues.innerRadius} label="InnerRadius: %valuepx" update={this.updateInnerRadius} />
            </div>
            <div className="col-md-4" style={{ paddingTop: '20px' }}>
              {labelColorConfig.map((info) => (
                <span key={info.label} style={{ padding: '0px 5px' }}>
                  <span className="glyphicon glyphicon-stop" style={{ color: info.fill }} /> {info.label}
                </span>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div style={{ width: this.state.size, marginLeft: 'auto', marginRight: 'auto' }}>
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
                  colorScale={this.pieColorScale}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ width: this.state.size, marginLeft: 'auto', marginRight: 'auto' }}>
                <VictoryBar
                  style={{
                    data: { width: this.state.size / 6, fill: '#900000' },
                    labels: {
                      fill: 'black',
                      fontSize: '12px',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }
                  }}
                  padding={70}
                  domain={{ y: [0, 6000000000] }}
                  width={this.state.size}
                  height={this.state.size}
                  labels={this.state.barLabel}
                  data={this.state.barData}
                />
              </div>
            </div>
          </div>
          <p>World population distribution by age range 2010-2034 - <strong>year {this.state.year}</strong></p>
        </div>
      </div>
    );
  }

}
