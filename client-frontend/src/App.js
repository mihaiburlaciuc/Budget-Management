import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import { LandingPage } from "./components/landing.page";
import { MainPage } from "./components/main.page";
import Register from "./components/register.component";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/register" component={Register} />
          {/* <ProtectedRoute exact path="/app" component={AppLayout} /> */}
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
