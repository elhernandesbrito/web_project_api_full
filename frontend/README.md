Projeto Web — Autenticação e Rotas Protegidas

Essa etapa do projeto tem como objetivo implementar autenticação e autorização em uma aplicação web utilizando React.

O propósito é permitir que o usuário possa se registrar e fazer o login, e só poderão acessar as rotas autorizadas, e utilizandoo armazenamento local para manter a sessão ativa entre visitas ao site.

Tecnologias Utilizadas

- React.js
- React Router DOM
- Context API para gerenciamento de estado global
- CSS responsivo
- Fetch API para integração com back-end
- localStorage para persistência de token JWT
- Implementação:
- Criação de Rotas e Redirecionamento
- Implementação das rotas /signup (registro), /signin (login) e / (rota raiz protegida).
- Redirecionamento automático de usuários não autenticados para a página de login, independentemente da rota acessada.
- Criação de Componentes React
- Login: formulário de autenticação de usuário.
- Register: formulário de registro de usuário.
- ProtectedRoute: componente que restringe o acesso à rota raiz apenas para usuários autenticados.
- InfoTooltip: modal que informa ao usuário o resultado do processo de registro.
- Integração com o Back-End TripleTen
- Conexão com a API fornecida no sprint, utilizando os seguintes endpoints:
- POST /signup para registro de usuários.
- POST /signin para autenticação de usuários.
- GET /users/me para validação do token e recuperação do email do usuário autenticado.
- Inclusão do cabeçalho de autorização com token JWT nas requisições protegidas.
- Autenticação de Usuário
- Implementação de autenticação com JSON Web Token (JWT).
- Armazenamento do token no localStorage para persistência da sessão.
- Validação automática do token em visitas subsequentes ao site

-- Segurança --

O acesso às rotas privadas depende da validação do token JWT.
Usuários não autenticados são redirecionados automaticamente para a tela de login.
O token é armazenado no localStorage e verificado em cada carregamento da aplicação.
