import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onCloseOverlay, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleChangeName (e) {
    setName(e.target.value);
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    onUpdateUser ({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name="edit-profile" 
      title="Редактировать профиль" 
      buttonText="Сохранить"
      isOpen={isOpen} 
      onClose={onClose}
      onCloseOverlay = {onCloseOverlay}
      onSubmit = {handleSubmit}>
    <input 
      type="text"
      id="name"
      name="name"
      className="popup__input popup__input_type_name"
      value={name || ''}
      onChange={handleChangeName}
      minLength="2"
      maxLength="40"
      required />
    <span className="name-error popup__text-error"></span>
    <input 
      type="text"
      id="about"
      name="about"
      className="popup__input popup__input_type_other"
      value={description || ''}
      onChange={handleChangeDescription}
      minLength="2"
      maxLength="200"
      required />
    <span className="about-error popup__text-error"></span>
  </ PopupWithForm>
  )
}

export default EditProfilePopup;
