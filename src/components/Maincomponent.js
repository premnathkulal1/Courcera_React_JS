import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetails from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishesh';
import { Switch, Route, Redirect } from  'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dishesh: DISHES
    };
  }

  render(){ 
    const HomePage = () => {
      return(
        <Home />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishesh={this.state.dishesh} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
