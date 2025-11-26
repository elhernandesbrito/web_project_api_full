import React from "react";

export default function ConfirmDelete({ onConfirm, onClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
  };

  return (
    <form className="popup__form form" onSubmit={handleSubmit}>
      <h3 className="popup__EditarPerfil">Tem certeza que deseja excluir?</h3>

      <div className="form__buttons">
        <button type="submit" className="popup__submit-save">
          Sim
        </button>
      </div>
    </form>
  );
}
