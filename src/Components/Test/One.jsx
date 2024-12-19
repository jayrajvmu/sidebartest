import React, { useState } from 'react';
import './style.css';

export default function App() {
  let [data, setData] = useState();

  function Inputbox() {
    let handleChange = (e) => {
      e.preventDefault()
      console.log(e.target.value);
      setData(e.target.value);
    };
    return (
      <div>
        <input
          type="text"
          value={data}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
    );
  }

  function Output() {
    return <div>{data}</div>;
  }
  return (
    <div>
      <Inputbox />
      <Output />
    </div>
  );
}