import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
import MyPost from "./components/MyPost";
import Detail from "./components/Detail";
import Form from "./components/Form";
import Update from "./components/Update";
import Avatar from "./components/Avatar";
import Photo from "./components/Photo";
import Message from "./components/Message";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/create" component={Form} /> 
        <PrivateRoute path="/update/:id" component={Update} /> 
        <PrivateRoute path="/profile-image" component={Avatar} /> 
        <PrivateRoute path="/image/:id" component={Photo} /> 
        <PrivateRoute path="/items-by-user/:id" component={MyPost} /> 
        <PrivateRoute path="/message" component={Message} />
        <Route exact path="/" component={List} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/detail/:id" component={Detail} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
