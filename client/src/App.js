import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
import Detail from "./components/Detail";
import Form from "./components/Form";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/form" component={Form} /> 
        <Route exact path="/" component={List} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/detail" component={Detail} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
