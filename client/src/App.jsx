import React, { useState } from 'react';
import { useSmartQuery } from './api/hooks';

import { QUERY } from './api/query';

import './App.css';

function App() {
  const [startAge, setStartAge] = useState(67);
  const { loading, error, data } = useSmartQuery(
    QUERY,
    {
      variables: {
        input: {
          startAge,
        },
      },
    },
    (data) =>
      data?.contracts?.nav?.prognosis?.simulationStatus?.status !== 'OK',
  );

  let content = data && JSON.stringify(data, null, '  ');
  if (!data && loading) content = 'Loading...';
  if (error) content = `Error! ${error.message}`;
  return (
    <div className="App">
      <h3>Apollo Cache Test</h3>
      <div className="ctrls">
        <p>startAge:</p>
        <button onClick={() => setStartAge(startAge - 1)}>-</button>
        <span>{startAge}</span>
        <button onClick={() => setStartAge(startAge + 1)}>+</button>
      </div>
      <div>
        <pre>{content}</pre>
      </div>
    </div>
  );
}

export default App;
