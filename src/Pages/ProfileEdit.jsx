import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import Logotunes from '../images/logo-trybetunes_black.png';
import imgDefault from '../images/image-alt.svg';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isLoading: true,
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.setUserData();
  }

  setUserData = async () => {
    this.setState({ userData: await getUser() }, this.validationFillForm);
    this.setState({ isLoading: false });
  }

  handleFillForm = ({ target: { name, value } }) => {
    this.setState(({ userData }) => ({ userData: { ...userData, [name]: value },
    }), this.validationFillForm);
  }

  validationFillForm = () => {
    this.setState(({ userData }) => ({
      isDisabled: !Object.values(userData).every((each) => each),
    }));
  }

  handleClickSubmitUser = () => {
    const { history } = this.props;
    history.push('/profile');
    const { userData } = this.state;
    updateUser(userData);
  }

  render() {
    const { isLoading, isDisabled,
      userData: { name, email, image, description } } = this.state;
    return (
      <div className="edit">
        <Header className="header-profile" />
        {isLoading ? <Loading className="edit-loading" />
          : (
            <div className="login " data-testid="page-profile-edit">

              <span className="logo-image">
                <img
                  className="logotunes"
                  alt="Logo trybetunes"
                  src={ Logotunes }
                />
                <img
                  src={ image || imgDefault }
                  alt={ `Foto perfil de ${name}` }
                  className="image-login"
                />
              </span>

              <form className="form">

                <input
                  name="name"
                  value={ name }
                  placeholder="Ajuste seu Nome"
                  data-testid="edit-input-name"
                  type="text"
                  className="name-edit"
                  onChange={ this.handleFillForm }
                />

                <input
                  name="email"
                  value={ email }
                  placeholder="Digite seu novo email"
                  data-testid="edit-input-email"
                  type="email"
                  className="email-edit"
                  onChange={ this.handleFillForm }
                  required
                />

                <input
                  value={ image }
                  name="image"
                  type="text"
                  data-testid="edit-input-image"
                  onChange={ this.handleFillForm }
                />

                <textarea
                  name="description"
                  value={ description }
                  placeholder="Ajuste seu perfil"
                  data-testid="edit-input-description"
                  className="description-login"
                  lin="10"
                  onChange={ this.handleFillForm }
                />

                <button
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  className="button-login"
                  type="button"
                  onClick={ this.handleClickSubmitUser }
                >
                  Editar perfil
                </button>
              </form>

            </div>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape().isRequired,
};
