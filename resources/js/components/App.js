import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Hotels from './Hotels';
import Reviews from './Reviews';
import Comment from './Comment';

export default class App extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            loading: true,
            router: { page : "hotels", params : "" }, 
            hotels: null,
            reviews: null,
        };

        this.handleViewReviews = this.handleViewReviews.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSeeAll = this.handleSeeAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getHotels();
    }


    handleViewReviews(id) {
        this.getReviews(id, 3);
        this.setState({loading: true});
    }

    handleBack() {
        this.changeRoute({ page: "hotels", params : null});
    }

    handleSeeAll(id) {
        this.setState({loading: true});
        this.getReviews(id);
    }

    handleSubmit(id, comment) {
        this.setComment(id, comment);
    }

    changeRoute(route)
    {
        //Change browser location to
        //Allow to use the URL as location in the SPA
        //TODO
        this.setState({router: route});
    }

    getHotels(){
        axios.get('/api/hotels').then(response => {
            this.setState({ hotels : response.data, loading : false})
        }).catch(function(error){
           console.log(error);
        });
    }

    getReviews(id, elements = null){
        
        axios.get('/api/reviews', {
                params: {
                    hotel: id,
                    elements: elements
                }
        }).then(response => {
            this.setState({ reviews : response.data, loading: false });
            this.changeRoute({ page: "reviews", params:id});
        }).catch(function(error){
            console.log(error);
        });

    }

    setComment(id, review)
    {
        axios.post('/reviews/create', {
                hotel: id,
                review: review
            }).then(response => {
                
                if(response.status == 201)
                {
                    this.getReviews(id, 3);
                    this.setState({loading: true});
                }

            }).catch(function(error){
                console.log(error);
            })
    }

    render(){

        if (this.state.loading) return <div style={{textAlign:"center"}}> <i className="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px"}}></i> </div>;
        
        if (this.state.router.page == "hotels")
        {
            return <Hotels hotels={this.state.hotels} onViewReviews={this.handleViewReviews} />
        }
        else
        {
            return ( 
                <div>
                    <Comment onSubmit={this.handleSubmit} idHotel={this.state.router.params} userLogged={this.props.userLogged} />
                    <Reviews idHotel={this.state.router.params} reviews={this.state.reviews} onBack={this.handleBack} onSeeAll={this.handleSeeAll} />
                </div>
            )
        }
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App userLogged={window.userLogged} />, document.getElementById('app'));
}

