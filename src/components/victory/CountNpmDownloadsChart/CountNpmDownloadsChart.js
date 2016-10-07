import React from 'react';

import ColorHash from 'color-hash';

import { VictoryAxis, VictoryLine } from 'victory';

const colorHash = new ColorHash();

const chartBreakpoint = 500; // to change fonts and ticks number at some point

const extractViewBox = (viewBox) => `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`;

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
      activeLines: []
    };
  }

  render() {
    const {width: widthFromProps, main, dependencies, dependenciesScale, style} = this.props;
    const width = parseInt(widthFromProps, 10);
    // const animationDuration = 200;
    const processedData = processData({main, dependencies});
    console.log('width', width, 'processedData', processedData, 'dependenciesScale', dependenciesScale);
    console.log(processedData.dependencies.maxY, processedData.main.maxY);
    const mainColor = colorHash.hex(processedData.main.line.label.name);
    console.log('mainColor', mainColor);

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
      <div style={{
        margin: '0',
        ...style
      }}>
        <div className="panel panel-default">
          <div className="panel-body">
            <p style={{color: mainColor}}>
              <span style={{
                textTransform: this.state.activeLines.indexOf(processedData.main.line.label.name) > -1 ? 'uppercase' : 'none',
                textDecoration: this.state.activeLines.indexOf(processedData.main.line.label.name) > -1 ? 'underline' : 'none'
              }} onMouseOver={() => {
                this.setState({
                  ...this.state,
                  activeLines: [processedData.main.line.label.name]
                });
              }} onMouseOut={() => {
                this.setState({
                  ...this.state,
                  activeLines: []
                });
              }}>
                <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span> {processedData.main.line.label.name}
              </span>
            </p>
            <ul className="list-unstyled list-inline">
              {processedData.dependencies.lines.map((line, index) => (
                <li key={index} style={{
                  color: colorHash.hex(line.label.name),
                  textTransform: this.state.activeLines.indexOf(line.label.name) > -1 ? 'uppercase' : 'none',
                  textDecoration: this.state.activeLines.indexOf(line.label.name) > -1 ? 'underline' : 'none'
                }}
                onMouseOver={() => {
                  this.setState({
                    ...this.state,
                    activeLines: [line.label.name]
                  });
                }}
                onMouseOut={() => {
                  this.setState({
                    ...this.state,
                    activeLines: []
                  });
                }}>
                  <span className="glyphicon glyphicon-minus" aria-hidden="true"></span> {line.label.name}
                </li>
              ))}
            </ul>
            <div style={{
              height: '100%',
              minHeight: '100px',
              width: `${width}px`
            }}>
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
                    style={tickStyle}
                  />
                  <VictoryAxis
                    dependentAxis
                    orientation="right"
                    domain={[0, processedData.main.maxY]}
                    style={{
                      axis: {
                        stroke: mainColor
                      },
                      ticks: {
                        ...tickStyle.ticks,
                        stroke: mainColor
                      },
                      tickLabels: {
                        ...tickStyle.tickLabels,
                        fill: mainColor
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
                    (x) => {
                      return x.label;
                    }
                  }
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
                        strokeOpacity: this.state.activeLines.length > 0 && this.state.activeLines.indexOf(processedData.main.line.label.name) === -1 ? 0.3 : 1
                      }
                    }}
                    events={[
                    { target: 'data', eventHandlers: {
                      onMouseOver: () => {
                        this.setState({
                          ...this.state,
                          activeLines: [processedData.main.line.label.name]
                        });
                      },
                      onMouseOut: () => {
                        this.setState({
                          ...this.state,
                          activeLines: []
                        });
                      }
                    } } ]}
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
                          strokeOpacity: this.state.activeLines.length > 0 && this.state.activeLines.indexOf(line.label.name) === -1 ? 0.3 : 1
                        }
                      }}
                      events={[
                      { target: 'data', eventHandlers: {
                        onMouseOver: () => {
                          this.setState({
                            ...this.state,
                            activeLines: [line.label.name]
                          });
                        },
                        onMouseOut: () => {
                          this.setState({
                            ...this.state,
                            activeLines: []
                          });
                        }
                      } } ]}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default CountNpmDownloadsChart;
