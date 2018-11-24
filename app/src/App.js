import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Result from './components/result';
import SearchBar from './components/searchbar';
import nutritions_data  from './nutritions-data';
import Modal from './components/modal';

class Results extends Component {

  getResults = ()=>{ 
    const data = this.props.list;
    let n = data.length;
    let results = [];
    for(let i=0; i<n; i++){
      results.push(<Result food_name={data[i].food_name}
                               photo={data[i].photo.thumb}
                               serving={data[i].serving_unit}
                               details={this.props.nutritions}
                               />);
    }
    return results;
  }

  render() {
    return(
      <table className="results">
      <tbody>
        {this.getResults()}
      </tbody>
      </table>
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
        sodium: "",
        carbohydrates: "",
        sugar: "",
        potassium: "",
        fat: "",
        proteins: "",
        water: ""
      }
    ],
    error: undefined
  }

  getNutritions = async (e)=>{
    const query = e.target.id.toString();
    const api_id = "2e09961a";
    const api_key = "27bf0fa3c3808394eeb56c3d18f99c2d";
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
              sodium: tab[3],
              carbohydrates: tab[1],
              sugar: tab[2],
              potassium: tab[6],
              fat: tab[4],
              proteins: tab[5],
              water: tab[0]
            }
          ],
          error: ""
        });
      });            
    } catch(err){
      console.error(err);
    }
  }

  getData = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    const api_id = "2e09961a";
    const api_key = "27bf0fa3c3808394eeb56c3d18f99c2d";
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
       <Modal value={this.state.food_values}/>
     </div> 
    );
  }
}

export default App;
