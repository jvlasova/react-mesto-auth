import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();
  avatarRef.current !== undefined && (avatarRef.current.value = "");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        type="url"
        id="link-input-avatar"
        name="avatar"
        className="popup__input popup__input_type_other"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
        required
      />
      <span className="avatar-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
