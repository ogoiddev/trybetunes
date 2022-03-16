import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Components/Content';
import Footer from './Components/Footer';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
        <Content />
        <Footer />
        </BrowserRouter>
      </div>);
  }
}
