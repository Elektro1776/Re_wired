import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';
import '../../../styles/home.scss';

const imagePath = require('../../../../images/link.jpg');

const renderMetaData = () => (
  <Helmet
    title="Home"
    meta={[
      {
        name: 'description',
        content: 'Home page'
      }
    ]}
  />
);

const HomeView = () => {
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="profile">
        <img src={imagePath} />
        <h1>Hello link</h1>
      </div>
    </PageLayout>
  );
};

export default HomeView;
