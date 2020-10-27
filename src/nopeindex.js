import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.count}</h1>
      </div>
    );
  }
}

class Button1 extends React.Component {
  // sCU to the rescue
  shouldComponentUpdate(nextProps, nextState) {
    // If the padding value has changed, then update, otherwise don't update.
    if (this.props.padding !== nextProps.padding) {
      return true;
    } // Update!
    return false; // Don't update!
  }

  render() {
    const { children, onClick, padding } = this.props;
    return (
      <button onClick={onClick} style={{ padding }}>
        {children}
      </button>
    );
  }
}

// Alternative version using PureComponent
class Button2 extends React.PureComponent {
  render() {
    const { children, onClick, padding } = this.props;
    return (
      // If you want to use PureComponent, then you have to define "increment" as a method on App and bind it to App's "this". You can't just define it inline like you can with the original or version 1 Button components.  The reason for that is that if you don't define the click function as a bound method, then every single time Button2 assigns onClick to onClick, a new anonymous function is initialized. That initialization triggers a new render. However, when React sees that onClick is bound method of App, it uses that method again and again. No need to initialize a new function and re-render.
      <button onClick={onClick} style={{ padding }}>
        {children}
      </button>
    );
  }
}

// This version would re-render everytime counter does. That's not what we want. What woudl be the point of that extra render work? The button hasn't changed.
class ButtonOriginal extends React.Component {
  render() {
    const { children, onClick, padding } = this.props;
    return (
      <button onClick={onClick} style={{ padding }}>
        {children}
      </button>
    );
  }
}

class App extends React.Component {
  // If you want to use the pure component approach you have to bind increment like this
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
  }

  state = { count: 0 };

  // You also have to define increment as a method on App
  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div class="App">
        <Counter count={this.state.count} />

        <Button2 onClick={this.increment} padding={8}>
          Increment
        </Button2>

        <Button2 onClick={this.increment} padding={8}>
          Decrement
        </Button2>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
