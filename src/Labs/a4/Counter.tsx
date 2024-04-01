import React, { useState } from "react";
function Counter() {
    const [count, setCount] = useState(7);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)} className="btn btn-success">Up</button> &nbsp;
      <button onClick={() => setCount(count - 1)} className="btn btn-danger">Down</button>
    </div>
  );
}
export default Counter;