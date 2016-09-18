import React from 'react';

import navigator from '../../utils/react/navigator';
import CountriesAdvancedChart from '../../components/CountriesChartPanel/CountriesChartPanel';
import { asyncLoadLifeExpectancy } from '../../resources/loaders';

class D3LifeExpectancy extends React.Component {

  constructor() {
    super();
    this.state = {
      ready: false,
      error: false
    };
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      ...this.state,
      ready: false,
      error: false
    });
    asyncLoadLifeExpectancy()
      .then(data => {
        this.setState({
          ...this.state,
          ready: true,
          data: data
        });
      })
      .catch(e => {
        this.setState({
          ...this.state,
          error: true,
          data: null
        });
        console.error('An error occured while loading data', e);
      });
  }

  render() {
    const { ready, error, data } = this.state;
    return (
      <div>
        <h2>D3 (Vanilla)</h2>
        {!ready && !error && <p>Loading ...</p>}
        {!ready && error && <div className="alert alert-danger" onClick={this.loadData} style={{cursor: 'pointer'}}>
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {' '}An error occured while loading data - Click here to retry
        </div>}
        {ready && !error && <CountriesAdvancedChart
          defaultTitle="Life Expectancy"
          data={data}
          sourcesOnGithub={{
            container: '/src/containers/D3LifeExpectancy/D3LifeExpectancy.js',
            component: '/src/components/CountriesChartPanel/CountriesChartPanel.js'
          }}/>}
        <p>Data comes from <a href="https://ourworldindata.org/life-expectancy/" title="ourworldindata.org">ourworldindata.org</a></p>
      </div>
    );
  }

}

export default navigator()(D3LifeExpectancy);
