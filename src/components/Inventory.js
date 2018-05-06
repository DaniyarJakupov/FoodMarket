import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import NewDishForm from './NewDishForm';
import EditDishForm from './EditDishForm';
import Login from './Login';
import base, { firebaseApp } from '../utils/base';

class Inventory extends Component {
  authHandler = async authData => {
    console.log(authData);
  };

  authenticate = provider => {
    // provider: Github, Twitter, Facebook
    const authProvier = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvier)
      .then(this.authHandler);
  };

  render() {
    const { dishes, updateDish, deleteDish, addDish, loadSamples } = this.props;
    return <Login authenticate={this.authenticate} />;
    return (
      <div className="inventory">
        <h2>Inventory</h2>

        {Object.keys(dishes).map(key => {
          return (
            <EditDishForm
              dish={dishes[key]}
              key={key}
              id={key}
              updateDish={updateDish}
              deleteDish={deleteDish}
            />
          );
        })}
        <NewDishForm addDish={addDish} />

        <button onClick={loadSamples}>Load Sample Dishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  dishes: PropTypes.object.isRequired,
  updateDish: PropTypes.func.isRequired,
  deleteDish: PropTypes.func.isRequired,
  addDish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired
};

export default Inventory;
