import React from 'react';
// import Helmet from 'react-helmet';
import { PageLayout } from '../../common/components/web';

// const renderMetaData = () => (
//   <Helmet
//     title="User"
//     meta={[
//       {
//         name: 'description',
//         content: 'User page'
//       }
//     ]}
//   />
// );

const UserView = () => {
  return (
    <PageLayout>
      {/* {renderMetaData()} */}
      <div>
        <p>Hello User!</p>
      </div>
    </PageLayout>
  );
};

export default UserView;
