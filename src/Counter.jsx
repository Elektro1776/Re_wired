import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Counter2 from './Counter2.jsx';
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }
  increment = () =>  {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }
  renderCounter1 = () => {
      return (<div onClick={this.increment}>
        <h1>Counter: {this.state.count}</h1>
      </div>)
  }
  render() {
    return (
        <div>
          {this.renderCounter1()}
        </div>
    );
  }

}

export default hot(module)(Counter);
