import React from 'react';
import { Route,Router, Switch } from "react-router-dom";
import Home from './components/Home';
import history from './history';
import "@fontsource/archivo"
import '@fontsource/open-sans/700.css'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  const theme = extendTheme({
    fonts: {
      heading: 'Open Sans',
      body: 'archivo',
    },
  })
  
  return (
    <ChakraProvider theme={theme}>
    <Router history={history}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
