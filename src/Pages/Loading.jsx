import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CssPages/Loading.css';

export default class Loading extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={ className }>
        <h1>Carregando...</h1>
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string.isRequired,
};
