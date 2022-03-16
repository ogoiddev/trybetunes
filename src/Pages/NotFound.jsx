import React, { Component } from 'react';
import './CssPages/NotFound.css';
import logoTunes from '../images/logo-trybetunes_black.png';

export default class Notfound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notfound">
        <span className="image-container">
          <img src={ logoTunes } alt="Logo da TrybeTunes" />
        </span>
        <span className="notfound--mesage">
          <h1>Ops!</h1>
          <p>A página que você está procurando não foi encontrada</p>
        </span>
      </div>
    );
  }
}
