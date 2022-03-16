import React, { Component } from 'react';
import './CssPages/Album.css';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackMusics: [],
      album: {},
    };
  }

  componentDidMount() {
    this.handleAlbumTracks();
  }

  handleAlbumTracks = async () => {
    const { match: { params } } = this.props;
    const [album, ...trackMusics] = await getMusics(params.id);
    this.setState({ trackMusics, album });
  }

  render() {
    const { trackMusics, album } = this.state;
    return (
      <div className="album" data-testid="page-album">
        <Header className="header-album" />
        <section className="album-section">
          <div className="image-and-title">

            <span className="img-span">
              <img
                src={ album.artworkUrl100 }
                alt="Foto Capa do Album"
              />
            </span>

            <h1 data-testid="artist-name">{ album.artistName }</h1>
            <h3 data-testid="album-name">{ album.collectionName }</h3>

          </div>
          <div className="div-tracks">
            {trackMusics
              .map((track, index) => (<MusicCard
                key={ track.trackId }
                trackInfo={ track }
                index={ index }
              />))}
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape('n').isRequired,
};
