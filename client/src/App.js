import React from "react";
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
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import MapContainer from "./components/MapContainer";

import ItemContextProvider from "./contexts/ItemContext";
import AuthContextProvider from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserContext";
import MessageContextProvider from "./contexts/MessageContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <ItemContextProvider>
            <MessageContextProvider>
              <Switch>
                <Route exact path="/" component={List} />
                <Route exact path="/map" component={MapContainer} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/detail/:id" component={Detail} />
                <Route exact path="/items-by-user/:id" component={MyPost} />
                <PrivateRoute exact path="/create" component={Form} />
                <PrivateRoute exact path="/update/:id" component={Update} />
                <PrivateRoute exact path="/profile-image" component={Avatar} />
                <PrivateRoute exact path="/image/:id" component={Photo} />
                <PrivateRoute exact path="/message" component={Message} />
                <PrivateRoute
                  exact
                  path="/message-detail/:id"
                  component={MessageDetail}
                />
                <Route component={PageNotFound} />
              </Switch>
            </MessageContextProvider>
          </ItemContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
