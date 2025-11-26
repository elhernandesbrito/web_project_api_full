import React from "react";
import closeIcon from "../../../../assets/images/closeIcon.png";

export default function Popup({ children, onClose, hideCloseButton }) {
  return (
    <section className="popup">
      {!hideCloseButton && (
        <img
          src={closeIcon}
          alt="Ícone de fechar"
          className="popup__closeButton"
          onClick={onClose}
        />
      )}
      <div className="popup__content ">{children}</div>
    </section>
  );
}
