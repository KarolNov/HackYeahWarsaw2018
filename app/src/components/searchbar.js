import React, { Component } from 'react';
import "../App.css";

class SearchBar extends Component {
    render(){
        return(
            <form onSubmit={this.props.getData}>
                <input type="text" name="search" placeholder="Wyszukaj..."/>
                <button> Search </button>
            </form>
        );
    }
}

export default SearchBar;