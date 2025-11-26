//export const BASE_URL = "https://api.aroundprojecteh.mooo.com";
export const BASE_URL = "http://localhost:3000";

// Função para registrar usuário (signup)
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res));
};

// Função para autorizar usuário (signin)
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res));
};

// Função para validar token e obter dados do usuário
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};

// Função auxiliar para tratar respostas
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Erro: ${res.status}`);
};
