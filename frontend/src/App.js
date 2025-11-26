import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CurrentUserContext from "./contexts/CurrentUserContext";
import api from "./utils/api";
import { setToken } from "./utils/api";
import InfoTooltip from "./components/InfoTooltip";
import * as auth from "./utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    message: "",
    success: false,
  });

  const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {

        setToken(token); // <- ADICIONAR AQUI

        auth
          .checkToken(token)
          .then((res) => {
            if (res) {
              setCurrentUser(res);
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.error("token inválido ou expirado:", err);
            setLoggedIn(false);
            localStorage.removeItem("jwt");
          });
      }
    }, [navigate]);


    useEffect(() => {
      if (!loggedIn) return;

      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })

      .catch((err) => console.error("Erro ao carregar dados iniciais:", err));
  }, [loggedIn]);

  const handleOpenPopup = (popup) => setPopup(popup);
  const handleClosePopup = () => setPopup(null);

  const openInfoTooltip = ({ message, success }) => {
    setInfoTooltip({ isOpen: true, message, success });
  };

  const closeInfoTooltip = () => {
    setInfoTooltip({ isOpen: false, message: "", success: false });
  };

  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) =>
        console.error("Erro ao atualizar dados do usuário:", err),
      );
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch((err) => console.error("Erro ao atualizar avatar:", err));
  };

  const handleCardLike = (card) => {
    const isLiked = !card.isLiked;
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((error) => console.error("Erro ao alterar like:", error));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Erro ao deletar card:", err));
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards((prev) => [newCard, ...prev]);
        handleClosePopup();
      })
      .catch((err) => console.error("Erro ao adicionar novo card:", err));
  };

    const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res && res.token) {

          localStorage.setItem("jwt", res.token);

          setToken(res.token);   // <- ADICIONAR AQUI

          setLoggedIn(true);
          navigate("/", { replace: true });
          return auth.checkToken(res.token);
        }
        return Promise.reject("Token não recebido na resposta de login.");
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        openInfoTooltip({
          message: "Não foi possível entrar. Verifique suas credenciais.",
          success: false,
        });
      });
  };


    const handleRegister = (email, password) => {
      auth
        .register(email, password)
        .then(() => {
          openInfoTooltip({
            message: "Cadastro realizado!",
            success: true,
          });
          navigate("/signin", { replace: true });
        })
        .catch((err) => {
          console.error("Erro no registro:", err);
          openInfoTooltip({
            message: "Erro ao registrar usuário.",
            success: false,
          });
        });
    };
    ;

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/signin", { replace: true });

    openInfoTooltip({
      message: "Você saiu com sucesso",
      success: true,
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <Routes>
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/" />
            ) : (
              <Register onRegister={handleRegister} />
            )
          }
        />
        <Route
          path="/signin"
          element={
            loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <div className="page">
                <Header email={currentUser.email} onLogout={handleLogout} />
                <Main
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>

      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={closeInfoTooltip}
        isSuccess={infoTooltip.success}
        message={infoTooltip.message}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
