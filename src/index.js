import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initDatabase } from './utils/Database';

// initialize firebase
initDatabase();

// initialize react
ReactDOM.render(<App />, document.getElementById('root'));