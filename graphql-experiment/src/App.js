import React, { Component } from 'react';
import './App.css';
import ListContainer from './ListContainer';
import ListFlatContainer from './ListFlatContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>GraphQL Demo: The Power of Individual Mutations</h1>
        
        <h2>Individual Row Mutation</h2>
        <div class="demo">
          <div class="example">
            <h3>Optimistic</h3>
            <ListContainer optimistic />
          </div>
          <div class="example">
            <h3>Non-Optimistic</h3>
            <ListContainer />
          </div>
          <div class="example">
            <h3>Non-Optimistic, Grayed Out</h3>
            <ListContainer grayOut />
          </div>
        </div>

        <h2>Array Mutation</h2>
        <div class="demo">
          <div class="example">
            <h3>Optimistic</h3>
            <ListFlatContainer optimistic />
          </div>
          <div class="example">
            <h3>Non-Optimistic</h3>
            <ListFlatContainer />
          </div>
          <div class="example">
            <h3>Non-Optimistic, Grayed Out</h3>
            <ListFlatContainer grayOut />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
