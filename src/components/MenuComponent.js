import React from 'react';
import  { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LodingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ dish }){
        return(
            <Card >
                    <Link to={`/menu/${dish.id}`} >
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Link>
            </Card>
        );
    }

    const Menu = (props) => {

        const menu = props.dishesh.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 mt-1">
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        });

        if(props.dishesh.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.dishesh.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishesh.errMess}</h4>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        }
    }

export default Menu;