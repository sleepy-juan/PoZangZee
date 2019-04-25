import React from 'react';
import { getOutbox } from './utils/Database';

function App() {
  getOutbox('juan', mails => {
    mails.forEach(mail => console.log(mail))
  })

  return (
    <div className="App">

    </div>
  );
}

export default App;
