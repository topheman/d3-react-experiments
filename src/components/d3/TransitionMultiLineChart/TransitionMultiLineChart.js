import React from 'react';

import ColorHash from 'color-hash';

import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import 'd3-transition';

const colorHash = new ColorHash();

export default class TransitionMultiLineChart extends React.Component {

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
    this.shouldUpdateSize = true;
    // minimal state to manage React lifecycle
    this.state = {
      initialized: false
    };
  }

  /**
   * From React doc https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount :
   *
   * "Invoked once, only on the client (not on the server), immediately after the initial rendering occurs.
   * At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation).
   * The componentDidMount() method of child components is invoked before that of parent components."
   *
   * this.init is called here because:
   * - we need the ref to the svg node
   * - it won't we called again
   */
  componentDidMount() {
    console.log('componentDidMount');
    this.init();
    // the code bellow is to trigger componentDidUpdate (which is not called at first render)
    setTimeout(() => {
      this.setState({
        initialized: true
      });
    });
  }

  /**
   * From React doc : https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
   *
   * "Invoked when a component is receiving new props. This method is not called for the initial render.
   * Use this as an opportunity to react to a prop transition before render() is called
   * by updating the state using this.setState().
   * The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
   *
   * I use this hook to check whether or not this.updateSize should be called on the next update
   * Doing the same thing about this.updateData would involve deep checking the whole data passed.
   */
  componentWillReceiveProps({ margin, width, height, minX, maxX, maxY }) {
    console.log('componentWillReceiveProps');
    if (margin !== this.props.margin || width !== this.props.width || height !== this.props.height ||
      minX !== this.props.minX || maxX !== this.props.maxX || maxY !== this.props.maxY) {
      console.log('change size');
      this.shouldUpdateSize = true;
    }
  }

  /**
   * From React doc https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate :
   *
   * "Invoked immediately after the component's updates are flushed to the DOM.
   * This method is not called for the initial render.
   * Use this as an opportunity to operate on the DOM when the component has been updated."
   *
   * this.update is called here because:
   * - it's not called for initial render - componentDidMount ensures to have our svg element init
   * - it's called after each update of the component - we get the new props
   */
  componentDidUpdate() {
    console.log('componentDidUpdate');
    this.update();
  }

  extractSize() {
    const { margin, width: widthIncludingMargins, height: heightIncludingMargins } = this.props;
    const width = widthIncludingMargins - margin.left - margin.right;
    const height = heightIncludingMargins - margin.top - margin.bottom;
    return {
      width,
      height,
      margin
    };
  }

  /**
   * Create svg nodes in order to reuse them
   */
  init() {
    console.log('init');
    this.lineGroup = this.rootNode.append('g');
    this.axisLeftGroup = this.lineGroup.append('g');
    this.axisBottomGroup = this.lineGroup.append('g');
  }

  updateSize() {
    console.log('updateSize');
    const { width, height, margin } = this.extractSize();
    const { minX, maxX, maxY } = this.props;

    // resize/re-align root nodes
    this.rootNode
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    this.lineGroup
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    // set domain for axis
    const xScale = scaleLinear().range([0, width]);
    const yScale = scaleLinear().range([height, 0]);

    // Scale the range of the data
    xScale.domain([minX, maxX]);
    yScale.domain([0, maxY]);

    // Update the X Axis
    this.axisBottomGroup.transition()
      .attr('transform', 'translate(0,' + height + ')')
      .call(axisBottom(xScale).ticks(width > 500 ? Math.floor(width / 80) : 4)); // prevent from having too much ticks on small screens

    // Update the Y Axis
    this.axisLeftGroup.transition()
      .call(axisLeft(yScale));

    // this.line is not called directy since it's used as a callback and is re-assigned. It is wrapped inside this.lineReference
    this.line = line() // .interpolate("monotone")
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));
  }

  updateData() {
    console.log('updateData');
    const { data } = this.props;

    const drawLine = this.line;

    // prepare data to [ [{x, y, color}, {x, y, color}], [{x, y, color}, {x, y, color}] ... ]
    const processedData = [];
    Object.keys(data).forEach(countryName => {
      processedData.push(data[countryName].map((infos) => ({ color: colorHash.hex(countryName), ...infos})));
    });

    // generate line paths
    const lines = this.lineGroup.selectAll('.line').data(processedData);

    // [Update] transition from previous paths to new paths
    this.lineGroup.selectAll('.line')
      .transition()
      .style('stroke', d => d[0] ? d[0].color : null)
      .attr('d', drawLine);

    // [Enter] any new data
    lines.enter()
      .append('path')
      .attr('class', 'line')
      .style('stroke-width', '2px')
      .style('fill', 'none')
      .style('stroke', d => d[0] ? d[0].color : null)
      .attr('d', drawLine);

    // [Exit]
    lines.exit()
      .remove();
  }

  update() {
    console.log('update');
    // only call this.updateSize() if some props involving size have changed (check is done on componentWillReceiveProps)
    if (this.shouldUpdateSize === true) {
      this.updateSize();
      this.shouldUpdateSize = false;
    }
    this.updateData();
  }

  render() {
    console.log('render');
    return (
      <svg ref={(node) => this.rootNode = select(node)}></svg>
    );
  }

}
