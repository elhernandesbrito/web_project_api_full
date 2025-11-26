import React from "react";
import ImageVetor from "../../assets/images/Vector.png";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onLogout }) {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <img src={ImageVetor} alt="vetor header" className="header__vector" />

      <div className="header__actions">
        {pathname === "/signin" && (
          <Link to="/signup" className="header__link">
            Inscrever-se
          </Link>
        )}

        {pathname === "/signup" && (
          <Link to="/signin" className="header__link">
            Faça o login
          </Link>
        )}

        {pathname === "/" && (
          <div className="header__user-info">
            <span className="header__email">{email}</span>
            <button className="header__logout" onClick={onLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
