import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from "../data/secrets.js";
import nutritions_data from "../nutritions-data";


class Meal extends Component{
    render(){
        return(
                <div className="row">
                    <div className="col-lg-2"> {this.props.name}</div> 
                    <div className="col-lg-2">{this.props.time}</div>
                    <div className="col-lg-2">{this.props.weight}</div>
                    <div className="col-lg-2">{this.props.water}</div>
                    <div className="col-lg-2">{this.props.sodium}</div>

                </div>
               );
    }
}

class Meals extends Component{
    state = {
        history: [
            {
            name: "What",
            time: "When",
            weight: "How much",
            calories: "Calories",
            total_fat: "Total fat",
            cholesterol: "Cholesterol",
            sodium: "Sodium",
            total_carbohydrate: "Sodium",
            dietary_fiber: "Fibers",
            sugar: "Sugars",
            protein: "Proteins",
            potasium: "Potassium", 
            water: "Water"
            }
        ],
        modal: false
    };

    generateMeals = () => {
        if(this.state.history.length>1){
            let res = [];
            for(let i=0; i<this.state.history.length; i++){
                res.push(<Meal name={this.state.history[i].name} time={this.state.history[i].time}
                 weight={this.state.history[i].weight}/>);
            }
            return res;
        }
    }

    getHistory = async ()=>{
        try{
            await axios.get("http://hckyea.herokuapp.com/api/meals")
            .then((d)=>{
                const list = d.data.data;
                let results = [{
                    name: "What",
                    time: "When",
                    weight: "How much",
                    calories: "Calories",
                    total_fat: "Total fat",
                    cholesterol: "Cholesterol",
                    sodium: "Sodium",
                    total_carbohydrate: "Sodium",
                    dietary_fiber: "Fibers",
                    sugar: "Sugars",
                    protein: "Proteins",
                    potasium: "Potassium", 
                    water: "Water"
                }]
                for(let i=0; i<list.length; i++){
                    let obj = { name: list[i].name,
                        time: list[i].created_at,
                        weight: list[i].weight
                        }
                    let details = this.getDetails(i);
                    let merged = {...obj, ...details};
                    results.push(merged);
                }                    

                this.setState({history: results,
                               modal: !this.state.modal});
            });
        }catch(err){
            console.log(err);
        }
    }

    getDetails = async (i) => {
        const id = i.toString();
        try{
            await axios.get(`http://hckyea.herokuapp.com/api/meals/${id}`)
          .then((d)=>{
            let data = d.data.data.nutrients;
            return data;
            }
        );
        } catch(err) {
            console.log(err);
        }
    }
    render() {
        return(
            <div>
            <button onClick={this.getHistory} class="btn btn-warning">What I ate?</button>
            <Modal isOpen={this.state.modal} toggle={this.getHistory.bind(this)} role="dialog" fade={!this.state.modal}
            className="modal_history"
            >
                <ModalHeader toggle={this.getHistory.bind(this)}>History of meals</ModalHeader>
                <ModalBody>
                    {this.generateMeals()}
                </ModalBody>
              </Modal>
            </div>
        )
    }
}

export default Meals;