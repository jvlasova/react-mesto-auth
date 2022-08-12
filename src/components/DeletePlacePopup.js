import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ card, isOpen, onClose, isLoading, onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      buttonTextSubmit="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    ></PopupWithForm>
  );
}

export default DeletePlacePopup;
