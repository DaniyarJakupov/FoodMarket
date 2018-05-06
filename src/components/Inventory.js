import React, { Component } from 'react';
import NewDishForm from '../containers/NewDishForm';
import EditDishForm from '../containers/EditDishForm';

class Inventory extends Component {
  state = {};
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>

        {Object.keys(this.props.dishes).map(key => {
          return (
            <EditDishForm
              dish={this.props.dishes[key]}
              key={key}
              id={key}
              updateDish={this.props.updateDish}
              deleteDish={this.props.deleteDish}
            />
          );
        })}
        <NewDishForm addDish={this.props.addDish} />

        <button onClick={this.props.loadSamples}>Load Sample Dishes</button>
      </div>
    );
  }
}

export default Inventory;
