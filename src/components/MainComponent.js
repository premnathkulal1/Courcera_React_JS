import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Aboutus from './AboutusComponent';
import Contact from './ContactComponent';
import DishDetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDidhes } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishesh : state.dishesh,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDidhes: () => {dispatch(fetchDidhes())}

});

class Main extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDidhes();
  }

  render(){ 
    const HomePage = () => {
      return(
        <Home 
          dish = {this.props.dishesh.dishes.filter((dish) => dish.featured)[0]}
          dishesLosding={this.props.dishesh.isLoading}
          dishesErrMess={this.props.dishesh.errmess}
          promotion = {this.props.promotions.filter((promo) => promo.featured)[0]}
          leader = {this.props.leaders.filter((leader) => leader.featured)[0]} 
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetails 
          dish={this.props.dishesh.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishesh.isLoading}
          isErrMess={this.props.dishesh.errmess} 
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          addComment={this.props.addComment}
        /> 
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishesh={this.props.dishesh} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/aboutus" component={() => <Aboutus leaders={this.props.leaders} />} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
