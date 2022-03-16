import React, { Component } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoTunes from '../../images/logo-trybeTunes_white.png';
import { getUser } from '../../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Usuário',
      isLoading: false,
      image: '',
    };
  }

  componentDidMount() {
    this.setName();
  }

  setName = async () => {
    this.setState({ isLoading: true });
    const userObject = await getUser();
    this.setState({ userName: userObject.name });
    this.setState({ image: userObject.image });
    this.setState({ isLoading: false });
  }

  render() {
    const { userName, isLoading, image } = this.state;
    const { className } = this.props;
    return (
      <div className="header-container">
        <header data-testid="header-component">
          <span>
            <Link to="/">
              <img className="logo-link" src={ logoTunes } alt="Logo da TrybeTunes" />
            </Link>
          </span>
          <div>
            <span
              className="user-bottom"
              data-testid="header-user-name"
            >
              <img
                className={ image ? 'user-image' : 'user-image-none' }
                src={ image }
                alt="Perfil do usuario"
              />
              <span
                className="user-bottom-name"
              >
                {isLoading ? 'Carregando...' : userName}
              </span>
            </span>
          </div>
        </header>
        <nav>
          <Link
            className={ className }
            data-testid="link-to-search"
            to="/search"
          >
            <h2>Pesquisa</h2>

          </Link>
          <Link
            className={ className }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <h2>Favoritas</h2>

          </Link>
          <Link
            className={ className }
            data-testid="link-to-profile"
            to="/profile"
          >
            <h2>Perfil</h2>

          </Link>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
};
