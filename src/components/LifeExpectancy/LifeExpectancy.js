/**
 * This component is meant to be wrapped by a HOC
 * that way, I can produce many pages with all this managing system of data loading
 * the Select algo being also encapsulated in this LifeExpectancy HOC
 */

import React from 'react';

import CountriesChartPanel from '../../components/CountriesChartPanel/CountriesChartPanel';
import { asyncLoadLifeExpectancy } from '../../resources/loaders';
import { injectWindowInfos } from '../../components/WindowInfos';

// decorating this component so that it will receive windowWidth, windowHeight in its props (passed down from the WindowInfos.Provider)
const WindowAwareCountriesChartPanel = injectWindowInfos()(CountriesChartPanel);

class LifeExpectancy extends React.Component {

  static propTypes = {
    title: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string
    ]).isRequired,
    prepareData: React.PropTypes.func.isRequired,
    sourcesOnGithub: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ]).isRequired,
    component: React.PropTypes.func.isRequired,
    panelSubText: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.string
    ])
  }

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
    const { title, prepareData, sourcesOnGithub, component, panelSubText } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        {!ready && !error && <p>Loading ...</p>}
        {!ready && error && <div className="alert alert-danger" onClick={this.loadData} style={{cursor: 'pointer'}}>
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {' '}An error occured while loading data - Click here to retry
        </div>}
        {ready && !error && <WindowAwareCountriesChartPanel
          title="Life Expectancy"
          data={data}
          prepareData={prepareData}
          sourcesOnGithub={sourcesOnGithub}
          props={{}}
          component={component}
          panelSubText={panelSubText}/>}
        <p>Data comes from <a href="https://ourworldindata.org/life-expectancy/" title="ourworldindata.org">ourworldindata.org</a></p>
      </div>
    );
  }

}

export default LifeExpectancy;
