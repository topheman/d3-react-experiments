import React from 'react';

import { Link } from 'react-router';

const D3 = ({children}) => {
  return (
    <div>
      <ul className="nav nav-pills">
        <li role="presentation"><Link to="/d3"><span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span></Link></li>
        <li role="presentation"><Link to="/d3/d3act" activeClassName="active">d3act</Link></li>
        <li role="presentation"><Link to="/d3/victory" activeClassName="active">victory</Link></li>
      </ul>
      {children}
    </div>
  );
};

export default D3;
