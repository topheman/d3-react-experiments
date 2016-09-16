import React from 'react';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';
import Chart from 'd3act';

export default class d3actBarChartPanel extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  constructor({data}) {
    super();
    const defaultActiveYear = Object.keys(data).sort((a, b) => a < b)[0];
    this.state = {
      active: defaultActiveYear,
      data: data[defaultActiveYear],
      size: (window && window.innerWidth < 700) ? 220 : 400
    };
  }

  changeYear(year) {
    const { data } = this.props;
    this.setState({
      active: year,
      data: data[year]
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">BarChart - Most popular technologies (%) - <strong>year {this.state.active}</strong></div>
        <ViewSourceOnGithub path="/src/components/d3act/BarChartPanel/BarChartPanel.js"/>
        <div className="panel-body text-center">
          <div className="btn-group" role="group">
            {Object.keys(data).sort((a, b) => b - a).map((year) => {
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
          <div className="btn-group" role="group">
            {Object.keys(data).sort((a, b) => b - a).map((year) => {
              let className = 'btn btn-default';
              className += this.state.active === year ? ' active' : '';
              return (<button key={year} type="button" className={className} onClick={() => {
                this.changeYear(year);
              }}>{year}</button>);
            })}
          </div>
        </div>
      </div>
    );
  }

}
