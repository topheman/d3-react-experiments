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
    title: React.PropTypes.string.isRequired,
    props: React.PropTypes.object, // props that will be injected as props into the component passed here
    prepareData: React.PropTypes.func.isRequired, // callback that will process the data (data, countryList) => {"France": [{x: 50, y: 1950}]}
    component: React.PropTypes.func.isRequired,
    defaultSelectedCountries: React.PropTypes.array
  }

  constructor({ defaultSelectedCountries = ['Algeria', 'Ethiopia', 'France', 'Germany', 'India'] }) {
    super();
    this.state = {
      selectedCountries: defaultSelectedCountries.map(country => ({label: country, value: country}))
    };
  }

  render() {

    const { title, data, sourcesOnGithub, component: Chart, prepareData, props = {} } = this.props;
    console.log(data);

    const countryList = data.reduce((acc, cur) => {
      if (acc.indexOf(cur.Country) < 0) {
        acc.push(cur.Country);
      }
      return acc;
    }, []).sort((a, b) => a > b ? 1 : -1 );
    console.log(countryList);

    const { selectedCountries } = this.state;

    // prepare data
    const chartData = prepareData(data, selectedCountries.map(country => country.value || country));

    console.log('selectedCountries', selectedCountries, 'chartData', chartData);

    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">{title}{selectedCountries.length > 0 ? <span> from <strong>{chartData.minX}</strong> to <strong>{chartData.maxX}</strong></span> : null}</div>
        <ViewSourceOnGithub path={sourcesOnGithub}/>
        <div className="panel-body text-center">
          <Select
            multi
            value={selectedCountries}
            options={countryList.map(country => ({value: country, label: country}))}
            onChange={(currentCountries) => {
              this.setState({
                ...this.state,
                selectedCountries: currentCountries
              });
            }}
            style={{
              marginTop: '20px'
            }}/>
          <Chart
            {...props}
            {...chartData}/>
        </div>
      </div>

    );

  }

}
