import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetails from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
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
        <Header />
        <Menu dishesh={this.state.dishesh} 
              onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetails 
              prem_dish={this.state.dishesh.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;
