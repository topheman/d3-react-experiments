import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import ViewSourceOnGithub from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';
import { Link } from 'react-router';
import { injectWindowInfos } from '../../components/WindowInfos';

import { bulkLoadNpmLastDownloadsInMonth } from '../../resources/loaders';
import CountNpmDownloadsChart from '../../components/victory/CountNpmDownloadsChart/CountNpmDownloadsChart';

const windowBreakpoint = 750;

const npmPackagesConfigs = {
  'd3': {
    '*': ['d3'],
    'd3': ['victory', 'react-d3']
  },
  'Task runners': {
    '*': ['gulp', 'grunt']
  }
};

const getTitleFromPackageId = (packageId) => packageId === '*' ? 'All npm packages' : packageId;

const flattenNpmPackagesConfig = (npmPackagesConfig) => {
  return Object.keys(npmPackagesConfig).reduce((acc, currentKey) => {
    if (acc.indexOf(currentKey) < 0) {
      acc.push(currentKey);
    }
    npmPackagesConfig[currentKey].forEach(packageName => {
      if (acc.indexOf(packageName) < 0) {
        acc.push(packageName);
      }
    });
    return acc;
  }, []);
};

const processData = (npmPackagesConfig, data) => {
  return Object.keys(npmPackagesConfig).reduce((acc, currentKey) => {
    const mainPackage = {
      name: getTitleFromPackageId(currentKey),
      data: data[currentKey]
    };
    const dependentPackages = npmPackagesConfig[currentKey].map(packageName => {
      return {
        name: getTitleFromPackageId(packageName),
        data: data[packageName]
      };
    });
    acc.push({
      mainPackage,
      dependentPackages
    });
    return acc;
  }, []);
};

class VictoryCountNpmDownloads extends React.Component {

  static propTypes = {
    // injected by injectWindowInfos
    windowWidth: React.PropTypes.number,
    windowHeight: React.PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      ready: false,
      error: false,
      npmPackagesConfigsSelector: 'd3'
    };
  }

  componentDidMount() {
    this.loadData();
  }

  onChangeNpmPackagesConfigsSelector(npmPackagesConfigsSelector) {
    if (npmPackagesConfigsSelector !== this.state.npmPackagesConfigsSelector) {
      this.loadData(npmPackagesConfigsSelector);
    }
  }

  loadData(forcedNpmPackagesConfigsSelector) {
    let npmPackagesConfigsSelector;
    const { npmPackagesConfigsSelector: originalNpmPackagesConfigsSelector } = this.state;
    if (forcedNpmPackagesConfigsSelector) {
      npmPackagesConfigsSelector = forcedNpmPackagesConfigsSelector;
    }
    else {
      npmPackagesConfigsSelector = originalNpmPackagesConfigsSelector;
    }
    this.setState({
      ...this.state,
      ready: false,
      error: false,
      npmPackagesConfigsSelector
    });
    bulkLoadNpmLastDownloadsInMonth(flattenNpmPackagesConfig(npmPackagesConfigs[npmPackagesConfigsSelector]))
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
    const { windowWidth } = this.props;
    const { ready, error, data, npmPackagesConfigsSelector } = this.state;
    const processedData = data ? processData(npmPackagesConfigs[npmPackagesConfigsSelector], data) : null;
    console.log('>processedData', processedData);
    let period = null;
    if (processedData) {
      period = {
        from: (new Date(processedData[0].mainPackage.data.start)).toDateString(),
        to: (new Date(processedData[0].mainPackage.data.end)).toDateString()
      };
    }
    const links = (
      <ul className="list-unstyled list-inline" style={{textAlign: 'center', marginTop: '10px'}}>
        {Object.keys(npmPackagesConfigs).map((configKey, index) => (
          <li key={index}>
            <button onClick={() => this.onChangeNpmPackagesConfigsSelector(configKey)} className={`btn btn-default${npmPackagesConfigsSelector === configKey ? ' active' : ''}`}>
              {configKey}
            </button>
          </li>
        ))}
      </ul>
    );
    return (
      <div>
        <h2><Link to="/victory">Victory</Link> / MixedAxisMultiLine</h2>
        {!ready && error && <div className="alert alert-danger" onClick={this.loadData} style={{cursor: 'pointer'}}>
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {' '}An error occured while loading data - Click here to retry
        </div>}
        <div className="panel panel-default">
          <div className="panel-heading">Npm downloads{period ? <span> - from <strong>{period.from}</strong> to <strong>{period.to}</strong></span> : null}</div>
          <ViewSourceOnGithub path="/src/components/victory/MixedAxisMultiLine/MixedAxisMultiLine.js"/>
          {links}
          {!ready && !error && <p className="text-center">Loading ...</p>}
          {ready && !error && <div className="panel-body text-center">
            {processedData && processedData.map((dataForIndividualChart, key) => {
              return (
                <CountNpmDownloadsChart
                  key={key}
                  style={{
                    display: 'inline-block'
                  }}
                  width={windowWidth > windowBreakpoint ? (windowBreakpoint - 90) : windowWidth - 90}
                  main={dataForIndividualChart.mainPackage}
                  dependencies={dataForIndividualChart.dependentPackages}
                />
              );
            })}
          </div>}
          {links}
        </div>
        <p>Data comes from <a href="https://docs.npmjs.com/misc/registry" title="npm-registry">npm-registry</a> - <a href="https://chbrown.github.io/docs/npm" title="registry docs">see chbrown docs</a></p>
      </div>
    );
  }

}

export default navigator()(injectWindowInfos()(VictoryCountNpmDownloads));
