import React from 'react';

import navigator from '../../components/Navigator/injectNavigator';
import ViewSourceOnGithub from '../../components/ViewSourceOnGithub/ViewSourceOnGithub';
import { Link } from 'react-router';
import { injectWindowInfos } from '../../components/WindowInfos';
import { Select } from '../../components/Select';

import { bulkLoadNpmLastDownloadsInMonth } from '../../resources/loaders';
import CountNpmDownloadsChart from '../../components/victory/CountNpmDownloadsChart/CountNpmDownloadsChart';

const windowBreakpoint = 750;

const npmPackagesConfigs = {
  'd3 / react': {
    '*': ['d3'],
    'd3': ['victory', 'react-d3']
  },
  'Package managers': {
    '*': ['npm', 'bower', 'jspm', 'yarn'],
    'npm': ['bower', 'jspm', 'yarn']
  },
  'Task runners': {
    '*': ['gulp', 'grunt']
  },
  'Test *': {
    '*': ['karma', 'mocha', 'chai', 'jasmine']
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
      npmPackagesConfigsSelector: Object.keys(npmPackagesConfigs)[0]
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
    const choices = (
      <Select
        clearable={false}
        autoBlur
        value={npmPackagesConfigsSelector}
        options={Object.keys(npmPackagesConfigs).map((configKey) => ({
          value: configKey,
          label: configKey
        }))}
        onChange={({ value }) => this.onChangeNpmPackagesConfigsSelector(value)}
      />
    );
    return (
      <div>
        <h2><Link to="/victory">Victory</Link> / DualAxisMultiLine</h2>
        {!ready && error && <div className="alert alert-danger" onClick={() => this.loadData(false)} style={{cursor: 'pointer'}}>
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {' '}An error occured while loading data - Click here to retry
        </div>}
        <div className="panel panel-default">
          <div className="panel-heading">Npm downloads{period ? <span> - from <strong>{period.from}</strong> to <strong>{period.to}</strong></span> : null}</div>
          <ViewSourceOnGithub path="/src/components/victory/CountNpmDownloadsChart/CountNpmDownloadsChart.js"/>
          <div className="panel-body text-center">
            <p>Pick a category to compare package downloads from last month. Data is comming from the npm registry.</p>
            {choices}
          </div>
          {!ready && !error && <p className="text-center">Loading ...</p>}
          {ready && !error && <div className="panel-body text-center" style={{ paddingBottom: '0px' }}>
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
          <div className="panel-body text-center" style={{ paddingTop: '0px' }}>
            {choices}
            <div className="text-left panel-subtext" style={{ paddingTop: '10px' }}>
              <p>This chart is a React Component based on <code>VictoryAxis</code> and <code>VictoryLine</code> from <a href="https://formidable.com/open-source/victory/" title="Victory home page">Victory</a>, a collection of composable React components for building interactive data visualizations.</p>
              <p>It is an example of some <strong>more advanced charts</strong> you can produce with that library by <strong>composing its components and benefit from React's state management and JSX declarative syntax</strong>.</p>
              <ul>
                <li>It's fully responsive</li>
                <li>It's interactive:<ul>
                  <li>Mouse: hover lines or legends to highlight relevent data + display contextual infos</li>
                  <li>Touch: touch lines or legends to highlight relevent data</li>
                </ul></li>
                <li>Data is retrieved from the npm registry's API</li>
                <li>A simple config will create all the charts</li>
              </ul>
              <p>See how the downloads drop on weekends ? ;)</p>
            </div>
          </div>
        </div>
        <p>Data comes from <a href="https://docs.npmjs.com/misc/registry" title="npm-registry">npm-registry</a> - <a href="https://chbrown.github.io/docs/npm" title="registry docs">see chbrown docs</a></p>
      </div>
    );
  }

}

export default navigator()(injectWindowInfos()(VictoryCountNpmDownloads));
