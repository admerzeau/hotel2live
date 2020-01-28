import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Hotel from './Hotel';

export default class Hotels extends Component {
    render() {
            let hotels = this.props.hotels.map(h => {
                return <Hotel key={h.id} hotel={h} onViewReviews={this.props.onViewReviews} />
            });

            if(hotels.length == 0)
            {
               hotels = <h3 style={{textAlign: 'center'}}> No hotels to show </h3>
            }
            
           return <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        {hotels}
                    </div>
                </div>
            </div>
    }
    
}