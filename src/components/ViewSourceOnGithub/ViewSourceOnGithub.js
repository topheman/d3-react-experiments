import React from 'react';

const ViewSourceOnGithub = ({path}) => {
  if (typeof path === 'string') {
    return (
      <div className="zero-clipboard">
        <a className="btn-clipboard btn-view-source" href={`${process.env.VIEW_SOURCE_ON_GITHUB_BASE_URL}${path}`}
           title="View sources on github">sources on github</a>
      </div>
    );
  }

  const links = [];
  Object.keys(path).forEach((title) => links.push({
    href: `${process.env.VIEW_SOURCE_ON_GITHUB_BASE_URL}${path[title]}`,
    title: title
  }));
  return (
    <div className="zero-clipboard">
      <div className="btn-clipboard btn-view-source">
        sources on github:{' '}
        {links.map((link, index, arr) => {
          const delimiter = index < arr.length - 1 ? ' / ' : null;
          return <span key={link.title}><a href={link.href} title={link.title}>{link.title}</a>{delimiter}</span>;
        })}
      </div>
    </div>
  );
};

ViewSourceOnGithub.propTypes = {
  path: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ])
};

export default ViewSourceOnGithub;
