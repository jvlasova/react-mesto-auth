import React from 'react';

function ImagePopup ({ card, onClose, onCloseOverlay }) {
  
  return (
    <div className={`popup popup_full ${card.link && 'popup_opened'}`} onClick = {onCloseOverlay}>
      <div className="popup__container-image">
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image-full" />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
