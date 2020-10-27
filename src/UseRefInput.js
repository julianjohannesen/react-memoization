// In this component the value of input is uncontrolled and is retrieved through a reference to the DOM element

import React, { useState, useRef } from "react";

export default function useRefInput() {
  
  // Store the input value in state
  const [value, setValue] = useState("");
  // Get a reference to the input element in the DOM
  const valueRef = useRef();

  const handleClick = (e) => {
    // Set the input's value using the current value of the DOM element
    setValue(valueRef.current.value);
  };

  return (
    <div className="App">
      <h4>Value: {value}</h4>
      <input ref={valueRef} />
      <Button onClick={handleClick}>Button</Button>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
