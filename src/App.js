import React from 'react';
import './css/main.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainPage from "./components/MainPage";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' component={MainPage}/>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
