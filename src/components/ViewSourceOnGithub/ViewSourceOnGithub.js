import React from 'react';

const ViewSourceOnGithub = ({path}) => (
  <div className="zero-clipboard">
    <a className="btn-clipboard btn-view-source" href={`${process.env.VIEW_SOURCE_ON_GITHUB_BASE_URL}${path}`} title="View sources on github">sources on github</a>
  </div>
);

ViewSourceOnGithub.propTypes = {
  path: React.PropTypes.string.isRequired
};

export default ViewSourceOnGithub;
