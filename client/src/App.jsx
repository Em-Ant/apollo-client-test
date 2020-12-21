import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY } from './query';

import './App.css';

function App() {
  const [startAge, setStartAge] = useState(67);
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      input: {
        startAge,
      },
    },
  });

  let content = data && JSON.stringify(data, null, '  ');
  if (loading) content = 'Loading...';
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
