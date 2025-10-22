
````markdown
# 🧩 CRM - Customer Relationship Management

Um sistema de CRM moderno desenvolvido em **Go (Golang)** com **Gin** no backend e **Next.js + Tailwind CSS** no frontend.  
O objetivo é oferecer uma base sólida, escalável e performática para gerenciar **usuários, leads e pagamentos** em um único painel integrado.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Yarn](https://yarnpkg.com/)
- [Axios](https://axios-http.com/)

### ⚙️ Backend
- [Go (Golang)](https://go.dev/)
- [Gin Gonic](https://gin-gonic.com/)
- [GORM](https://gorm.io/)
- [JWT (golang-jwt/v5)](https://github.com/golang-jwt/jwt)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- Clean Architecture (Controller → UseCase → Repository)

---

## 🧱 Estrutura do Projeto

```bash
crm/
├── backend/
│   ├── cmd/
│   │   ├── server/
│   ├── config/
│   │   ├── database/
│   │   ├── dependencys/
│   │   └── token/
│   ├── internal/
│   │   ├── domain/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── leads/
│   │   │   ├── user/
│   │   │   └── payment/
│   │   └── router.go
│   ├── pkg/
│   │   ├── hash/
│   │   ├── jwt/
│   └── go.mod / go.sum
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    ├── public/
    ├── package.json
    └── tailwind.config.js
````

---

## ⚡ Configuração do Backend (Go)

### 1️⃣ Pré-requisitos

* Go ≥ 1.22
* PostgreSQL
* Yarn (para rodar o frontend)
* Git

### 2️⃣ Configuração do banco de dados

Defina as variáveis de ambiente no `.env`:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=senha
DATABASE_NAME=crm_db
JWT_SECRET=seu_token_secreto
```
Rodando banco de dados:
- Na raiz do projeto rode
```bash
docker compose up build -d
```

### 3️⃣ Rodando o backend

```bash
cd backend
go mod tidy
go run main.go
```

O servidor iniciará em:
👉 `http://localhost:8080`

---

## 🎨 Configuração do Frontend (Next.js)

### 1️⃣ Instale as dependências

```bash
cd frontend
yarn install
```

### 2️⃣ Rode o servidor de desenvolvimento

```bash
yarn dev
```

O frontend estará disponível em:
👉 `http://localhost:3000`

---

## 🔐 Autenticação

* Login e registro de usuário via `/api/users/login` e `/api/users/register`
* Middleware `RequireAuth` verifica o JWT armazenado no cookie `Authorization`
* Rotas protegidas no backend:

  * `/api/lead/*`
  * `/api/payment/*`

---

## 🧠 Arquitetura de Código (Backend)

A arquitetura segue os princípios de **Clean Architecture / Hexagonal**, com camadas bem definidas:

| Camada       | Função                                        |
| ------------ | --------------------------------------------- |
| `controller` | Recebe requisições HTTP e chama o caso de uso |
| `usecase`    | Lógica de negócio pura                        |
| `repository` | Acesso a banco de dados (GORM)                |
| `domain`     | Entidades e modelos                           |
| `middleware` | Cross-cutting concerns (auth, CORS, etc.)     |

## 🧩 Futuras Implementações

* [ ] Microsserviços independentes (User / Leads / Payment)
* [ ] Logs centralizados e observabilidade
* [ ] Deploy na AWS com docker
* [ ] Sistema de permissões por papéis (RBAC)
* [ ] WebSockets para notificações em tempo real

---

## 💻 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Faça o commit: `git commit -m 'Adiciona nova feature'`
4. Envie: `git push origin feature/nova-feature`
5. Crie um Pull Request

---

## 🧑‍💻 Autor

**Hugo Carlos Barbosa Brandão**
Desenvolvedor Backend | Golang | Python | TypeScript | Node.js | Docker
🌐 [LinkedIn](https://linkedin.com/in/hugocbb)
🐙 [GitHub](https://github.com/hugocbb)

---

## 🪪 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```

---

Se quiser, posso gerar uma **versão personalizada com badges**, logo e um **diagrama visual da arquitetura** (feito em Markdown ou PlantUML) — quer que eu monte isso pra deixar o README mais profissional?
```
