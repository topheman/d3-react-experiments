/* eslint react/no-did-mount-set-state: 0 */

import { MODE_DEVICEORIENTATION } from '../../../services/sensorsObserver';

const MAX_RESULTS = 15;

import React from 'react';

export default class DisplayMultipleEvents extends React.Component {

  static propTypes = {
    sensorMode: React.PropTypes.string.isRequired,
    observable: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      eventList: []
    };
  }

  componentDidMount() {
    this.subscription = this.props.observable.subscribe(e => {
      let { eventList } = this.state;
      eventList = [e].concat(eventList);
      if (eventList.length >= MAX_RESULTS) {
        eventList.pop();
      }
      this.setState({eventList: eventList});
    });
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    const { sensorMode } = this.props;
    const title = sensorMode === MODE_DEVICEORIENTATION ? 'Accelerometer' : 'Mousemove' + ' multiple infos';
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{title}</div>
        <div className="panel-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <td>{sensorMode === MODE_DEVICEORIENTATION ? 'beta' : 'clientX'}</td>
                  <td>{sensorMode === MODE_DEVICEORIENTATION ? 'gamma' : 'clientY'}</td>
                </tr>
              </thead>
              <tbody>
                {this.state.eventList.map((e, i) => (
                  <tr key={i}>
                    <td>{e.a}</td>
                    <td>{e.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
