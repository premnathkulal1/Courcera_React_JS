import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishesh';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PRMOTIONS, PROMOTIONS } from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      dishesh: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render(){ 
    const HomePage = () => {
      return(
        <Home 
          dish = {this.state.dishesh.filter((dish) => dish.featured)[0]}
          promotion = {this.state.promotions.filter((promo) => promo.featured)[0]}
          leader = {this.state.leaders.filter((leader) => leader.featured)[0]} 
        />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishesh={this.state.dishesh} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
