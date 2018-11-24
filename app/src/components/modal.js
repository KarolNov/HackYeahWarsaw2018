import React, { Component } from 'react';
import '../App.css';

class Modal extends Component{
   showModals = () =>{
    let res = [];
   }

    render(){
        return(
            <div>
                <p> MODAL </p>
                <p>{this.props.value[0].water}</p>
                <p>{this.props.value[0].sodium}</p>
                <p>{this.props.value[0].potassium}</p>
                <p>{this.props.value[0].fat}</p>
                <p>{this.props.value[0].proteins}</p>
                <p>{this.props.value[0].carbohydrates}</p>
                <p>{this.props.value[0].sugar}</p>
            </div>
        )
    }
}

export default Modal;