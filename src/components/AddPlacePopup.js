import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onUpdatePlace, isLoading }) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdatePlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        type="text"
        id="title"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        onChange={handleChange}
        value={values.name || ""}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="title-error popup__text-error"></span>
      <input
        type="url"
        id="link"
        name="link"
        className="popup__input popup__input_type_other"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.link || ""}
        required
      />
      <span className="link-error popup__text-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
