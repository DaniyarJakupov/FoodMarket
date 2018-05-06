import React, { Component } from 'react';

import Header from '../components/Header';
import Order from '../components/Order';
import Inventory from '../components/Inventory';
import Dish from '../components/Dish';
import sampleData from '../utils/samples';

import base from '../utils/base';

class App extends Component {
  state = {
    dishes: {},
    cart: {}
  };

  componentDidMount() {
    this.ref = base.syncState(`${this.props.match.params.storeId}/dishes`, {
      context: this,
      state: 'dishes'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addDish = dish => {
    this.setState(prevState => ({
      dishes: { ...prevState.dishes, [`Dish${Date.now()}`]: dish }
    }));
  };

  loadSampleDishes = () => {
    this.setState({ dishes: sampleData });
  };

  addToCart = name => {
    !this.state.cart[name]
      ? this.setState(prevState => ({
          cart: { ...prevState.cart, [name]: 1 }
        }))
      : this.setState(prevState => ({
          cart: { ...prevState.cart, [name]: prevState.cart[name] + 1 }
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
                  id={dish}
                  {...this.state.dishes[dish]}
                  addToCart={this.addToCart}
                />
              );
            })}
          </ul>
        </div>
        <Order dishes={this.state.dishes} cart={this.state.cart} />
        <Inventory addDish={this.addDish} loadSamples={this.loadSampleDishes} />
      </div>
    );
  }
}

export default App;
