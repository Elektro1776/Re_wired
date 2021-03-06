import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';

const renderMetaData = () => (
  <Helmet
    title="Product"
    meta={[
      {
        name: 'description',
        content: 'Product page'
      }
    ]}
  />
);

const ProductView = () => {
  return (
    <PageLayout>
      {/* {renderMetaData()} */}
      <div className="text-center mt-4 mb-4">
        <p>Hello Product!</p>
      </div>
    </PageLayout>
  );
};

export default ProductView;
