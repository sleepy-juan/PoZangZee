import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Format from './pages/Format';
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
      <div className="App">
        <Home />
        <Format />
      </div>
    </BrowserRouter>
    
  )
}

export default App;