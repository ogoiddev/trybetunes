import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../../Pages/Login';
import Album from '../../Pages/Album';
import NotFound from '../../Pages/NotFound';
import Search from '../../Pages/Search';
import Favorites from '../../Pages/Favorites';
import Profile from '../../Pages/Profile';
import ProfileEdit from '../../Pages/ProfileEdit';
import Loading from '../../Pages/Loading';
import './styles.css';

export default class Content extends Component {
  render() {
    return (
      <main className="content-route">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/loading" component={ Loading } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
