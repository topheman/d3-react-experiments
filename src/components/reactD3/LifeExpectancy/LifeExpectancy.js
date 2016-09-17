import React from 'react';

import { Select } from '../../Select/Select';
import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';

export default class LifeExpectancy extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: []
    };
  }

  render() {

    const { data } = this.props;
    console.log(data);

    const countryList = data.reduce((acc, cur) => {
      if (acc.indexOf(cur.Country) < 0) {
        acc.push(cur.Country);
      }
      return acc;
    }, []).sort((a, b) => a > b ? 1 : -1 );
    console.log(countryList);

    const { selectedCountries } = this.state;

    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">Life expectancy, <strong>YYYY</strong> to <strong>YYYY</strong></div>
        <ViewSourceOnGithub path="/src/components/reactD3/LifeExpectancy/LifeExpectancy.js"/>
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
