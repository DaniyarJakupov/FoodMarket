import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

import NewDishForm from './NewDishForm';
import EditDishForm from './EditDishForm';
import Login from './Login';
import base, { firebaseApp } from '../utils/base';

class Inventory extends Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    // 1. Find current store in firebase
    const store = await base.fetch(this.props.match.params.storeId, {
      context: this
    });
    // 2. Assign store to the currently logged in user if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.match.params.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Save owner info and current user info
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  authenticate = provider => {
    // provider: Github, Twitter, Facebook
    const authProvier = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvier)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
      owner: null
    });
  };

  render() {
    const { dishes, updateDish, deleteDish, addDish, loadSamples } = this.props;
    const logout = <button onClick={this.logout}>Logout</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    if (this.state.uid === this.state.owner) {
      return (
        <div className="inventory">
          <h2>Inventory</h2>
          {logout}
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
    return (
      <div>
        <p>You don't have access to this section</p>
        {logout}
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

export default withRouter(Inventory);
