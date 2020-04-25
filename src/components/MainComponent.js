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
import { postComment, fetchDidhes, fetchPromos, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import  { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishesh : state.dishesh,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDidhes: () => {dispatch(fetchDidhes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},

});

class Main extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDidhes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){ 
    const HomePage = () => {
      return(
        <Home 
          dish = {this.props.dishesh.dishes.filter((dish) => dish.featured)[0]}
          dishesLosding={this.props.dishesh.isLoading}
          dishesErrMess={this.props.dishesh.errMess}
          promotion = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLosding={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader = {this.props.leaders.filter((leader) => leader.featured)[0]} 
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetails 
          dish={this.props.dishesh.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishesh.isLoading}
          errMess={this.props.dishesh.errmess} 
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          CommentsErrMess={this.props.comments.errmess} 
          postComment={this.props.postComment}
        /> 
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishesh={this.props.dishesh} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/aboutus" component={() => <Aboutus leaders={this.props.leaders} />} />
              <Route exact path="/contactus" component={ () => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> } />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
