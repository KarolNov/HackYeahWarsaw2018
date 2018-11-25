import React, { Component } from 'react';
import axios from 'axios';


class Meal extends Component{
    render(){
        return( <div> {this.props.name} {this.props.time} {this.props.weight} </div> );
    }
}

class Meals extends Component{
    state = {
        history: []
    };

    generateMeals = () => {
        if(this.state.history.length>1){
            let res = []
            for(let i=0; i<this.state.history.length; i++){
                res.push(<div class="col-lg-4">{this.state.history[i].name}</div>);
                res.push(<div class="col-lg-4">{this.state.history[i].time}</div>);
                res.push(<div class="col-lg-4">{this.state.history[i].weight}</div>);
            }
            return res;
        }
    }

    getHistory = async ()=>{
        try{
            await axios.get("http://9d8df753.ngrok.io/api/meals")
            .then((d)=>{
                const list = d.data.data;
                let results = []
                console.log(list);
                for(let i=0; i<list.length; i++){
                    results.push({ name: list[i].name,
                                       time: list[i].created_at,
                                       weight: list[i].weight});
                }
                this.setState({history: results});
            })
        }catch(err){
            console.log(err);
        }
    }
    render() {
        return(
            <div>
            <button onClick={this.getHistory}></button>
            <div className="wraper">
             <div className="main">
                 <div className="container">
                    {this.generateMeals()}
                 </div>
             </div>
            </div>
            </div>
        )
    }
}

export default Meals;