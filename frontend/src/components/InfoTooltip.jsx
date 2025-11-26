import React from "react";
import closeIcon from "../assets/images/closeIcon.png";

import successIcon from "../assets/images/vitoria.png";
import errorIcon from "../assets/images/erro.png";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  if (!isOpen) return null;

  return (
    <div className="popup popup_type_infoTooltip">
      <div className="popup__container">
        <button className="popup__close" onClick={onClose}>
          <img src={closeIcon} alt="Fechar" />
        </button>
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Sucesso" : "Erro"}
          className="popup__status-icon"
        />

        <p className="popup__message">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
