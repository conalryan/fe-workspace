import { Outlet } from '@tanstack/react-router';

import './App.css';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://tanstack.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn TanStack
        </a>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

export default App;
