import React, { Component } from 'react';
import '../App.css';

class Result extends Component {
    state = {
        show: false
    };
    showModal = (data) =>{
       
    }
    render() {
        return(
            <tr>
            <td>
                {this.props.food_name}
            </td>
            <td>
                <img src={this.props.photo} alt=''/>
            </td>
            <td>
                {this.props.serving}
            </td>
            <td>
                <button onClick={this.props.details} id={this.props.food_name}> More... </button>
            </td>
            </tr>
        )
    }
}

export default Result;