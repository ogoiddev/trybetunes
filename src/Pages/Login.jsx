import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CssPages/Login.css';
import Loading from './Loading';
import logoTunes from '../images/logo-trybetunes_black.png';
import { createUser } from '../services/userAPI';
import imgDefault from '../images/image-alt.svg';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isDisabled: true,
      isLoading: false,
    };
  }

  // handleFillForm = ({ target: { name, value, files } }) => {
  //   this.setState(({ userInfo }) => ({
  //     userInfo: {
  //       ...userInfo,
  //       [name]: name === 'image'
  //         ? URL.createObjectURL(files[0])
  //         : value,
  //     },
  //   }), this.validationFillForm(name, value));
  // }

  handleFillForm = ({ target: { name, value } }) => {
    this.setState(({ userInfo }) => ({
      userInfo: { ...userInfo, [name]: value },
    }), this.validationFillForm(name, value));
  }

  validationFillForm = (name, value) => {
    this.setState({ isDisabled: name && (value.length <= 2) });
  }

  handleClickSubmitUser = async () => {
    this.setState({ isLoading: true });
    const { userInfo } = this.state;
    await createUser(userInfo);
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { userInfo: { name, image }, isDisabled, isLoading } = this.state;
    return (isLoading ? <Loading className="login-loading" />
      : (
        <div className="login" data-testid="page-login">

          <span className="logo-image">
            <img className="logotunes" src={ logoTunes } alt="Logo da TrybeTunes" />

            <img
              alt={ `Foto do perfil de  ${name}` }
              data-testid="login-image-input"
              className="image-login"
              onChange={ this.handleFillForm }
              src={ image || imgDefault }
              width="100px"
            />

          </span>

          <form className="form">

            <input
              name="name"
              placeholder="Digite seu Nome"
              data-testid="login-name-input"
              type="text"
              onChange={ this.handleFillForm }
            />

            <input
              name="email"
              placeholder="Digite seu Email"
              data-testid="login-email-input"
              type="email"
              className="email-login"
              onChange={ this.handleFillForm }
            />

            <input
              value={ image }
              name="image"
              type="text"
              onChange={ this.handleFillForm }
            />

            <textarea
              name="description"
              placeholder="Conte um pouco sobre seu perfil musical"
              data-testid="login-description-input"
              className="description-login"
              maxLength="300"
              onChange={ this.handleFillForm }
            />

            <button
              data-testid="login-submit-button"
              disabled={ isDisabled }
              className="button-login"
              type="button"
              onClick={ this.handleClickSubmitUser }
            >
              Entrar
            </button>
          </form>

        </div>)
    );
  }
}

Login.defaultProps = {
  history: undefined,
};

Login.propTypes = {
  history: PropTypes.shape('n'),
};
