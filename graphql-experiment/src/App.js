import React, { Component } from 'react';
import './App.css';
import ListContainer from './ListContainer';
import ListFlatContainer from './ListFlatContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Individual - Optimistic</h2>
        <ListContainer optimistic />
        <h2>Individual - Non-Optimistic</h2>
        <ListContainer />
        <h2>Individual - Non-Optimistic, Grayed Out</h2>
        <ListContainer grayOut />
        <h2>Array - Optimistic</h2>
        <ListFlatContainer optimistic />
        <h2>Array - Non-Optimistic</h2>
        <ListFlatContainer />
        <h2>Array - Non-Optimistic, Grayed Out</h2>
        <ListFlatContainer grayOut />
      </div>
    );
  }
}

export default App;
