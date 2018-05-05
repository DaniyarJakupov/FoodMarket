import React from 'react';

import { formatPrice } from '../utils/helpers';

const Dish = ({ name, image, desc, price }) => (
  <li className="menu-dish">
    <img src={image} alt={name} />
    <h3 className="dish-name">
      {name}
      <span className="price">{formatPrice(price)}</span>
    </h3>
    <p>{desc}</p>

    <button>Add to Card</button>
  </li>
);

export default Dish;
