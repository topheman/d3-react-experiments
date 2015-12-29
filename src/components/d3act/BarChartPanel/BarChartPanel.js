import React from 'react';

import Chart from 'd3act';

import { d3actBarExtractMostPopularTechnologiesByYear } from '../../../resources/helper';

const barChartMostPopularTechnologiesByYear = {
  2015: d3actBarExtractMostPopularTechnologiesByYear(2015),
  2014: d3actBarExtractMostPopularTechnologiesByYear(2014),
  2013: d3actBarExtractMostPopularTechnologiesByYear(2013)
};

export default class d3actBarChartPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: '2015',
      data: barChartMostPopularTechnologiesByYear['2015'],
      size: (window && window.innerWidth < 700) ? 220 : 400
    };
  }

  changeYear(year) {
    this.setState({
      active: year,
      data: barChartMostPopularTechnologiesByYear[year]
    });
  }

  render() {
    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">BarChart - Most popular technologies (%)</div>
        <div className="panel-body text-center">
          <div className="btn-group" role="group">
            {Object.keys(barChartMostPopularTechnologiesByYear).sort((a, b) => b - a).map((year) => {
              let className = 'btn btn-default';
              className += this.state.active === year ? ' active' : '';
              return (<button key={year} type="button" className={className} onClick={() => {
                this.changeYear(year);
              }}>{year}</button>);
            })}
          </div>
          <Chart
            type={"bar"}
            width={this.state.size}
            height={this.state.size}
            margin={{ top: 40, right: 0, bottom: 40, left: 40 }}
            data={this.state.data}
          />
        </div>
      </div>
    );
  }

}
