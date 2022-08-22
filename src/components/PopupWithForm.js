import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            aria-label="Сохранить"
            className="popup__save-button"
          >
            {isLoading}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
