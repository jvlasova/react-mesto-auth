import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header ({ email , buttonText }) {
  const navigate = useNavigate();
  function signOut(){
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="header__user">
          <p className="header__email">{email}</p>
          <button className="header__button" onClick={signOut}>{buttonText}</button>
        </div>
    </header>
  );
}

export default Header;
