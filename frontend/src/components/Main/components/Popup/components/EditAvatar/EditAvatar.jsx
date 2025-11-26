import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const inputRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <form
      className="popupAvatarUpdate__form form"
      name="avatar"
      onSubmit={handleSubmit}
    >
      <h3 className="popupAvatarUpdate__name">Alterar a foto do perfil</h3>
      <input
        className="popupAvatarUpdate__form-link name-input"
        type="url"
        name="link"
        placeholder="Link da imagem"
        ref={inputRef}
        required
      />
      <span className="form-input-error form__input-link popupAvatarUpdate__form-link-error"></span>
      <button
        type="submit"
        name="enviar"
        className="popupAvatarUpdate__submit-save saveButton"
      >
        SALVAR
      </button>
    </form>
  );
}
