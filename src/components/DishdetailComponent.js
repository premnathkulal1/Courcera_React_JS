import React, { Component } from 'react';
import  { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

class DishDetails extends Component {
    constructor(props){
        super(props);
    }

    render(){
        var dish = this.props.prem_dish;
            if(dish != null){
            const comments_details = this.props.prem_dish.comments.map((dish_comment) => {
                return (
                    <div tag="li">
                        <p>{dish_comment.comment}</p>
                        <p>-- {dish_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish_comment.date)))}</p>
                    </div>
                );
            });

            return (
                
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 mt-1">
                            <Card>
                                <CardImg width="100%" src={dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>

                        <div key={dish.id} className="col-12 col-md-5 mt-1">
                            <h3>Comments</h3>
                            {comments_details}
                        </div>

                    </div>
                </div>

            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

}

export default DishDetails;