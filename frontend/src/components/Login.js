import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login">
        <h2 className="login__title">Entrar</h2>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <input
              type="email"
              className="login__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
            />
          </div>

          <div className="login__field">
            <input
              type="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>

          <button type="submit" className="login__button">
            Entrar
          </button>
        </form>

        <p className="login__text">
          Ainda não é membro?{" "}
          <Link to="/signup" className="login__link">
            Inscreva-se aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
