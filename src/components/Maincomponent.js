import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetails from './DishdetailComponent'
import { DISHES } from '../shared/dishesh';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dishesh: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
  }

  render(){ 
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorent Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishesh={this.state.dishesh} 
              onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetails 
              prem_dish={this.state.dishesh.filter((dish) => dish.id ===this.state.selectedDish) [0]} />
      </div>
    );
  }
}

export default Main;
