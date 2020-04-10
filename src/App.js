import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishesh';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dishesh: DISHES
    };
  }

  render(){ 
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorent Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishesh={this.state.dishesh} />
      </div>
    );
  }
}

export default App;
