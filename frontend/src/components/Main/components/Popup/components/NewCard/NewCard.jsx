import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }
  return (
    <form
      className="popupCards__form form"
      name="register"
      onSubmit={handleSubmit}
    >
      <h3 className="popupCards__EditarPerfil">Novo Local</h3>

      <div className="form__input">
        <input
          className="popupCards__form-name name-input"
          type="text"
          name="name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="form-input-error form__input-name popupCards__form-name-error"></span>
      </div>

      <div className="form__input">
        <input
          className="popupCards__form-link name-input"
          type="url"
          name="link"
          placeholder="Link da imagem"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="form-input-error form__input-link popupCards__form-link-error"></span>
      </div>

      <button
        type="submit"
        name="enviar"
        className="popupCards__submit-save saveButton"
      >
        Salvar
      </button>
    </form>
  );
}
