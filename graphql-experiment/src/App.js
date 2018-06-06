import React, { Component } from 'react';
import './App.css';
import ListContainer from './ListContainer';
import ListFlatContainer from './ListFlatContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Optimistic</h2>
        <ListContainer optimistic />
        <h2>Non-Optimistic</h2>
        <ListContainer />
        <h2>Non-Optimistic with Gray Out</h2>
        <ListContainer grayOut />
        <h2>Update Whole Array</h2>
        <ListFlatContainer />
      </div>
    );
  }
}

export default App;
