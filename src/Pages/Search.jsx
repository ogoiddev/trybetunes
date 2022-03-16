import React, { Component } from 'react';
import './CssPages/Search.css';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoToSearch: '',
      info: '',
      objectAlbum: [],
      isDisabled: true,
      isLoading: false,
    };
  }

  handleInfoToSearch = ({ target: { value } }) => {
    this.setState({ infoToSearch: value }, this.handleValitationFill(value));
  }

  handleValitationFill = (value) => {
    this.setState({ isDisabled: value.length < 2 });
  }

  handleClickToSeach = async () => {
    const { infoToSearch } = this.state;
    this.setState({ isLoading: true, info: infoToSearch, infoToSearch: '' });
    this.setState({ objectAlbum: await searchAlbumsAPI(infoToSearch) });
    this.setState({ isLoading: false });
  }

  render() {
    const { info, infoToSearch, isDisabled, isLoading, objectAlbum } = this.state;
    return (isLoading ? <Loading className="seach-loading" />
      : (
        <div className="search" data-testid="page-search">
          <Header className="header-search" />
          <section className="search-form">
            <input
              type="text"
              value={ infoToSearch }
              placeholder="Digite aqui para pesquisar"
              data-testid="search-artist-input"
              onChange={ this.handleInfoToSearch }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ this.handleClickToSeach }
              onKeyDown={ this.handleClickToSeach }
            >
              Pesquisar
            </button>
          </section>

          <section className="search-content">
            {!objectAlbum.length ? <p>Nenhum álbum foi encontrado</p>
              : (
                <>
                  <h1>{`Resultado de álbuns de: ${info}`}</h1>
                  <div className="albumCard-container">
                    {objectAlbum.map((each) => (
                      <Link
                        to={ `/album/${each.collectionId}` }
                        data-testid={ `link-to-album-${each.collectionId}` }
                        key={ `${each.artistId}-${each.collectionId}` }
                      >
                        <div id={ each.artistId } className="albumCard">
                          <img
                            src={ each.artworkUrl100 }
                            alt={ `Foto do album de ${each.collectionName}` }
                          />
                          <section className="albumCard-text">
                            <h3>{each.artistName}</h3>
                            <p>{`Album - ${each.collectionName}`}</p>
                            <p>{`${each.trackCount} - Faixas`}</p>
                          </section>
                          <p>{`R$ ${each.collectionPrice}`}</p>
                        </div>
                      </Link>))}
                  </div>
                </>)}
          </section>
        </div>)
    );
  }
}
