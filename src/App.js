import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Sign from './pages/Sign';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/" component={Sign} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;