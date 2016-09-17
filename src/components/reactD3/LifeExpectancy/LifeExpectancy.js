import React from 'react';

import ViewSourceOnGithub from '../../ViewSourceOnGithub/ViewSourceOnGithub';

export default class LifeExpectancy extends React.Component {

  constructor() {
    super();
  }

  render() {

    return (
      <div className="panel panel-default bar-chart-panel">
        <div className="panel-heading">Life expectancy, <strong>YYYY</strong> to <strong>YYYY</strong></div>
        <ViewSourceOnGithub path="/src/components/reactD3/LifeExpectancy/LifeExpectancy.js"/>
        <div className="panel-body text-center">
          Something goes here ...
        </div>
      </div>

    );

  }

}
