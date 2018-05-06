import React, { Component } from 'react';

class EditDishForm extends Component {
  onInputChange = e => {
    const updatedDish = { ...this.props.dish, [e.target.name]: e.target.value };
    this.props.updateDish(this.props.id, updatedDish);
  };

  render() {
    const { name, image, price, status, desc } = this.props.dish;
    return (
      <div className="dish-edit">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={this.onInputChange}
          value={name}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={this.onInputChange}
          value={price}
        />

        <select name="status" onChange={this.onInputChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>

        <textarea
          name="desc"
          placeholder="Desc"
          onChange={this.onInputChange}
          value={desc}
        />

        <input
          type="text"
          name="image"
          placeholder="Image"
          onChange={this.onInputChange}
          value={image}
        />
      </div>
    );
  }
}

export default EditDishForm;
