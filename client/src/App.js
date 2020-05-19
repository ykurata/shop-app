import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import List from "./pages/List";
import MyPost from "./pages/MyPost";
import Detail from "./pages/Detail";
import Form from "./pages/Form";
import Update from "./pages/Update";
import Avatar from "./pages/Avatar";
import Photo from "./pages/Photo";
import Message from "./pages/Message";
import MessageDetail from "./pages/MessageDetail";
import PrivateRoute from "./components/PrivateRoute";

import ItemContextProvider from './contexts/ItemContext';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ItemContextProvider>
          <PrivateRoute path="/create" component={Form} /> 
          <PrivateRoute path="/update/:id" component={Update} /> 
          <PrivateRoute path="/profile-image" component={Avatar} /> 
          <PrivateRoute path="/image/:id" component={Photo} /> 
          <PrivateRoute path="/message" component={Message} />
          <PrivateRoute path="/message-detail/:id" component={MessageDetail} />
          <Route exact path="/" component={List} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/detail/:id" component={Detail} /> 
          <Route path="/items-by-user/:id" component={MyPost} /> 
        </ItemContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
