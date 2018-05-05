import React, { Component } from 'react';
import NewDishForm from './NewDishForm';

class Inventory extends Component {
  state = {};
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>

        <NewDishForm addDish={this.props.addDish} />

        <button onClick={this.props.loadSamples}>Load Sample Dishes</button>
      </div>
    );
  }
}

export default Inventory;
