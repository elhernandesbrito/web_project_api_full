import React, { useState, useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import Card from "./components/Card/Card.jsx";
import editButtonImage from "../../assets/images/EditButton.png";
import vectorAddImage from "../../assets/images/VectorAdd.png";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ConfirmDelete from "./components/Popup/components/ConfirmDelete/ConfirmDelete.jsx";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup.jsx";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const newCardPopup = {
    title: "New card",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRequestDelete = (card) => {
    setCardToDelete(card);
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      onCardDelete(cardToDelete);
      setCardToDelete(null);
    }
  };

  const handleCloseAllPopups = () => {
    onClosePopup();
    setSelectedCard(null);
    setCardToDelete(null);
  };

  return (
    <>
      <section className="profile">
        <div className="profile__column">
          <div className="profile__avatar-container">
            {currentUser.avatar && (
              <img
                src={currentUser.avatar}
                alt="imagem avatar"
                className="profile__avatar"
              />
            )}

            <img
              src={editButtonImage}
              alt="Botão editar avatar"
              className="profile__editAvatar"
              onClick={() => onOpenPopup(editAvatarPopup)}
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <img
              src={editButtonImage}
              alt="Botão editar perfil"
              className="profile__edit"
              onClick={() => onOpenPopup(editProfilePopup)}
            />
            <h3 className="profile__explorer">{currentUser.about}</h3>
          </div>

          <div className="profile__addButton">
            <img
              src={vectorAddImage}
              alt="imagem botão adicionar"
              className="profile__addButton-cards"
              onClick={() => onOpenPopup(newCardPopup)}
            />
          </div>
        </div>
      </section>

      <ul className="rechardCards cards__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            handleOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={handleRequestDelete}
            isLiked={card.isLiked}
          />
        ))}
      </ul>

      {popup && (
        <Popup onClose={handleCloseAllPopups} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <Popup onClose={handleCloseAllPopups}>
          <ImagePopup card={selectedCard} />
        </Popup>
      )}

      {cardToDelete && (
        <Popup onClose={handleCloseAllPopups} title="Confirmação">
          <ConfirmDelete
            onConfirm={handleConfirmDelete}
            onClose={handleCloseAllPopups}
          />
        </Popup>
      )}
    </>
  );
}

export default Main;
