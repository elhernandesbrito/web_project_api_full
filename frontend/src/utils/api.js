
class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = null; // token salvo internamente
  }

  // Atualiza o token dinamicamente
  setToken(token) {
    this._token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  _makeRequest(endpoint, options = {}) {
    const headers = {
      "Content-Type": "application/json",
    };

    // Se existir token, adiciona automaticamente
    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`;
    }

    const config = {
      ...options,
      headers,
    };

    return fetch(`${this._baseUrl}${endpoint}`, config).then((res) =>
      this._checkResponse(res)
    );
  }

  // Rotas da API

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  updateUserInfo(data) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._makeRequest("/cards", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  updateAvatar(data) {
    return this._makeRequest("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  changeLikeCardStatus(cardId, like) {
    return this._makeRequest(`/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
    });
  }
}

// Instância da API — aponta para seu backend local
const api = new Api({
   baseUrl: "/api",
});

// Exporta para o App.js poder atualizar o token
export function setToken(token) {
  api.setToken(token);
}

export default api;
