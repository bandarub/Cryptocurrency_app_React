import React, { Component } from 'react';
import './App.css';
import CoinsList from './components/comp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
                    <div className="App-header">
                        <h2>Cryptocurrency Application</h2>
                    </div>
                    <CoinsList />
                </div>
    );
  }
}
export default App;
