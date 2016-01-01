import React from 'react';

import { Link } from 'react-router';

import { getSensorMode } from '../../services/sensorsObserver';

const RxJSHome = () => {
  const sensorMode = getSensorMode();
  console.log(sensorMode);

  return (
    <div>
      <ol className="breadcrumb">
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li className="active">RxJS</li>
      </ol>
      <p style={{marginTop: '10px'}}>Something about RxJS ...</p>
      <p>This part (and others) will be working with both mouse and accelerometer, so to enjoy it, test it with your mobile/tablet AND your laptop/desktop.</p>
      <p>Currently, {sensorMode.accelerometer ? 'an ' : 'no '}accelerometer has been detected on your device.</p>
    </div>
  );
};

export default RxJSHome;
