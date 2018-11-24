import React, { Component } from 'react';
import "../App.scss";

class SearchBar extends Component {
    render(){
        return(
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-8">
                    <form onSubmit={this.props.getData} action="" className="search-form">
                        <div className="form-group has-feedback">
                            <label for="search" class="sr-only">Search</label>
                            <input type="text" class="form-control" name="search" id="search" placeholder="search"/>
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