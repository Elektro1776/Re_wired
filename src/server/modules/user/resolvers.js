/*eslint-disable no-unused-vars*/
export default pubsub => ({
  Query: {
    currentUser: (a, b, c) => {
      console.log('a', a);
      // console.log('B:', b);
      // console.log('C::', c);
      const info = {
        id: 11
      };
      return info;
    }
  },
  Mutation: {},
  Subscription: {}
});
