import { NavigationContainer } from '@react-navigation/native';
import Router from "./src/router/index"
import * as React from 'react';


function App() {
  return(
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}

export default App