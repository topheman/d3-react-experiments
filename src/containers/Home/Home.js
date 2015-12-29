import React from 'react';

import { Link } from 'react-router';

const prodMessage = (<div>
  <p>This is the <strong>production packaged</strong> version (html/css/js uglified). You can <a href="./devtools.html" title="Test with devtools & sourcemaps" style={{fontWeight: 'bold'}}>test the site in debug mode here</a>, where you'll have access to sourcemaps.</p>
  <p className="text-center"><a href="./devtools.html" title="Test with devtools & sourcemaps" className="btn btn-default btn-primary btn-lg" style={{whiteSpace: 'pre-wrap'}}>I'm a developer, I want to see what's under the hood!</a></p>
</div>);

const devtoolsMessage = (<div>
  <p>This is the <strong>development packaged</strong> version (<a href="./" title="checkout in production mode">the production version is here</a>). In the current mode, you have access to sourcemaps.</p>
  <p>I felt it could be interesting to access original source directly online.</p>
</div>);

const Home = () => {
  return (
    <div>
      <ol className="breadcrumb">
        <li className="active">Home</li>
      </ol>
      <p>Welcome,</p>
      <p>This project is an attempt to test some d3 implementations inside react, trying out 2 different approches:</p>
      <ul>
        <li><Link to="/d3">d3act</Link></li>
        <li><Link to="/d3">victory</Link></li>
      </ul>
      <p>Since data-vizualisation is funnier in real time (see my previous project <a href="https://github.com/topheman/topheman-datavisual" title="topheman/topheman-datavisual on github">topheman-datavisual</a>), and I wanted to try it for a long time, you'll find a section on <Link to="/rxjs">RxJS</Link> and a <Link to="/d3-rxjs">mix of both</Link>.</p>
      <p>The data showing on this project comes from <a href="http://stackoverflow.com/research/developer-survey-2015" title="2015 Developer Survey">stackoverflow 2015 Developer Survey</a></p>
      <br/>
      {process.env.DEVTOOLS ? devtoolsMessage : prodMessage }
    </div>
  );
};

export default Home;
