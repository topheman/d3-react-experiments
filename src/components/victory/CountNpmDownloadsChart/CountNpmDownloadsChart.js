import React from 'react';

import ColorHash from 'color-hash';

import { VictoryChart, VictoryAxis } from 'victory';

const colorHash = new ColorHash();

const processMain = (main) => {
  const minX = new Date(main.data.start);
  const maxX = new Date(main.data.end);
  const minY = 0;
  let maxY = 0;
  const label = {
    name: main.name,
    color: 'black'
  };
  const data = main.data.downloads.map(info => {
    maxY = info.downloads > maxY ? info.downloads : maxY;
    return {
      x: new Date(info.day),
      y: info.downloads
    };
  });
  return {
    minX,
    maxX,
    minY,
    maxY,
    line: {
      label,
      data
    }
  };
};

const processDependencies = (dependencies) => {
  let maxY = 0;
  const lines = dependencies.map(dependency => {
    const label = {
      name: dependency.name,
      color: 'blue'
    };
    const data = dependency.data.downloads.map(info => {
      maxY = info.downloads > maxY ? info.downloads : maxY;
      return {
        x: new Date(info.day),
        y: info.downloads
      };
    });
    return {
      label,
      data
    };
  });
  return {
    maxY,
    lines
  };
};

const processData = ({main, dependencies}) => {
  return {
    main: processMain(main),
    dependencies: processDependencies(dependencies)
  };
};

const CountNpmDownloadsChart = (props) => {
  const {width, height, margin: padding, main, dependencies, dependenciesScale, style} = props;
  const animationDuration = 200;
  const processedData = processData({main, dependencies});
  console.log('processedData', processedData, 'dependenciesScale', dependenciesScale);
  console.log(processedData.dependencies.maxY, processedData.main.maxY);

  const tickStyle = {
    ticks: {
      size: 6,
      stroke: 'black'
    },
    tickLabels: {
      fontSize: '10px',
      fontFamily: 'inherit'
    }
  };

  return (
    <div style={{
      width: width,
      margin: '0',
      ...style
    }}>
      <div className="panel panel-default">
        <div className="panel-body">
          <VictoryChart
            width={width}
            height={height}
            padding={padding}
            animate={{duration: animationDuration}}
          >
            <VictoryAxis
              dependentAxis
              orientation="left"
              domain={[0, processedData.dependencies.maxY]}
              style={tickStyle}
            />
          </VictoryChart>
          <p style={{color: colorHash.hex(processedData.main.line.label.name)}}><span className="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span> {processedData.main.line.label.name}</p>
          <ul className="list-unstyled list-inline">
            {processedData.dependencies.lines.map((line, index) => (
              <li key={index} style={{color: colorHash.hex(line.label.name)}}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span> {line.label.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

CountNpmDownloadsChart.propTypes = {
  style: React.PropTypes.object,
  margin: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  main: React.PropTypes.object.isRequired,
  dependencies: React.PropTypes.array.isRequired,
  dependenciesScale: React.PropTypes.number
};

CountNpmDownloadsChart.defaultProps = {
  margin: {
    top: 20,
    right: 100,
    bottom: 30,
    left: 100
  },
  width: 700,
  height: 400,
  dependenciesScale: 0.8
};

export default CountNpmDownloadsChart;
