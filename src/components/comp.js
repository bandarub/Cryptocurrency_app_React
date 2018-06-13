import React, { Component } from "react";
import axios from "axios";
import comp from './comp.css';

class CoinsList extends Component {
  constructor(props) {
    super(props);
   this.searchFunction=this.searchFunction.bind(this);
   
    this.state = {  
        sorted_state : 'price',    
        data: []
    };
    this.newData = []  ;
  }
  componentDidMount() {
    this.fetchCryptocurrencyData();
  }
  fetchCryptocurrencyData() {
    axios
      .get("https://api.coinmarketcap.com/v1/ticker/")
      .then(response => {
        this.setState({ data: response.data});
        this.newData = response.data;
      })
      .catch(err => console.log(err));
  }  
sortBy = (type) => {
    if (this.state.sorted_state !== type){
      if (type === 'name') {
        this.state.data.sort((a,b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else {
            return 1;
          }
        })
      } else {
        this.setState({
          data: this.state.data.sort((a,b) => {
            return a[type] - b[type];
          })
        })
      } 
    } else {
      this.setState({
        data: this.state.data.reverse()
      })
    }
    this.setState({sorted_state: type}) 
  }
    searchFunction(event)
    {    
     this.setState({data:this.newData.filter(d =>
        {
          return (d.name.toLowerCase()).includes(event.target.value.toLowerCase());
        })});    
    }   
  render() {
    const { data } = this.state;  
    console.log(data.length)  ;
    return (
      <div>
        <div className="search-container">
          <input
            type="text"
            id="myInput"
            onChange={this.searchFunction}
            placeholder="Search for coins...."
            ref={searchInput=>this.searchInput=searchInput}/>
        </div>
        <div className='buttons-container'>
            <button className = 'button' onClick={() =>this.sortBy('price_usd')}  id = 'priceButton'>
                Price
            </button>
            <button className = 'button' onClick={() =>this.sortBy('name')} id = 'nameButton'>
                Name            
            </button>
            <button className = 'button' onClick={() =>this.sortBy('rank')} id = 'rankButton'>
                Rank            
            </button>
        </div>  
        <p>Found <b>{data.length} </b> coins</p>     
        <div className="crypto_coins">
          {data.map(coins => (
            <ul key = {coins.id} className="crypto_coins_list"> 
                <div className='data'>
                    <h2 className="cryptocurrency-name">{coins.name} ({coins.symbol})</h2>               
                    <p>Rank:{coins.rank}</p>
                    <p>Price:{coins.price_usd}</p>
                    <p>PercentageChange:{coins.percent_change_24h}</p>
                </div>
            </ul>
        ))}      
        </div>
      </div>
    );
  }
}
export default CoinsList;