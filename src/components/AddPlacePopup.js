import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onCloseOverlay, onUpdatePlace }) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => { 
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleChangeCardName(e) {
    setCardName(e.target.value)
  }
  
  function handleChangeCardLink(e) {
    setCardLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    onUpdatePlace ({
      name: cardName,
      link: cardLink,
    })
}

  return (
    <PopupWithForm 
      name="add-card" 
      title="Новое место" 
      buttonText="Создать" 
      isOpen={isOpen} 
      onClose={onClose}
      onCloseOverlay = {onCloseOverlay}
      onSubmit = {handleSubmit}>
      <input 
        type="text" 
        id="title" 
        name="name" 
        className="popup__input popup__input_type_name" 
        placeholder="Название" 
        onChange={handleChangeCardName}
        value={cardName}
        minLength="2" 
        maxLength="30" 
        required />
      <span className="title-error popup__text-error"></span>
      <input 
        type="url" 
        id="link" 
        name="link" 
        className="popup__input popup__input_type_other" 
        placeholder="Ссылка на картинку"
        onChange={handleChangeCardLink}
        value={cardLink}
        required />
      <span className="link-error popup__text-error"></span>
    </ PopupWithForm>
  )
}

export default AddPlacePopup;
