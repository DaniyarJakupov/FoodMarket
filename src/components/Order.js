import React, { Component } from 'react';

import { formatPrice } from '../utils/helpers';

class Order extends Component {
  state = {};

  calculateTotal = () => {
    // [dish1, dish2, dish3, ...]
    const orderName = Object.keys(this.props.cart);

    const total = orderName.reduce((accumulator, currentValue) => {
      const dish = this.props.dishes[currentValue];
      const numberOfOrders = this.props.cart[currentValue];
      const isAvailable = dish && dish.status === 'available';
      if (isAvailable) {
        return accumulator + dish.price * numberOfOrders;
      }
      return accumulator;
    }, 0);

    return formatPrice(total);
  };

  renderItem = () => {
    return Object.keys(this.props.cart).map(order => {
      const dish = this.props.dishes[order];
      const numberOfOrders = this.props.cart[order];
      if (dish.status === 'available') {
        return (
          <li key={dish.name}>
            {numberOfOrders}x{dish.name}:{' '}
            {formatPrice(numberOfOrders * dish.price)}
          </li>
        );
      }
      return (
        <li key={dish.name}>
          {dish ? dish.name : 'dish'} is no longer available
        </li>
      );
    });
  };

  render() {
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{this.renderItem()}</ul>
        <div className="total">
          Total: <strong>{this.calculateTotal()}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
