import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Sign from './pages/Sign';
import DocsEn from './pages/Docs-En';
import DocsKr from './pages/Docs-Kr';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/docs-en" component={DocsEn} />
        <Route exact path="/docs-kr" component={DocsKr} />
        <Route path="/" component={Sign} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;