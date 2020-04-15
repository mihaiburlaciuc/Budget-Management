import React from "react";
import ReactDOM from "react-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/login.component";
import MainComponent from "./components/main.component";
import Register from "./components/register.component";
import TransactionComponent from "./components/transaction.component";
import SettleComponent from "./components/settle.component";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={MainComponent} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/transaction" component={TransactionComponent} />
          <Route exact path="/settle" component={SettleComponent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
