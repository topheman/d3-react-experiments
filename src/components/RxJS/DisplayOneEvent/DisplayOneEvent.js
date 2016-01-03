import { MODE_DEVICEORIENTATION } from '../../../services/sensorsObserver';

import React from 'react';

export default class DisplayOneEvent extends React.Component {

  static propTypes = {
    sensorMode: React.PropTypes.string.isRequired,
    observable: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }

  componentDidMount() {
    this.subscription = this.props.observable.subscribe((e) => {
      this.setState(e);
    });
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    const { sensorMode } = this.props;
    const title = sensorMode === MODE_DEVICEORIENTATION ? 'Accelerometer infos' : 'Mousemove infos';
    const infos = sensorMode === MODE_DEVICEORIENTATION ? <ul><li>beta : {this.state.a}</li><li>gamma: {this.state.b}</li></ul> : <ul><li>clientX : {this.state.a}</li><li>clientY: {this.state.b}</li></ul>;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{title}</div>
        <div className="panel-body">
          {infos}
        </div>
      </div>
    );
  }
}
