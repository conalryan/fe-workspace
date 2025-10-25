import { useState } from 'react';

import reactLogo from './assets/react.svg';

import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a
          href="https://vite.dev"
          target="_blank">
          <img
            alt="Vite logo"
            className="logo"
            src={viteLogo}
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank">
          <img
            alt="React logo"
            className="logo react"
            src={reactLogo}
          />
        </a>
      </div>
      <h1>Basic React Remote</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
