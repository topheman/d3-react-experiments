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
    defaultSelectedCountries: React.PropTypes.array,
    // injected by injectWindowInfos
    windowWidth: React.PropTypes.number,
    windowHeight: React.PropTypes.number
  }

  constructor({ defaultSelectedCountries = ['Algeria', 'Ethiopia', 'France', 'Germany', 'India'] }) {
    super();
    this.state = {
      selectedCountries: defaultSelectedCountries.map(country => ({label: country, value: country}))
    };
  }

  render() {

    const { title, data, sourcesOnGithub, component: Chart, prepareData, props = {}, windowWidth } = this.props;
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
      <div className="panel panel-default bar-chart-panel" ref={node => this.rootNode = node}>
        <div className="panel-heading">{title}{selectedCountries.length > 0 ? <span> from <strong>{chartData.minX}</strong> to <strong>{chartData.maxX}</strong></span> : null}</div>
        <ViewSourceOnGithub path={sourcesOnGithub}/>
        <div className="panel-body text-center">
          <p>Add / Remove any country from the list.</p>
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
            width={windowWidth > 700 ? 630 : windowWidth - 70}
            {...chartData}/>
          <div className="text-left">
            <p>
              This chart is a React Component with home-made d3. As you'll see in the <a href="https://github.com/topheman/d3-react-experiments/blob/master/src/components/d3/StaticMultiLineChart/StaticMultiLineChart.js" title="View source on github">source code</a>, it's nearly a simple copy/paste from <a href="https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f" title="See example from bl.ocks.org">bl.ocks.org</a> of regular d3 code, which works out of the box in React ...
            </p>
            <p>It is also fully responsive.</p>
          </div>
        </div>
      </div>

    );

  }

}
