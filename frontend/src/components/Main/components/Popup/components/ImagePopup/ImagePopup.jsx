import React from "react";

export default function ImagePopup({ card }) {
  if (!card) return null;

  const isVertical = card.link && card.link.includes("_vertical");
  const imageClass = isVertical
    ? "popup__image_vertical"
    : "popup__image_horizontal";

  return (
    <>
      <img
        className={`popup__image ${imageClass}`}
        src={card.link}
        alt={card.name || "Imagem ampliada"}
      />
      <p className="popup__caption">{card.name}</p>
    </>
  );
}
