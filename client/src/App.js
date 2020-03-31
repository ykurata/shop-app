import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from "./components/List";
import Detail from "./components/Detail";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/detail" component={Detail} /> 
        <Route path="/form" component={Form} /> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
