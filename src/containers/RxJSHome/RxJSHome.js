/* eslint react/no-did-mount-set-state: 0 */

import React from 'react';
import Rx from 'rx';

import { Link } from 'react-router';

import { getSensorMode, createMapEventFromMode, MODE_DEVICEORIENTATION } from '../../services/sensorsObserver';

import DisplayOneEvent from '../../components/RxJS/DisplayOneEvent/DisplayOneEvent';

export default class RxJSHome extends React.Component {

  constructor(props) {
    super(props);
    this.sensorMode = getSensorMode();
    console.log(this.sensorMode);
    this.state = {};
  }

  componentWillMount() {
    const uniformEvents = createMapEventFromMode(this.sensorMode);
    this.observable = Rx.Observable.fromEvent(window, this.sensorMode).map(uniformEvents);
    if (this.sensorMode === MODE_DEVICEORIENTATION) {
      this.observable = this.observable.throttle(50);// only emit every 50ms
    }
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb">
          <li><Link to="/" activeClassName="active">Home</Link></li>
          <li className="active">RxJS</li>
        </ol>
        <p style={{marginTop: '10px'}}>Something about RxJS ...</p>
        <p>This part (and others) will be working with both mouse and accelerometer, so to enjoy it, test it with your mobile/tablet AND your laptop/desktop.</p>
        <p>Currently, <strong>{this.sensorMode === MODE_DEVICEORIENTATION ? 'an ' : 'no '}accelerometer has been detected on your device</strong>.</p>
        <DisplayOneEvent sensorMode={this.sensorMode} observable={this.observable}/>
      </div>
    );
  }
}
