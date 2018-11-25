import React, { Component } from 'react';
import "../App.scss";

class SearchBar extends Component {
    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-8">
                    <form onSubmit={this.props.getData} action="" className="search-form">
                        <div className="form-group has-feedback">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input type="text" className="form-control" name="search" id="search" placeholder="search"/>
                            <span className="glyphicon glyphicon-search form-control-feedback"></span>
                        </div>
                        <button className="search-button"></button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default SearchBar;