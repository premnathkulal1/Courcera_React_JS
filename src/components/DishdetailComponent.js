import React, { Component } from 'react';
import  { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LodingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleModal();
    }

    render() {
        return (
            <div>
                <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment </Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}> Rating </Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderComment({dish, postComment, dishId}){
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
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

function RenderDish({dish}){
    return (
        <div className="col-12 col-md-5 mt-1">
            <Card>
                <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

const DishDetails = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null){

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
                        <RenderComment 
                            dish={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
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