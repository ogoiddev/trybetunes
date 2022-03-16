import React, { Component } from 'react';
import Header from '../Components/Header';
import './CssPages/Favorites.css';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleSetFavoritesPage();
  }

  handleSetFavoritesPage = async () => {
    this.setState({ isLoading: true });
    this.setState({ favoriteSongs: await getFavoriteSongs() });

    this.setState({ isLoading: false });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    const times = 4;
    return (
      <div className="favorites" data-testid="page-favorites">
        <Header className="header-favorites" />
        {isLoading ? <Loading className="favorites-loading" />
          : (
            <section className="favorites-content">
              <div className="favorites-albums-image">
                {
                  [...Array(times)].map(() => favoriteSongs.map((track) => (
                    <img
                      key={track.trackId}
                      src={track.artworkUrl100}
                      alt={track.trackName}
                      className="img"
                    />
                  )))
                }

              </div>
              {favoriteSongs && favoriteSongs.map((track, index) => (
                <MusicCard
                  key={track.trackId}
                  trackInfo={track}
                  index={index}
                  handleSetFavoritesPage={this.handleSetFavoritesPage}
                />
              ))}
            </section>
          )}

      </div>
    );
  }
}
