import React from 'react';

export default class LineChart extends React.Component {

  static propTypes = {
    margin: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.object.isRequired,
    minX: React.PropTypes.number,
    maxX: React.PropTypes.number,
    minY: React.PropTypes.number,
    maxY: React.PropTypes.number
  }

  static defaultProps = {
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    width: 700,
    height: 400
  }

  constructor() {
    super();
  }

  render() {
    const { margin, width, height, data, minX, maxX, minY, maxY } = this.props;
    console.log('margin', margin, 'width', width, 'height', height, minX, maxX, minY, maxY, 'data', data);
    // const computedWidth = width - margin.left - margin.right;
    // const computedHeight = height - margin.top - margin.bottom;
    return (
      <div ref={(node) => this.rootNode = node}></div>
    );
  }

}
