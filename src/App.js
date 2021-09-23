import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Contents/home";
import MenuList from "./Contents/menu-list";
import InCart from "./Contents/in-cart";

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/menu-list" component={MenuList} />
              <Route exact path="/in-cart" component={InCart} />
          </Switch>
      </Router>
    </div>
  );
}
export default App;