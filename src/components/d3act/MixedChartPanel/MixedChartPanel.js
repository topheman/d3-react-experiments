import React from 'react';
import Chart from 'd3act';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';

export default class d3actPieChartPanel extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  constructor({ data }) {
    super();
    const defaultActiveYear = Object.keys(data).sort((a, b) => a < b)[0];
    this.state = {
      active: defaultActiveYear,
      pieData: data[defaultActiveYear].pie,
      barData: data[defaultActiveYear].bar,
      size: (window && window.innerWidth < 700) ? 220 : 400
    };
  }

  changeYear(year) {
    const { data } = this.props;
    this.setState({
      active: year,
      pieData: data[year].pie,
      barData: data[year].bar
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div className="panel panel-default pie-chart-panel">
        <div className="panel-heading">PieChart - Desktop Operating System (%) - <strong>year {this.state.active}</strong></div>
        <ViewSourceOnGithub path="/src/components/d3act/MixedChartPanel/MixedChartPanel.js" />
        <div className="panel-body text-center">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group" role="group">
                {Object.keys(data).sort((a, b) => b - a).map((year) => {
                  let className = 'btn btn-default';
                  className += this.state.active === year ? ' active' : '';
                  return (<button
                    key={year}
                    type="button"
                    className={className}
                    onClick={() => {
                      this.changeYear(year);
                    }}
                  >{year}</button>);
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" style={{ position: 'static' }}>
              <Chart
                type={'pie'}
                width={this.state.size}
                height={this.state.size}
                data={this.state.pieData}
              />
            </div>
            <div className="col-md-6" style={{ position: 'static' }}>
              <Chart
                type={'bar'}
                margin={{ top: 40, right: 0, bottom: 40, left: 40 }}
                width={this.state.size}
                height={this.state.size}
                data={this.state.barData}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="btn-group" role="group">
                {Object.keys(data).sort((a, b) => b - a).map((year) => {
                  let className = 'btn btn-default';
                  className += this.state.active === year ? ' active' : '';
                  return (<button
                    key={year}
                    type="button"
                    className={className}
                    onClick={() => {
                      this.changeYear(year);
                    }}
                  >{year}</button>);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
