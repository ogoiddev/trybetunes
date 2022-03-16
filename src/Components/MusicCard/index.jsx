import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../Pages/Loading';
import './style.css';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      checkSaveds: [],
    };
  }

  componentDidMount() {
    this.handleDataFavorites();
  }

  handleSaveFavorites = async ({ target: { checked } }) => {
    const { trackInfo, handleSetFavoritesPage } = this.props;
    if (!checked) {
      await removeSong(trackInfo);
    } else {
      await addSong(trackInfo);
    }
    this.handleDataFavorites();
    if (handleSetFavoritesPage) {
      handleSetFavoritesPage();
    }
  }

  handleDataFavorites = async () => {
    this.setState({ checkSaveds: await getFavoriteSongs() });
    this.setState({ isLoading: false });
  }

  render() {
    const { trackInfo: {
      previewUrl,
      key,
      trackName,
      trackId,
      artworkUrl100,
    }, index } = this.props;
    const { isLoading, checkSaveds } = this.state;
    const image = checkSaveds[index];
    return (
      <div className="cardTrack" key={ key }>

        <div className="image-title">
          <img
            src={ artworkUrl100 || { ...image }.artworkUrl100 }
            alt="Foto do Album"
            className="img-favorites"
          />
          <span className="track-title">{trackName}</span>
        </div>

        <div className="audio-and-check">
          <audio
            className="play"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
          </audio>
          <label htmlFor="favorites" className="checkbox-label">
            {isLoading ? <Loading className="checkbox-loanding" />
              : (
                <input
                  id="favorites"
                  name="favorites"
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  className="checkHeart"
                  checked={ checkSaveds.some((track) => track.trackId === trackId) }
                  onChange={ this.handleSaveFavorites }
                />
              )}
            Favorita
          </label>
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  handleSetFavoritesPage: PropTypes.func.isRequired,
  trackInfo: PropTypes.shape('n').isRequired,
  index: PropTypes.number.isRequired,
};
