import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Result from './components/result';
import SearchBar from './components/searchbar';

class Results extends Component {
  getResults = (n)=>{
    let results = [];
    for(let i=0; i<n; i++){
      let result = [];
      for(let j=0; j<4; j++){
        result.push(<td><Result /></td>)
      }
      results.push(<tr>{result}</tr>);
    }
    return results;
  }
  render() {
    return(
      <table className="results">
        {this.getResults(5)}
      </table>
    )
  }
}

class App extends Component {
  getData = async (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    const api_id = "2e09961a";
    const api_key = "27bf0fa3c3808394eeb56c3d18f99c2d";
        try{
            const api_call = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
                headers: {
                    'x-app-id': api_id,
                    'x-app-key': api_key,
                    'x-remote-user-id': 0
                }
            })
            .then((d)=>{
              console.log(d.data.common);
            });            
        } catch(err){
            console.error(err);
        }
  }

  render() {
    return (
     <div>
       <SearchBar getData={this.getData}/>
       <Results showData={this.showData}/>
     </div> 
    );
  }
}

export default App;
