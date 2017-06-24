import React from 'react';

import ColorHash from 'color-hash';

import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

const colorHash = new ColorHash();

const TransitionMultiLineChart = (props) => {
  const { width, height, margin: padding, maxY, minX, maxX, data } = props;
  const lineIds = Object.keys(data);
  const animationDuration = 200;
  const xAxisTickCount = width > 500 ? parseInt(width / 80, 10) : 4;
  const yAxisTickCount = parseInt(maxY / 10, 10);
  console.log('xAxisTickCount', xAxisTickCount, 'yAxisTickCount', yAxisTickCount);
  const xDomain = [minX, maxX];
  const yDomain = [0, maxY];
  const linesDomain = { x: xDomain, y: yDomain };
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
      width,
      margin: '0 auto'
    }}
    >
      <VictoryChart
        width={width}
        height={height}
        padding={padding}
        animate={{ duration: animationDuration }}
      >
        <VictoryAxis
          dependentAxis
          domain={[0, maxY]}
          tickCount={yAxisTickCount}
          style={tickStyle}
        />
        <VictoryAxis
          domain={xDomain}
          tickCount={xAxisTickCount}
          style={tickStyle}
        />
        {lineIds.map(lineId => {
          const lineColor = colorHash.hex(lineId);
          const lineData = data[lineId];
          return (
            <VictoryLine
              key={lineId}
              data={lineData}
              domain={linesDomain}
              style={{
                data: {
                  stroke: lineColor
                }
              }}
              x={d => d.x}
              y={d => d.y}
            />
          );
        })}
      </VictoryChart>
    </div>
  );
};

TransitionMultiLineChart.propTypes = {
  margin: React.PropTypes.object,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.object.isRequired,
  minX: React.PropTypes.number,
  maxX: React.PropTypes.number,
  minY: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  maxY: React.PropTypes.number
};

TransitionMultiLineChart.defaultProps = {
  margin: {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
  width: 700,
  height: 400
};

export default TransitionMultiLineChart;
