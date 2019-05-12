import React from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Format from './pages/Format';
import Sign from './pages/Sign';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
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