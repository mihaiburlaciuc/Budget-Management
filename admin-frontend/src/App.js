import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"


import Login from "./components/login.component";
import MainComponent from "./components/main.component";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={MainComponent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
