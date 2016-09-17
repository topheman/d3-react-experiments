const defaultLinks = [
  '/victory-world-population-by-age-range',
  '/react-d3-life-expectancy',
  '/d3act-barchart',
  '/d3act-mixed'
];

import React from 'react';
import { Link } from 'react-router';

const getPrevNextLinks = (location, links = defaultLinks) => {
  const currentPath = location.pathname;
  const prevNextLinks = {};
  // 0 or 1 -> dont display pager
  if (links.length < 2) {
    return prevNextLinks;
  }
  // only 2 -> always loop on next
  if (links.length === 2) {
    prevNextLinks.next = links.filter(link => link !== currentPath)[0];
    return prevNextLinks;
  }
  // more links
  if (links.indexOf(currentPath) === 0) {
    prevNextLinks.prev = links[links.length - 1];
    prevNextLinks.next = links[1];
  }
  else if (links.indexOf(currentPath) === links.length - 1) {
    prevNextLinks.prev = links[links.length - 2];
    prevNextLinks.next = links[0];
  }
  else {
    const currentPathIndex = links.indexOf(currentPath);
    prevNextLinks.prev = links[currentPathIndex - 1];
    prevNextLinks.next = links[currentPathIndex + 1];
  }
  return prevNextLinks;
};
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const navigator = (links) => WrappedComponent => {
  const Navigator = ({location, ...props}) => {
    const {prev, next} = getPrevNextLinks(location, links);
    if (prev || next) {
      return (
        <div>
          <nav>
            <ul className="pager">
              {prev ? <li className="previous"><Link to={prev}>Previous</Link></li> : null}
              {next ? <li className="next"><Link to={next}>Next</Link></li> : null}
            </ul>
          </nav>
          <WrappedComponent {...props}/>
          <nav>
            <ul className="pager">
              {prev ? <li className="previous"><Link to={prev}>Previous</Link></li> : null}
              {next ? <li className="next"><Link to={next}>Next</Link></li> : null}
            </ul>
          </nav>
        </div>
      );
    }
    return (<WrappedComponent {...props}/>);
  };
  Navigator.displayName = `Navigator(${getDisplayName(WrappedComponent)})`;
  Navigator.contextTypes = {
    location: React.PropTypes.object.isRequired
  };
  Navigator.propTypes = {
    links: React.PropTypes.arrayOf(React.PropTypes.string)
  };
  return Navigator;
};

export default navigator;
