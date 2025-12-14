# Tripleten web_project_api_full

Projeto 18 — API REST Full Stack

Este projeto é a implementação de uma aplicação web full stack, com um backend desenvolvido em Node.js + Express + MongoDB e um frontend em React, além de ser completamente implantado na nuvem.

Tecnologias Utilizadas

Backend:

Node.js
Express
MongoDB
JWT para autenticação
PM2 para gerenciamento de processos
NGINX como proxy reverso
Let’s Encrypt para HTTPS

Frontend:

React.js
API comunicação com backend via /api
Context API para gestão de estado
Axios para requisições HTTP

Deploy:
Google Cloud VM
NGINX
Certificados SSL com Let’s Encrypt

Descrição:

Este projeto foi desenvolvido como parte do curso, com o objetivo de criar uma aplicação full stack, onde é possível realizar ações como:

Registro de usuários
Login com autenticação JWT
Edição de perfil (nome, sobre, avatar)
Gerenciamento de cards (criação, edição, exclusão)
Likes e dislikes nos cards

A aplicação foi desenvolvida seguindo rigorosamente o escopo do curso, com todas as funcionalidades sendo testadas e funcionando em ambiente de produção.

Funcionalidades

Cadastro e login de usuários:
O usuário pode se registrar e fazer login com email e senha, sendo gerado um token JWT para autenticação em sessões subsequentes.

Gerenciamento de perfil:
Os usuários podem editar seu nome, profissão, e avatar.

Criação, visualização e exclusão de cards:
Os usuários podem criar novos cards, visualizar os existentes e deletar os seus próprios.

Likes e Dislikes:
Os cards podem ser curtidos e descurtidos, e o contador de likes é atualizado corretamente.

Link da Aplicação

O projeto está disponível em produção e pode ser acessado através do seguinte link:

Link do projeto (frontend): https://aroundprojecteh.mooo.com

Link da API (backend): https://aroundprojecteh.mooo.com/api

Como rodar localmente
Backend

Clone o repositório para o seu computador:

git clone https://github.com/seu-usuario/web_project_api_full.git


Navegue até a pasta do backend:

cd web_project_api_full/backend


Instale as dependências:

npm install


Crie um arquivo .env com as variáveis de ambiente necessárias (exemplo de conteúdo para o .env):

JWT_SECRET=sua-chave-secreta
NODE_ENV=production


Inicie o servidor:

npm start
Frontend - Navegue até a pasta do frontend:
cd web_project_api_full/frontend


Instale as dependências:
npm install


Inicie o frontend:
npm start

A aplicação estará disponível em http://localhost:3000.

Estrutura do Projeto
.git
backend/
frontend/
README.md


backend/: Contém a API REST, autenticação, controle de usuários, cartões, e likes.

frontend/: Contém o código do React para a interface do usuário, incluindo login, cadastro, criação e exibição de cartões.

README.md: Este arquivo.

Requisitos

Node.js versão 14 ou superior

MongoDB (local ou cloud)

NGINX configurado para produção

Certificados SSL com Let’s Encrypt

Como foi feito

Autenticação: Implementada com JWT para garantir a segurança e a persistência do login entre as sessões.

Likes/Dislikes: Utilizamos a lógica de enviar PUT e DELETE para a API, o frontend reflete o status do like no botão e no contador.

Deploy: O projeto foi hospedado em uma VM na Google Cloud, utilizando NGINX como proxy reverso entre o frontend e o backend.

Autor

Seu Nome
