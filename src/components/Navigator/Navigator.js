import React from 'react';

import {Link} from 'react-router';

const Navigator = ({next, prev, children}) => {
  return (
    <div>
      <nav>
        <ul className="pager">
          <li className="previous"><Link to={prev}>Previous</Link></li>
          <li className="next"><Link to={next}>Next</Link></li>
        </ul>
      </nav>
      {children}
      <nav>
        <ul className="pager">
          <li className="previous"><Link to={prev}>Previous</Link></li>
          <li className="next"><Link to={next}>Next</Link></li>
        </ul>
      </nav>
    </div>
  );
};

Navigator.propTypes = {
  prev: React.PropTypes.string,
  next: React.PropTypes.string
};

export default Navigator;
