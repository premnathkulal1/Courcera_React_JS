import React, { Component } from 'react';
import  { Card, CardImg, CardImgOverlay, CardText, CardTitle, CardBody } from 'reactstrap';
import DishDetails from './DishdetailComponent'

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish){
        this.setState({selectedDish: dish});
    }

    renderDish(dish){
        return(
            <DishDetails prem_dish = {this.state.selectedDish} />
        );
    }

    render(){
        const menu = this.props.dishesh.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 mt-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });


        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDish(this.state.selectedDish)}
            </div>
        );
    }
}

export default Menu;