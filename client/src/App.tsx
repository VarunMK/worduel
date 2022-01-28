import React from 'react';
import { Route,Router, Switch } from "react-router-dom";
import Home from './components/Home';
import history from './history';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
    <Router history={history}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
