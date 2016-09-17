import React from 'react';

import { Link } from 'react-router';

const prodMessage = (<div>
  <p>This is the <strong>production packaged</strong> version (html/css/js uglified). You can <a href="./devtools/" title="Test with devtools & sourcemaps" style={{fontWeight: 'bold'}}>test the site in debug mode here</a>, where you'll have access to sourcemaps.</p>
  <p className="text-center"><a href="./devtools/" title="Test with devtools & sourcemaps">I'm a developer, I want to see what's under the hood!</a></p>
</div>);

const devtoolsMessage = (<div>
  <p>This is the <strong>development packaged</strong> version (<a href="../" title="checkout in production mode">the production version is here</a>). In the current mode, you have access to sourcemaps.</p>
  <p>I felt it could be interesting to access original source directly online.</p>
</div>);

const Home = () => {
  return (
    <div>
      <p>D3 is a very powerfull visualisation library. But since it mutates the DOM, it doesn't really get along with React ...</p>
      <p>In the last year, a lot of projects have risen with the goal of making those two work gently together ...</p>
      <p>It doesn't seem like there is a clear winner yet. In this project, I'll try some of those libraries. <a href="https://github.com/topheman/d3-react-experiments#d3-react-experiments" title="d3-react-experiments on github">More in the README</a>.</p>
      <p className="text-center"><Link to="/victory-world-population-by-age-range" className="btn btn-default btn-primary btn-lg">Start browsing</Link></p>
      <ul>
        <li><Link to="/victory-world-population-by-age-range">Victory / World population by age range</Link></li>
        <li><Link to="/react-d3-life-expectancy">React D3 / Life expectancy</Link></li>
        <li><Link to="/d3act-barchart">d3act / Most popular technologies</Link></li>
        <li><Link to="/d3act-mixed">d3act / Desktop Operating System</Link></li>
      </ul>
      <br/>
      {process.env.DEVTOOLS ? devtoolsMessage : prodMessage }
    </div>
  );
};

export default Home;
