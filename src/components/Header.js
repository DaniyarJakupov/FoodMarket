import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title = 'Title', tagline = 'tagline' }) => (
  <header className="top">
    <h1>{title}</h1>
    <h3 className="tagline">
      <span>{tagline}</span>
    </h3>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired
};

export default Header;
