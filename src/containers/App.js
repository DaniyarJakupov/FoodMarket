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
    order: {}
  };
  /* === Lifecycle methods === */
  componentDidMount() {
    // Sync and get dishes from firebase
    this.ref = base.syncState(`${this.props.match.params.storeId}/dishes`, {
      context: this,
      state: 'dishes'
    });
    // Grab order data from localStorage
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    localStorageRef &&
      this.setState({
        order: { ...JSON.parse(localStorageRef) }
      });
  }

  componentDidUpdate() {
    // Update order in localStorage
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  /* ================================================================= */
  /* === order methods === */
  addToOrder = key => {
    !this.state.order[key]
      ? this.setState(prevState => ({
          order: { ...prevState.order, [key]: 1 }
        }))
      : this.setState(prevState => ({
          order: { ...prevState.order, [key]: prevState.order[key] + 1 }
        }));
  };

  deleteFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
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

  deleteDish = key => {
    this.setState(prevState => ({
      dishes: { ...prevState.dishes, [key]: null }
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
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>

        <Order
          dishes={this.state.dishes}
          order={this.state.order}
          delete={this.deleteFromOrder}
        />

        <Inventory
          addDish={this.addDish}
          updateDish={this.updateDish}
          deleteDish={this.deleteDish}
          loadSamples={this.loadSampleDishes}
          dishes={this.state.dishes}
        />
      </div>
    );
  }
}

export default App;
