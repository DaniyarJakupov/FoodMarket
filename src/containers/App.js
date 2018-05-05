import React, { Component } from 'react';

import Header from '../components/Header';
import Order from '../components/Order';
import Inventory from '../components/Inventory';
import Dish from '../components/Dish';
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

  addToCard = name => {
    !this.state.order[name]
      ? this.setState(prevState => ({
          order: { ...prevState.order, [name]: 1 }
        }))
      : this.setState(prevState => ({
          order: { ...prevState.order, [name]: prevState.order[name] + 1 }
        }));
  };

  render() {
    return (
      <div className="dish-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Market!" title="Dish of the day" />
          <ul className="dishes">
            {Object.keys(this.state.dishes).map(dish => {
              return (
                <Dish
                  key={dish}
                  {...this.state.dishes[dish]}
                  addToCard={this.addToCard}
                />
              );
            })}
          </ul>
        </div>
        <Order />
        <Inventory addDish={this.addDish} loadSamples={this.loadSampleDishes} />
      </div>
    );
  }
}

export default App;
