import React from 'react';

import { Link } from 'react-router';
import { defaultLinks } from '../../components/Navigator/injectNavigator';

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
      <p>It doesn't seem like there is a clear winner yet. I tried some of those libraries and also created home-made components. <a href="https://github.com/topheman/d3-react-experiments#d3-react-experiments" title="d3-react-experiments on github">More in the README</a>.</p>
      <p className="text-center"><Link to={defaultLinks[0]} className="btn btn-default btn-primary btn-lg">Start browsing</Link></p>
      <p>Each example carries a link to the sources on github (you can also switch the website to the development version, open your devtools and browse the "Sources" panel).</p>
      <p><a href="http://dev.topheman.com/d3-react-chart-components/" title="Plain d3 code and React working together">Read the blog post about d3 and React working together</a></p>
      <p className="lead"><strong>NEW in v2</strong> Examples with home-made components based on <strong>d3 v4</strong>:</p>
      <ul>
        <li><Link to="/d3/transition-multi-line-chart">D3 / TransitionMultiLineChart</Link>: POC of integration of plain d3 code, hooking transitions with React lifecycle</li>
        <li><Link to="/d3/static-multi-line-chart">D3 / StaticMultiLineChart</Link>: POC of integration of plain d3 code that plays well with React</li>
      </ul>
      <p>Examples with third party libraries:</p>
      <ul>
        <li><Link to="/victory-world-population-by-age-range">Victory / World population by age range</Link></li>
        <li><Link to="/d3act-barchart">d3act / Most popular technologies</Link></li>
        <li><Link to="/d3act-mixed">d3act / Desktop Operating System</Link></li>
      </ul>
      <br/>
      {process.env.DEVTOOLS ? devtoolsMessage : prodMessage }
    </div>
  );
};

export default Home;
