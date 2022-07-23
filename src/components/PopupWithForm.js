import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, onCloseOverlay, onSubmit, buttonText }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick = {onCloseOverlay}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть" onClick={onClose}></button>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" aria-label="Сохранить" className="popup__save-button">{buttonText}</button>
        </form>
        </div>
    </div>
  );
}

export default PopupWithForm;
