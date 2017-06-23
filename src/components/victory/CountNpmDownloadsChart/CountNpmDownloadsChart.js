import React from 'react';

import ColorHash from 'color-hash';

import { VictoryAxis, VictoryLine, VictoryBar } from 'victory';

const colorHash = new ColorHash();

const chartBreakpoint = 500; // to change fonts and ticks number at some point

const inactiveOpacity = 0.3;

const extractViewBox = (viewBox) => `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`;

const formatNumber = (number) => number.toString().split('').reverse().reduce((acc, num, i) => num + (i && !(i % 3) ? ',' : '') + acc, '');

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

const processData = ({ main, dependencies }) => ({
  main: processMain(main),
  dependencies: processDependencies(dependencies)
});

class CountNpmDownloadsChart extends React.Component {

  static propTypes = {
    style: React.PropTypes.object,
    margin: React.PropTypes.object,
    width: React.PropTypes.number,
    main: React.PropTypes.object.isRequired,
    dependencies: React.PropTypes.array.isRequired,
    dependenciesScale: React.PropTypes.number
  }

  static defaultProps = {
    margin: {
      top: 20,
      right: 100,
      bottom: 30,
      left: 100
    },
    width: 700,
    dependenciesScale: 0.8
  }

  constructor(props) {
    super(props);
    this.state = {
      activeLines: [],
      tooltipCurrentDay: 0,
      showToolTip: false
    };
  }

  /**
   * This function will return the correct handlers whether you're on touch or not
   * The handlers are meant to be used in a component context (this)
   * @param labelName
   * @returns {*}
   */
  getUserEvents(labelName) {
    // check can be more advanced
    if ('ontouchstart' in window) {
      return {
        onClick: () => {
          // allow toggle on touch devices
          if (this.state.activeLines.indexOf(labelName) > -1) {
            return this.setState({
              ...this.state,
              activeLines: []
            });
          }
          return this.setState({
            ...this.state,
            activeLines: [labelName]
          });
        }
      };
    }
    return {
      onMouseOver: (e) => {
        // prevent mouseOver from bubbling up to the svg element
        // - the VictoryBar catches all mouseOver to display the tooltip
        // - the svg catches mouseOver to hide the tooltip
        e.stopPropagation();
        this.setState({
          ...this.state,
          activeLines: [labelName]
        });
      },
      onMouseOut: () => {
        this.setState({
          ...this.state,
          activeLines: []
        });
      }
    };
  }

  render() {
    const { activeLines, showToolTip, tooltipCurrentDay } = this.state;
    const { width: widthFromProps, main, dependencies, dependenciesScale, style } = this.props;
    const width = parseInt(widthFromProps, 10);
    // const animationDuration = 200;
    const processedData = processData({ main, dependencies });
    const mainColor = colorHash.hex(processedData.main.line.label.name);

    const tickModulo = width > chartBreakpoint ? 5 : 10;
    const hAxisTicks = processedData.main.line.data.map((d, index, arr) => {
      const value = new Date(d.x);
      // trick: attach label to the actual value of the tick - thanks to JavaScript ;)
      value.label = (index === 0 || (arr.length === (index + 1)) || index % tickModulo === 0) ? `${value.getMonth() + 1}/${value.getDate()}` : '';
      return value;
    });

    const minX = processedData.main.minX;
    const maxX = processedData.main.maxX;

    const viewBox = {
      minX: 0,
      minY: 0,
      width: 400,
      height: 200
    };

    const tickStyle = {
      ticks: {
        size: 6,
        stroke: 'black'
      },
      tickLabels: {
        fontSize: width > chartBreakpoint ? '12px' : '19px',
        fontFamily: 'inherit'
      }
    };

    return (
      <div
        style={{
          margin: '0',
          ...style
        }}
        onMouseOver={(e) => {
        // histograms show the tooltip, hide it when hovering on this div (and not bubbling up from the chart)
          if (e.relatedTarget && e.relatedTarget.nodeName !== 'path' || !e.relatedTarget) {
            this.setState({
              ...this.state,
              showToolTip: false
            });
          }
        }}
      >
        <div className="panel panel-default">
          <div className="panel-body">
            <p style={{ color: mainColor }}>
              <span
                title={processedData.main.line.label.name}
                style={{
                  cursor: 'pointer',
                  textTransform: activeLines.indexOf(processedData.main.line.label.name) > -1 ? 'uppercase' : 'none',
                  textDecoration: activeLines.indexOf(processedData.main.line.label.name) > -1 ? 'underline' : 'none'
                }}
                {...this.getUserEvents(processedData.main.line.label.name)}
              >
                <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true" /> {processedData.main.line.label.name}
              </span>
            </p>
            <ul className="list-unstyled list-inline">
              {processedData.dependencies.lines.map((line, index) => (
                <li
                  key={index}
                  title={line.label.name}
                  style={{
                    cursor: 'pointer',
                    color: colorHash.hex(line.label.name),
                    textTransform: activeLines.indexOf(line.label.name) > -1 ? 'uppercase' : 'none',
                    textDecoration: activeLines.indexOf(line.label.name) > -1 ? 'underline' : 'none'
                  }}
                  {...this.getUserEvents(line.label.name)}
                >
                  <span className="glyphicon glyphicon-minus" aria-hidden="true" /> {line.label.name}
                </li>
              ))}
            </ul>
            <div style={{
              height: '100%',
              minHeight: '100px',
              width: `${width}px`
            }}
            >
              <svg
                style={{
                  boxSizing: 'border-box',
                  display: 'inline',
                  padding: 0,
                  width: '100%',
                  height: 'auto'
                }}
                viewBox={extractViewBox(viewBox)}
              >
                <g transform="translate(0,0)">
                  <VictoryAxis
                    orientation="left"
                    domain={[0, processedData.dependencies.maxY / dependenciesScale]}
                    style={{
                      axis: {
                        stroke: mainColor,
                        strokeOpacity: activeLines.length === 0 || activeLines.length > 0 && processedData.dependencies.lines.map(d => d.label.name).includes(...activeLines) ? 1 : inactiveOpacity
                      },
                      ticks: {
                        ...tickStyle.ticks,
                        strokeOpacity: activeLines.length === 0 || activeLines.length > 0 && processedData.dependencies.lines.map(d => d.label.name).includes(...activeLines) ? 1 : inactiveOpacity
                      },
                      tickLabels: {
                        ...tickStyle.tickLabels,
                        fillOpacity: this.state.activeLines.length === 0 || this.state.activeLines.length > 0 && processedData.dependencies.lines.map(d => d.label.name).includes(...activeLines) ? 1 : inactiveOpacity
                      }
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    orientation="right"
                    domain={[0, processedData.main.maxY]}
                    style={{
                      axis: {
                        stroke: mainColor,
                        strokeOpacity: activeLines.length > 0 && activeLines.indexOf(processedData.main.line.label.name) === -1 ? inactiveOpacity : 1
                      },
                      ticks: {
                        ...tickStyle.ticks,
                        stroke: mainColor,
                        strokeOpacity: activeLines.length > 0 && activeLines.indexOf(processedData.main.line.label.name) === -1 ? inactiveOpacity : 1
                      },
                      tickLabels: {
                        ...tickStyle.tickLabels,
                        fill: mainColor,
                        fillOpacity: activeLines.length > 0 && activeLines.indexOf(processedData.main.line.label.name) === -1 ? inactiveOpacity : 1
                      }
                    }}
                  />
                  <VictoryAxis
                    scale="time"
                    style={{
                      ticks: {
                        ...tickStyle.ticks,
                        size: (tick) => tick.label ? 10 : 5,
                      },
                      tickLabels: {
                        ...tickStyle.tickLabels
                      }
                    }}
                    tickValues={hAxisTicks}
                    tickFormat={
                    (x) => x.label
                  }
                  />
                  <VictoryBar
                    style={{
                      data: {
                        fill: 'transparent',
                        width: 13
                      }
                    }}
                    data={processedData.main.line.data.map(d => ({ x: d.x, y: 1 }))}
                    domain={{
                      x: [minX, maxX],
                      y: [0, 1]
                    }}
                    events={[
                      { target: 'data',
                        eventHandlers: {
                          onMouseOver: (event, data, index) => {
                            event.stopPropagation();
                            this.setState({
                              ...this.state,
                              tooltipCurrentDay: parseInt(index, 10),
                              showToolTip: true
                            });
                            return [
                              {
                                mutation: () => ({ style: { fill: 'black', fillOpacity: 0.1 } })
                              }
                            ];
                          },
                          onMouseOut: (event) => {
                            event.stopPropagation();
                            return [
                              {
                                mutation: () => ({ style: { fill: 'transparent' } })
                              }
                            ];
                          }
                        } }]}
                  />
                  <VictoryLine
                    data={processedData.main.line.data}
                    domain={{
                      x: [minX, maxX],
                      y: [0, processedData.main.maxY]
                    }}
                    style={{
                      data: {
                        strokeLinecap: 'round',
                        stroke: mainColor,
                        strokeDasharray: '1, 7',
                        strokeWidth: '3px',
                        strokeOpacity: activeLines.length > 0 && activeLines.indexOf(processedData.main.line.label.name) === -1 ? inactiveOpacity : 1
                      }
                    }}
                    events={[
                      { target: 'data',
                        eventHandlers: {
                          ...this.getUserEvents(processedData.main.line.label.name)
                        } }]}
                  />
                  {processedData.dependencies.lines.map((line, index) => (
                    <VictoryLine
                      key={index}
                      data={line.data}
                      domain={{
                        x: [minX, maxX],
                        y: [0, processedData.dependencies.maxY / dependenciesScale]
                      }}
                      style={{
                        data: {
                          stroke: colorHash.hex(line.label.name),
                          strokeOpacity: activeLines.length > 0 && activeLines.indexOf(line.label.name) === -1 ? inactiveOpacity : 1
                        }
                      }}
                      events={[
                        { target: 'data',
                          eventHandlers: {
                            ...this.getUserEvents(line.label.name)
                          } }]}
                    />
                  ))}
                </g>
              </svg>
            </div>
            <div
              className="panel panel-default center-block"
              style={{
                display: showToolTip ? 'block' : 'none',
                width: '50%',
                minWidth: '270px'
              }}
            >
              <div className="panel-body text-left">
                <p style={{ fontWeight: 'bold' }}>{processedData.main.line.data[tooltipCurrentDay].x.toDateString()}</p>
                <dl className="dl-horizontal">
                  <dt style={{
                    color: colorHash.hex(processedData.main.line.label.name)
                  }}
                  >
                    {processedData.main.line.label.name}
                  </dt>
                  <dd>{processedData.main.line.data[tooltipCurrentDay] ? formatNumber(processedData.main.line.data[tooltipCurrentDay].y) : 0}</dd>
                  {processedData.dependencies.lines.map(line => (
                    <div key={line.label.name}>
                      <dt style={{
                        color: colorHash.hex(line.label.name)
                      }}
                      >
                        {line.label.name}
                      </dt>
                      <dd>
                        {line.data[line.data.length - processedData.main.line.data.length + tooltipCurrentDay] ? formatNumber(line.data[line.data.length - processedData.main.line.data.length + tooltipCurrentDay].y) : 0}
                      </dd>
                    </div>
                    ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default CountNpmDownloadsChart;
