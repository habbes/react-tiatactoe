import React from 'react';

export default class Square extends React.Component {
  render() {
    const value = this.props.value;
    return (
      <button className="square" onClick={ () => alert('Clicked ' + value) }>
        { this.props.value }
      </button>
    );
  }
}