import React, { useState } from 'react';

import { useSmartCacheQuery } from './api/hooks';

import './App.css';

function App() {
  const [value, setValue] = useState(10);
  const { loading, error, errors, data } = useSmartCacheQuery(value);

  let content = data && JSON.stringify(data, null, '  ');
  const errorsInfo = errors && JSON.stringify(errors, null, '  ');
  if (loading) content = 'Loading...';
  if (error) content = `Error! ${error.message}`;
  return (
    <div className="App">
      <h3>Apollo Client Test</h3>
      <div className="ctrls">
        <p>value:</p>
        <button onClick={() => setValue(value - 1)}>-</button>
        <span>{value}</span>
        <button onClick={() => setValue(value + 1)}>+</button>
      </div>
      <div className="content">
        <pre>{content}</pre>
        {errorsInfo && <pre>{errorsInfo}</pre>}
      </div>
    </div>
  );
}

export default App;
