import React from 'react';

class Square extends React.Component {
  render () {
    const value = this.props.value;
    return (
      <button className="square" onClick={ () => this.props.onClick() }>
        { this.props.value }
      </button>
    );
  }
}

export default Square;