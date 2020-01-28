import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Comment extends Component {
    
    constructor(props) {
        super(props);
        this.state = {comment: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.comment){
            alert('Write your review first');
        }
        else{
            this.props.onSubmit(this.props.idHotel, this.state.comment);
        }
    }
    
    render() {

        if(this.props.userLogged == false)
        {
            return (
                    <div className="container">
                        <h4 style={{textAlign: 'center'}}> You must be logged to comment </h4>
                        <br/>
                    </div>
            );
        }
                
        return (
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fa fa-comment"></i>
                                        </div>
                                    </div>
                                    <input type="text" className="form-control form-control-lg" placeholder="Write your comment" value={this.state.comment} onChange={this.handleChange}/> 
                                </div>
                            </div>
                        </div>

                        
                        <div className="form-row justify-content-end">
                            <div className="col-auto form-group">
                                <button type="submit" className="btn btn-primary btn-lg" disabled={!this.state.comment}> Comment </button>
                            </div>
                        </div>
                    </form>
                    <br/>
                </div>
        );
    }
}