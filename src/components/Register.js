import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSetEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleSetPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <Header buttonText='Войти' />
      <div className="auth__container">
        <form name="form" onSubmit={handleSubmit}>
          <h2 className="auth__title">Регистрация</h2>
          <input className="auth__input" name="login" type="email" placeholder="Email" value={email} onChange={ handleSetEmail } required />
          <input className="auth__input" name="password" type="password" placeholder="Пароль" value={password} onChange={ handleSetPassword } required />
          <button className="auth__register-button" type="submit">Зарегистрироваться</button>
          <p className="auth__text">Уже зарегистрированы? <Link to='/sign-in' className="auth__text">Войти</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
