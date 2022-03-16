import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from './Loading';
import './CssPages/Profile.css';
import { getUser } from '../services/userAPI';
import imgDefault from '../images/image-alt.svg';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({ profile: await getUser() });
    this.setState({ isLoading: false });
  }

  render() {
    const { profile: { name, email, image, description }, isLoading } = this.state;
    return (
      <div className="profile" data-testid="page-profile">
        <Header className="header-profile" />
        {isLoading ? <Loading />
          : (
            <section className="profile-content">
              <div className="image-container">
                <img
                  data-testid="profile-image"
                  className="image"
                  src={ image || imgDefault }
                  alt={ `Foto de perfil do ${name}` }
                />

              </div>
              <div className="textContent">
                <label htmlFor="name">
                  Nome
                  <p name="name">
                    <strong name="name">{name}</strong>
                  </p>
                </label>
                <label htmlFor="email">
                  e-mail
                  <p>
                    <strong name="email">{email}</strong>
                  </p>
                </label>
                <p className="description">
                  {description}
                </p>
              </div>
              <Link to="/profile/edit">
                <button
                  type="button"
                  className="button-profile"
                >
                  Editar perfil
                </button>
              </Link>
            </section>)}
      </div>
    );
  }
}
