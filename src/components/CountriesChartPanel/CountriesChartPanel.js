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
    defaultTitle: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: [],
      title: props.defaultTitle
    };
  }

  render() {

    const { data, sourcesOnGithub } = this.props;
    console.log(data);

    const countryList = data.reduce((acc, cur) => {
      if (acc.indexOf(cur.Country) < 0) {
        acc.push(cur.Country);
      }
      return acc;
    }, []).sort((a, b) => a > b ? 1 : -1 );
    console.log(countryList);

    const { selectedCountries, title } = this.state;

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
        </div>
      </div>

    );

  }

}
