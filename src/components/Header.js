import React from 'react';

const Header = ({ title = 'Title', tagline = 'tagline' }) => {
  return (
    <header className="top">
      <h1>{title}</h1>
      <h3 className="tagline">
        <span>{tagline}</span>
      </h3>
    </header>
  );
};

export default Header;
