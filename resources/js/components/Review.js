import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Review extends Component {
    render() {
        return (
                        <div className="container">
                            <div className="card card-spacing">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-2 d-none d-sm-block"> 
                                            <img className="rounded-circle img-fluid" src="/img/dummy-user.png"/> 
                                        </div>
                                        <div className="col-12 col-md-10 col-sm-10">  
                                            <div className="row">
                                                <div className="col-12"> <h3> <b> {this.props.review.user.name} </b> </h3> </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12"> <h6>  { new Date(this.props.review.created_at).toLocaleString() } </h6> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"> <p className="card-text" style={{marginTop:"0.5em", marginBottom:"0.5em"}}> {this.props.review.review} </p>  </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        );
    }
}