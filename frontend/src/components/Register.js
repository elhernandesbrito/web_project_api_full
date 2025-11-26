import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header/Header";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="register-page">
      {/* Header com logo e link "Entrar" */}
      <Header />
      <div className="register">
        <h2 className="register__title">Inscrever-se</h2>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__field">
            <input
              type="email"
              className="register__input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register__field">
            <input
              type="password"
              className="register__input"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register__button">
            Inscrever-se
          </button>
        </form>

        <p className="register__text">
          Já é um membro?{" "}
          <Link to="/signin" className="register__link">
            Faça o login aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
