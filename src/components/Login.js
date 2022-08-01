import React, { useState } from 'react';
import Header from './Header';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSetEmail(evt) {
      setEmail(evt.target.value);
    }

    function handleSetPassword(evt) {
      setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
      evt.preventDefault();
      if (!email || !password) {
        return;
      }
      onLogin(email, password);
    }

    return (
      <div className="auth">
        <Header buttonText='Регистрация' />
        <div className="auth__container">
          <form name="form-login" onSubmit={handleSubmit}>
            <h2 className="auth__title">Вход</h2>
            <input className="auth__input" name="login" type="email" placeholder="Email" value={ email } onChange={ handleSetEmail } required />
            <input className="auth__input" name="password" type="password" placeholder="Пароль" value={ password } onChange={ handleSetPassword } required />
            <button className="auth__register-button" type="submit">Войти</button>
          </form>
        </div>
      </div>
    );
}

export default Login;
