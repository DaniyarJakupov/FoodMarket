import React, { Component } from 'react';
import { getFunName } from '../utils/helpers';

class StorePicker extends Component {
  state = {
    inputValue: ''
  };

  componentDidMount() {
    this.input.focus();
    this.setState({ inputValue: getFunName() });
  }

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/store/${this.state.inputValue}`);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <form action="" className="store-selector" onSubmit={this.onSubmit}>
        <h2>Enter A Store</h2>
        <input
          type="text"
          placeholder="Store Name"
          ref={input => (this.input = input)}
          value={inputValue}
          onChange={this.onInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default StorePicker;
