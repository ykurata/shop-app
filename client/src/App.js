import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
import Detail from "./components/Detail";
import Form from "./components/Form";
import Avatar from "./components/Avatar";
import Photo from "./components/Photo";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/create" component={Form} /> 
        <PrivateRoute path="/profile-image" component={Avatar} /> 
        <Route exact path="/" component={List} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/detail/:id" component={Detail} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
