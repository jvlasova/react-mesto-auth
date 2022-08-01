import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({ name, outcome: { isOpen, ok }, onClose, onCloseOverlay }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick = {onCloseOverlay}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__infoTooltip" src={ ok ? success : fail } alt="Сообщение о статусе регистрации на сайте" />
        <p className="popup__infoTooltip-title">{ ok ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.' }</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
