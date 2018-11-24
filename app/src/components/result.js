import React, { Component } from 'react';
import '../App.scss';

class Result extends Component {
    constructor(){
        super();
    }
    render() {
        return(
            <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    {this.props.food_name}
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    {this.props.serving}
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <button onClick={this.props.nutritions.bind(this)} id={this.props.food_name} className="btn btn-warning"> More... </button>
                </div>
            </div>
        )
    }
}

export default Result;