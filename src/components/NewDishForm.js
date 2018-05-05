import React, { Component } from 'react';

const INIT_STATE = {
  name: '',
  price: 0,
  status: 'available',
  desc: '',
  image: ''
};

class NewDishForm extends Component {
  state = {
    ...INIT_STATE
  };

  onFormSubmit = e => {
    e.preventDefault();
    // Send data to App
    this.props.addDish(this.state);
    // Clear
    this.setState({ ...INIT_STATE });
  };

  onInputChange = e => {
    e.target.name === 'price'
      ? this.setState({ price: parseFloat(e.target.value) })
      : this.setState({
          [e.target.name]: e.target.value
        });
  };

  render() {
    return (
      <form action="" className="dish-edit" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.onInputChange}
          value={this.state.name}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={this.onInputChange}
          value={this.state.price}
        />

        <select
          name="status"
          onChange={this.onInputChange}
          value={this.state.status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>

        <textarea
          name="desc"
          placeholder="Desc"
          onChange={this.onInputChange}
          value={this.state.desc}
        />

        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={this.onInputChange}
          value={this.state.image}
        />

        <button type="submit">Add dish</button>
      </form>
    );
  }
}

export default NewDishForm;
