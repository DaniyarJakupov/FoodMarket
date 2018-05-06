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
  /* === Lifecycle methods === */
  componentDidMount() {
    // Sync and get dishes from firebase
    this.ref = base.syncState(`${this.props.match.params.storeId}/dishes`, {
      context: this,
      state: 'dishes'
    });
    // Grab cart data from localStorage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    localStorageRef &&
      this.setState({
        cart: { ...JSON.parse(localStorageRef) }
      });
  }

  componentDidUpdate() {
    // Update cart in localStorage
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.cart)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  /* ================================================================= */
  /* === Cart methods === */
  addToCart = key => {
    !this.state.cart[key]
      ? this.setState(prevState => ({
          cart: { ...prevState.cart, [key]: 1 }
        }))
      : this.setState(prevState => ({
          cart: { ...prevState.cart, [key]: prevState.cart[key] + 1 }
        }));
  };
  /* ================================================================= */
  /* === Inventory methods === */
  addDish = dish => {
    this.setState(prevState => ({
      dishes: { ...prevState.dishes, [`Dish${Date.now()}`]: dish }
    }));
  };

  updateDish = (key, updatedDish) => {
    this.setState(prevState => ({
      dishes: { ...prevState.dishes, [key]: updatedDish }
    }));
  };

  loadSampleDishes = () => {
    this.setState({ dishes: sampleData });
  };
  /* ================================================================= */

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

        <Inventory
          addDish={this.addDish}
          updateDish={this.updateDish}
          loadSamples={this.loadSampleDishes}
          dishes={this.state.dishes}
        />
      </div>
    );
  }
}

export default App;
