import React from 'react';

import { debounce } from '../../utils/helpers';

export default class ResizeProvider extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  static childContextTypes = {
    windowWidth: React.PropTypes.number,
    windowHeight: React.PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      windowWidth: global.width || 960,
      windowHeight: global.height || 640
    };
    // create the debounced handle resize, to prevent flooding with resize event and pass down some computed width and height to the children
    this.debouncedHandleResize = debounce(function handleResize() {
      return this.setState({
        ...this.state,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    }.bind(this), 500);
  }

  getChildContext() {
    return {
      windowWidth: this.state.windowWidth,
      windowHeight: this.state.windowHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedHandleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedHandleResize);
  }

  render() {
    return React.Children.only(this.props.children);
  }

}
