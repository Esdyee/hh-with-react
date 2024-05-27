import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    console.log('Rendered with count:', this.state.count);
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
