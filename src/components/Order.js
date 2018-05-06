import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { formatPrice } from '../utils/helpers';

class Order extends Component {
  calculateTotal = () => {
    // [dish1, dish2, dish3, ...]
    const orderName = Object.keys(this.props.order);

    const total = orderName.reduce((accumulator, currentValue) => {
      const dish = this.props.dishes[currentValue];
      const numberOfOrders = this.props.order[currentValue];
      const isAvailable = dish && dish.status === 'available';
      if (isAvailable) {
        return accumulator + dish.price * numberOfOrders;
      }
      return accumulator;
    }, 0);

    return formatPrice(total);
  };

  renderItem = () => {
    return Object.keys(this.props.order).map(order => {
      const dish = this.props.dishes[order];
      const numberOfOrders = this.props.order[order];
      const isAvailable = dish && dish.status === 'available';
      if (!dish) return null;
      if (isAvailable) {
        return (
          <CSSTransition
            classNames="order"
            key={dish.name}
            timeout={{ enter: 250, exit: 250 }}
          >
            <li>
              <span>
                <TransitionGroup component="span" className="count">
                  <CSSTransition
                    classNames="count"
                    key={numberOfOrders}
                    timeout={{ enter: 250, exit: 250 }}
                  >
                    <span>{numberOfOrders}</span>
                  </CSSTransition>
                </TransitionGroup>{' '}
                x {dish.name}: {formatPrice(numberOfOrders * dish.price)}
                <button onClick={() => this.props.delete(order)}>Remove</button>
              </span>
            </li>
          </CSSTransition>
        );
      }
      return (
        <CSSTransition
          classNames="order"
          key={dish.name}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={dish.name}>
            {dish ? dish.name : 'dish'} is no longer available
          </li>
        </CSSTransition>
      );
    });
  };

  render() {
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {this.renderItem()}
        </TransitionGroup>
        <div className="total">
          Total: <strong>{this.calculateTotal()}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
