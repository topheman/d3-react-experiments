import React from 'react';

import { Link } from 'react-router';

const D3Home = () => {
  return (
    <div>
      <ol className="breadcrumb">
        <li><Link to="/" activeClassName="active">Home</Link></li>
        <li className="active">d3</li>
      </ol>
      <p style={{marginTop: '10px'}}>D3.js is a JavaScript library for manipulating documents based on data.</p>
      <p>In this section, you'll find some examples made with the following libraries:</p>
      <ul className="summary">
        <li><Link to="/d3/d3act" activeClassName="active">d3act</Link></li>
        <li><Link to="/d3/victory" activeClassName="active">victory</Link></li>
      </ul>
    </div>
  );
};

export default D3Home;
