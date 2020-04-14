import React from 'react';
import  { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';


    function RenderComment({dish}){
        const comments_details = dish.comments.map((dish_comment) => {
            return(
                <div tag="li" key={dish_comment.id}>
                <p>{dish_comment.comment}</p>
                <p>-- {dish_comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish_comment.date)))}</p>
                </div>
            );
        });
        return (
            <div className="container">
                {comments_details}
            </div>
        );
    }

    function RenderDish({dish}){
        return (
            <div className="col-12 col-md-5 mt-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    const DishDetails = (props) => {

        var dish = props.prem_dish;
        if(dish != null){

            return (
                
                <div className="container">
                    <div className="row">
                        <RenderDish dish={dish} />
                        <div key={dish.id} className="col-12 col-md-5 mt-1">
                            <h3>Comments</h3>
                            <RenderComment dish={dish} />
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

export default DishDetails;