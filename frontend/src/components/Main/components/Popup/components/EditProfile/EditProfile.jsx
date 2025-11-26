import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <form className="popup__form form" name="register" onSubmit={handleSubmit}>
      <h3 className="popup__EditarPerfil">Editar perfil</h3>

      <div className="form__input">
        <input
          className="popup__form-name name-input"
          type="text"
          placeholder="Nome"
          name="name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="form-input-error form__input-name popup__form-name-error"></span>
      </div>

      <div className="form__input">
        <input
          className="popup__form-Explorar name-input"
          type="text"
          placeholder="Sobre mim"
          name="explorar"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="form-input-error form__input-explorar popup__form-name-error"></span>
      </div>

      <button className="popup__submit-save saveButton" type="submit">
        Enviar
      </button>
    </form>
  );
}
