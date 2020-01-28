import React, { Component } from 'react';
import Review from "./Review";

export default class Reviews extends Component {
    
    constructor(props){
        super(props);
        this.handleSeeAll = this.handleSeeAll.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleSeeAll(event){
        event.preventDefault();
        this.props.onSeeAll(this.props.idHotel);
    }

    handleBack(event) {
        event.preventDefault();
        this.props.onBack();
    }
    
    render() {
            const reviews = this.props.reviews.map(r => {
                return <Review key={r.id} review={r} />
            });

            return (<div className="container">
                        <div className="row justify-content-end">
                            <div className="col-md-6">
                                <h2> Reviews </h2>
                            </div>
                            <div className="col-auto col-md-3">
                                <a className="nav-link" href="#" onClick={this.handleBack} ><h4 style={{textAlign:"end"}}> Back </h4> </a>
                            </div>
                            <div className="col-auto col-md-3">
                                <a className="nav-link active" href="#" onClick={this.handleSeeAll} > <h4 style={{textAlign:"end"}}>  See all </h4></a>
                            </div>
                        </div>
                        <div className="row">
                            {reviews}
                        </div>
                    </div>
                );
    }
}
