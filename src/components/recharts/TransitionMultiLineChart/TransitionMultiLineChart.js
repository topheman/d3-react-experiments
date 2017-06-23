/* eslint-disable react/no-multi-comp */

import React from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import ColorHash from 'color-hash';

const colorHash = new ColorHash();

const prepareDataForRecharts = data => {
  const countryDataPerYear = Object.keys(data).reduce((acc, currentCountry) => {
    data[currentCountry].forEach(d => {
      acc[d.x] = acc[d.x] ? { ...acc[d.x], [currentCountry]: d.y } : { [currentCountry]: d.y };
    });
    return acc;
  }, {});
  return Object.keys(countryDataPerYear).reduce((acc, currentYear) => {
    acc.push({ year: Number(currentYear), ...countryDataPerYear[currentYear] });
    return acc;
  }, []);
};

const renderTooltip = ({ payload: [{ payload: infos } = {}], label }) => {
  const countries = Object.keys(infos || []).filter(key => key !== 'year');
  return (
    <div className="panel panel-default">
      <div className="panel-heading" style={{ fontSize: '130%', fontWeight: 'bold' }}>{label}</div>
      <div className="panel-body">
        <ul style={{ paddingLeft: '0' }} >
          {countries.map(country => (
            <li key={country} style={{ color: colorHash.hex(country), listStyle: 'none', margin: '5px auto' }}><strong>{country}</strong>: {infos[country]}</li>
        ))}
        </ul>
      </div>
    </div>
  );
};

const TransitionMultiLineChart = ({ data, width, height, minX, maxX, maxY }) => {
  const rechartsData = prepareDataForRecharts(data);
  return (
    <div style={{ maxWidth: width, margin: '0 auto' }}>
      <LineChart data={rechartsData} width={width} height={height} margin={{ top: 20 }}>
        <XAxis dataKey="year" tickCount={11} type="number" domain={[minX, maxX]} />
        <YAxis type="number" domain={[0, maxY]} />
        <Tooltip content={renderTooltip} />
        {Object.keys(data).map(country => (
          <Line
            type="linear"
            dot={false}
            connectNulls
            key={country}
            dataKey={country}
            stroke={colorHash.hex(country)}
            strokeWidth={2}
          />
        ))}
      </LineChart>
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
  minY: React.PropTypes.number,
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
