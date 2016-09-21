import React from 'react';

import { getDisplayName } from '../../utils/helpers';

const injectWindowInfos = () => (WrappedComponent) => {
  const WindowInfos = (props, context) => {
    return <WrappedComponent {...props} {...context}/>;
  };
  WindowInfos.displayName = `WindowInfos(${getDisplayName(WrappedComponent)})`;
  WindowInfos.contextTypes = {
    windowWidth: React.PropTypes.number,
    windowHeight: React.PropTypes.number
  };
  return WindowInfos;
};

export default injectWindowInfos;
