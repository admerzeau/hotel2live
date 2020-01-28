import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Hotel extends Component {
    
    constructor(props) {
        super(props);
        this.handleViewReviews = this.handleViewReviews.bind(this);
    }

    handleViewReviews(event) {
        event.preventDefault();
        this.props.onViewReviews(this.props.hotel.id);
    }
    
    render() {
        return (
                <div className="container">
                    <div className="card card-spacing">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4 d-none d-sm-block"> 
                                    <img className="img-fluid rounded img-thumbnail" src="/img/dummy-hotel.jpg" />
                                </div>
                                <div className="col-12 col-md-8 col-sm-8">  
                                    <div className="row">
                                        <div className="col-12"> <h3 className="card-title"> {this.props.hotel.name} </h3> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"> <p className="card-text" style={{marginTop:"0.5em", marginBottom:"0.5em"}}>  {this.props.hotel.description}  </p></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">  
                                            <button type="button" onClick={this.handleViewReviews} className="btn btn-primary">
                                                Reviews <span className="badge badge-light">{this.props.hotel.reviews_count}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}