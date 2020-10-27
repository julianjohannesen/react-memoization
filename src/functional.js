// This combination of useMemo to memoize the button components with a callback that's been memoized with useCallback seems to prevent unnecessary re-renders of the button components. That's good, because the only part of the UI that's changing is the counter component. In terms of how you set state, you can do it directly with setCount(newCount) or functionally with setCount((prev)=>prev + 1)

import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import UseRefInput from './UseRefInput';

import "./styles.css";

function Counter({ count }) {
  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

function Button({ children, onClick, padding }) {
  return (
    <button onClick={onClick} style={{ padding }}>
      {children}
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  // useCallback will memoize the function so that 'increment' doesn't need to be re-initialized on every render
  const increment = useCallback(
    () => {
      // In this configuration of useCallback and useMemo, you an set state here either directly or funcationally. The functional version feels right to me. You're using the previous state to calculate the new state and it seems like that should be reflected.
      setCount((prevCount) => prevCount + 1);
      // setCount(count + 1); This works too
    },
    // Add setCount as a dependency
    [setCount]
  );

  const decrement = useCallback(
    () => {
      // Use the previous count to get the new count. If you don't take this step, I think you run into trouble
      setCount((prevCount) => prevCount - 1);
    },
    // Add setCount as a dependency
    [setCount]
  );

  return (
    <div class="App">
      <Counter count={count} />

      {
        /* Prevent unnecessary re-renders that don't involve changes to the click handlers "increment" and "decrement" (which will never change). */
        useMemo(
          () => (
            <div>
              <Button onClick={increment} padding={8}>
                Increment
              </Button>

              <Button onClick={decrement} padding={8}>
                Decrement
              </Button>
            </div>
          ),
          [increment, decrement]
        )
      }

      <UseRefInput />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
