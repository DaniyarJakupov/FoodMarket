import React, { Component } from 'react';

import Header from '../components/Header';
import Order from '../components/Order';
import Inventory from '../components/Inventory';
import sampleData from '../utils/samples';

class App extends Component {
  state = {
    dishes: {},
    order: {}
  };

  addDish = dish => {
    this.setState(prevState => ({
      dishes: { ...prevState.dishes, [`Dish${Date.now()}`]: dish }
    }));
  };

  loadSampleDishes = () => {
    this.setState({ dishes: sampleData });
  };

  render() {
    return (
      <div className="dish-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Market!" title="Dish of the day" />
        </div>
        <Order />
        <Inventory addDish={this.addDish} loadSamples={this.loadSampleDishes} />
      </div>
    );
  }
}

export default App;
