import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../utils/helpers';

const Dish = ({ name, image, desc, price, status, addToOrder, id }) => {
  const available = status === 'available';

  return (
    <li className="menu-dish">
      <img src={image} alt={name} />
      <h3 className="dish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>

      <button disabled={!available} onClick={() => addToOrder(id)}>
        {available ? 'Add to Order' : 'Sold Out'}
      </button>
    </li>
  );
};

Dish.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
  addToOrder: PropTypes.func,
  id: PropTypes.string
};

export default Dish;
