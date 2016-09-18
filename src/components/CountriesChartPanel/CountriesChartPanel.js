import React from 'react';

import { Select } from '../Select/Select';
import ViewSourceOnGithub from '../ViewSourceOnGithub/ViewSourceOnGithub';

export default class CountriesChartPanel extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    sourcesOnGithub: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),
    defaultTitle: React.PropTypes.string.isRequired,
    props: React.PropTypes.object, // props that will be injected as props into the component passed here
    component: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: [],
      title: props.defaultTitle
    };
  }

  render() {

    const { data, sourcesOnGithub, component: Chart, props = {} } = this.props;
    console.log(data);

    const countryList = data.reduce((acc, cur) => {
      if (acc.indexOf(cur.Country) < 0) {
        acc.push(cur.Country);
      }
      return acc;
    }, []).sort((a, b) => a > b ? 1 : -1 );
    console.log(countryList);

    const { selectedCountries, title } = this.state;

    // prepare data
    let minX = null;
    let maxX = null;
    let minY = null;
    let maxY = null;
    const chartData = data.reduce((acc, cur) => {
      // is the current line part of a selected country ?
      const selected = selectedCountries.reduce((accSelected, curSelected) => {
        if (curSelected.value === cur.Country) {
          return true;
        }
        return accSelected;
      }, false);
      // the current line is part of a selected country, add it to the final accumulator, format it like {x, y}
      if (selected) {
        acc[cur.Country] = acc[cur.Country] || [];
        minX = (minX === null || cur.Year < minX) ? cur.Year : minX;
        maxX = (maxX === null || cur.Year > maxX) ? cur.Year : maxX;
        minY = (minY === null || cur['Life Expectancy at Birth (both genders)'] < minY) ? cur['Life Expectancy at Birth (both genders)'] : minY;
        maxY = (maxY === null || cur['Life Expectancy at Birth (both genders)'] > maxY) ? cur['Life Expectancy at Birth (both genders)'] : maxY;
        acc[cur.Country].push({x: parseInt(cur.Year, 10), y: parseFloat(cur['Life Expectancy at Birth (both genders)'], 10)});
      }
      return acc;
    }, {});
    minX = parseInt(minX, 10);
    maxX = parseInt(maxX, 10);
    minY = parseFloat(minY, 10);
    maxY = parseFloat(maxY, 10);

    console.log('selectedCountries', selectedCountries, 'chartData', chartData);

    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">{title}</div>
        <ViewSourceOnGithub path={sourcesOnGithub}/>
        <div className="panel-body text-center">
          Data was loaded ({data.length}) lines.
          <Select
            multi
            value={selectedCountries}
            options={countryList.map(country => ({value: country, label: country}))}
            onChange={(currentCountries) => {
              this.setState({
                ...this.state,
                selectedCountries: currentCountries
              });
            }}/>
          <Chart
            {...props}
            minX={minX}
            maxX={maxX}
            minY={minY}
            maxY={maxY}
            data={chartData}/>
        </div>
      </div>

    );

  }

}
