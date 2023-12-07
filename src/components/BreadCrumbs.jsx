import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';


const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbs = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{snippet}</Link>
      </Breadcrumb.Item>
    );
  });

  return <Breadcrumb>{breadcrumbs}</Breadcrumb>;
};

export default Breadcrumbs;
