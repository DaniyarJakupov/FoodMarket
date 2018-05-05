import React, { Component } from 'react';

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="top">
        <h1>Dish of the day</h1>
        <h3 className="tagline">
          <span>Fresh Daily</span>
        </h3>
      </header>
    );
  }
}

export default Header;
