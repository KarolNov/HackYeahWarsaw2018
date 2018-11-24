import React, { Component } from 'react';
import '../App.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Details extends Component{
       
    render(){
        return(
            <div>
               <Modal isOpen={this.props.state} toggle={this.props.toggle.bind(this)} role="dialog" fade={!this.props.state}>
                <ModalHeader toggle={this.props.toggle.bind(this)}>{this.props.value[0].name}</ModalHeader>
                <ModalBody>
                 <p>{this.props.value[0].water}</p>
                 <p>{this.props.value[0].sodium}</p>
                 <p>{this.props.value[0].potassium}</p>
                 <p>{this.props.value[0].fat}</p>
                 <p>{this.props.value[0].proteins}</p>
                 <p>{this.props.value[0].carbohydrates}</p>
                 <p>{this.props.value[0].sugar}</p>
                </ModalBody>
                </Modal>
            </div>
            // <div>
            //     
            // </div>
        )
    }
}

export default Details;