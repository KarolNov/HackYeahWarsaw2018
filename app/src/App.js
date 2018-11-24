import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import Result from './components/result';
import SearchBar from './components/searchbar';
import nutritions_data  from './nutritions-data';
import Details from './components/details';
import api from './data/secrets';

class Results extends Component {

  getResults = ()=>{ 
    if(this.props.list.length>1){
      const data = this.props.list;
      let n = data.length;
      let results = [];
      for(let i=0; i<n; i++){
        results.push(<Result food_name={data[i].food_name}
                                photo={data[i].photo.thumb}
                                serving={data[i].serving_unit}
                                nutritions={this.props.nutritions}
                                />);
      }
      return results;
    }
  }

  render() {
    return(
      <div className="wraper">
        <div className="main">
          <div className="container">
            {this.getResults()}
          </div>
        </div>
      </div>
    )
  }
}

class App extends Component {

  state = {
    food_list: [
      {
        food_name: "",
        serving_unit: "",
        photo: {thumb: ""},
        food_id: ""
      }
    ],
    food_values: [
      {
        name: "",
        sodium: "",
        carbohydrates: "",
        sugar: "",
        potassium: "",
        fat: "",
        proteins: "",
        water: ""
      }
    ],
    modal: false,
    error: undefined
    };

  toggleModal = () =>{
    this.setState({
      modal: !this.state.modal
    })
  }
  
  getNutritions = async (e)=>{
    const query = e.target.id.toString();
    const api_id = api[0];
    const api_key = api[1];
    try{
      await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, { 
            "query": query
          },{ headers: {
            'x-app-id': api_id,
            'x-app-key': api_key,
            'x-remote-user-id': 0
        }})
      .then((d)=>{
        let tab = [];
        for(let i=0; i<nutritions_data.length; i++){
        tab.push(
        nutritions_data[i].name + " " +
        d.data.foods[0].full_nutrients.filter(el => el.attr_id === nutritions_data[i].attr_id)[0].value +
        " " + nutritions_data[i].unit       
        );
        }
        this.setState({
          food_values: [
            {
              name: query,
              sodium: tab[3],
              carbohydrates: tab[1],
              sugar: tab[2],
              potassium: tab[6],
              fat: tab[4],
              proteins: tab[5],
              water: tab[0]
            }
          ],
          modal: !this.state.modal,
          error: ""
        });
        console.log(this.state);
      });       
     } catch(err){
      console.error(err);
    }
  }

  getData = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    const api_id = api[0];
    const api_key = api[1];
        try{
            await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
                headers: {
                    'x-app-id': api_id,
                    'x-app-key': api_key,
                    'x-remote-user-id': 0
                }
            })
            .then((d)=>{
              this.setState({ 
                food_list: d.data.common,
                error: ""
              });
            });            
        } catch(err){
            console.error(err);
        }
  }

  render() {
    return (
     <div>
       <SearchBar getData={this.getData}/>
       <Results list={this.state.food_list} nutritions={this.getNutritions}/>
       <Details value={this.state.food_values} toggle={this.toggleModal} state={this.state.modal}/>
     </div> 
    );
  }
}

export default App;
