/* eslint-disable react/no-multi-comp */

export const defaultLinks = [
  '/d3/transition-multi-line-chart',
  '/d3/static-multi-line-chart',
  '/d3/react-faux-dom/static-multi-line-chart',
  '/recharts/transition-multi-line-chart',
  '/victory/world-population-by-age-range',
  '/victory/transition-multi-line-chart',
  '/victory/count-npm-downloads',
  '/d3act/bar-chart',
  '/d3act/mixed-chart'
];

import React from 'react';
import { Link } from 'react-router';
import { getDisplayName } from '../../utils/helpers';

import { Link as ScrollLink, Element as ScrollElement, animateScroll } from 'react-scroll';

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

const prevNext = ({ prev, next, middle }) => (
  <nav>
    <ul className="pager">
      {prev ? <li className="previous"><Link to={prev}>Previous</Link></li> : null}
      <li>{middle}</li>
      {next ? <li className="next"><Link to={next}>Next</Link></li> : null}
    </ul>
  </nav>
);

const navigator = (links) => WrappedComponent => {
  const Navigator = ({ location, ...props }) => {
    const { prev, next } = getPrevNextLinks(location, links);
    if (prev || next) {
      return (
        <div>
          {prevNext({ prev, next, middle: <ScrollLink to="bottom-links" smooth style={{ cursor: 'pointer', fontSize: '80%' }}>Description <span className="glyphicon glyphicon-menu-down" aria-hidden="true" /></ScrollLink> })}
          <WrappedComponent {...props} />
          <ScrollElement name="bottom-links">
            {prevNext({ prev, next, middle: <a onClick={() => animateScroll.scrollToTop()} style={{ cursor: 'pointer', fontSize: '80%' }}>Back to top <span className="glyphicon glyphicon-menu-up" aria-hidden="true" /></a> })}
          </ScrollElement>
        </div>
      );
    }
    return (<WrappedComponent {...props} />);
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
