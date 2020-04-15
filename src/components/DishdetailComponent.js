import React from 'react';
import  { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'


    function RenderComment({dish}){
        const comments_details = dish.map((dish_comment) => {
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

        if(props.dish != null){

            return (
                
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <div key={props.dish.id} className="col-12 col-md-5 mt-1">
                            <h3>Comments</h3>
                            <RenderComment dish={props.comments} />
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