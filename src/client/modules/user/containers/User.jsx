/*eslint-disable no-unused-vars*/
import React from 'react';
// import { graphql, compose } from 'react-apollo';

import UserView from '../components/UserView.web';

class User extends React.Component {
  render() {
    return <UserView {...this.props} />;
  }
}

// const UserWithApollo = compose()(User);

export default User;
