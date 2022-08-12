import React from "react";
import Popup from "./Popup";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isStatusRegister }) {
  return (
    <Popup name="register" isOpen={isOpen} onClose={onClose}>
      <img
        className="popup__infoTooltip"
        src={isStatusRegister ? success : fail}
        alt="Сообщение о статусе регистрации на сайте"
      />
      <p className="popup__infoTooltip-title">
        {isStatusRegister
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}
      </p>
    </Popup>
  );
}

export default InfoTooltip;
