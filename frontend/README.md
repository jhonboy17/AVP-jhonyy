# Frontend de autenticação integrado

Este frontend React está integrado à API Express. O login armazena o JWT no `localStorage`, a página `/perfil` envia o token por Axios e o logout encerra a sessão local.

## Tecnologias e estrutura

O frontend usa React, Vite, React Router DOM, Axios, Tailwind CSS v4 e JavaScript. Não usa TypeScript, Redux, Context API, bibliotecas de UI, cookies ou refresh token.

```text
src/
  components/
    ProtectedRoute.jsx
  pages/
    Register.jsx
    Login.jsx
    ProtectedPage.jsx
  services/
    api.js
    auth.js
  App.jsx
  main.jsx
  index.css
.env.example
index.html
package.json
vite.config.js
README.md
```

`src/main.jsx` inicia o React e o `BrowserRouter`. `src/App.jsx` define as rotas. `src/services/api.js` cria a instância `api` do Axios com a URL base do backend. `src/services/auth.js` concentra as funções didáticas para o token.

## Instalação e execução

Instale o Node.js compatível com a versão do Vite declarada em `package.json`. Na raiz do projeto, execute:

```bash
npm install
cp .env.example .env
npm run dev
```

No PowerShell, o equivalente a `cp .env.example .env` é `Copy-Item .env.example .env`. O arquivo `.env` deve conter:

```env
VITE_API_URL=http://localhost:3000
```

O Vite lê variáveis iniciadas por `VITE_` e as disponibiliza em `import.meta.env`. Reinicie `npm run dev` após editar o `.env`. Rode também o backend Node.js/Express em `http://localhost:3000` antes de testar as integrações em aula. Se o navegador bloquear uma chamada entre as portas do frontend e do backend, confira a configuração de CORS no backend.

## Tailwind CSS v4

O Tailwind v4 usa os pacotes `tailwindcss` e `@tailwindcss/vite`. Para instalá-los em um projeto Vite, o comando é:

```bash
npm install tailwindcss @tailwindcss/vite
```

Neste template, ambos já estão declarados em `package.json` e são instalados pelo `npm install` inicial. `vite.config.js` registra os plugins `react()` e `tailwindcss()`. `src/index.css` contém `@import "tailwindcss";`, e esse CSS é importado por `src/main.jsx`. As classes utilitárias são usadas diretamente no JSX para fundo cinza claro, cards brancos, botões azuis, campos com borda, mensagens vermelhas ou verdes e layout responsivo básico.

No Tailwind v3, era comum usar três diretivas separadas (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) e arquivos de configuração JavaScript/PostCSS. Na configuração atual do v4 com Vite, usamos o plugin oficial e um único `@import "tailwindcss";`. Por isso, este projeto não precisa de `tailwind.config.js` nem `postcss.config.js`. Consulte a [documentação oficial do Tailwind com Vite](https://tailwindcss.com/docs/installation/using-vite) para conferir a configuração.

## Páginas e funções preparadas

| Arquivo | Responsabilidade |
| --- | --- | --- |
| `pages/Register.jsx` | Cadastro com validação, feedback e chamada `POST /auth/register` |
| `pages/Login.jsx` | Login, armazenamento do JWT e navegação para `/perfil` |
| `pages/ProtectedPage.jsx` | Perfil privado, chamada `GET /perfil` com Bearer e logout |
| `components/ProtectedRoute.jsx` | Redirecionamento visual quando não há token |
| `services/auth.js` | Persistência e remoção do JWT no `localStorage` |

O cadastro continua disponível em `/register` para demonstrar o fluxo completo da AV1; as páginas principais da AV2 são `/login` e `/perfil`. O frontend valida a sessão local e o backend valida o JWT de verdade.

## Fluxo esperado, a implementar em aula

1. Usuário acessa `/register` e cria uma conta.
2. Frontend envia os dados para `POST /auth/register`.
3. Backend salva o usuário com senha hasheada.
4. Usuário acessa `/login`.
5. Frontend envia email e senha para `POST /auth/login`.
6. Backend valida o login e retorna um token.
7. Frontend salva o token no `localStorage` com a chave `auth_token`.
8. Usuário é redirecionado para `/perfil`.
9. A página protegida pega o token salvo.
10. A página protegida envia o token no header `Authorization: Bearer TOKEN_AQUI`.
11. Backend valida o token no middleware.
12. Se o token for válido, backend retorna os dados do usuário.
13. Frontend mostra que o login foi feito com sucesso e exibe ID, nome e email.

O fluxo está implementado com validação de campos, mensagens de erro, armazenamento do JWT, header `Authorization: Bearer ${token}`, remoção de tokens inválidos e logout.

Guardar e enviar o token no frontend permite controlar a navegação, mas isso não substitui a segurança do backend. `ProtectedRoute` só melhora a experiência de quem usa a aplicação. A proteção real é o middleware do backend, que deve validar o JWT a cada requisição protegida, mesmo se alguém tentar acessar a API diretamente ou burlar o frontend.

Para adaptar ao TCC, a turma pode trocar títulos e cores, incluir campos próprios no cadastro, criar páginas específicas do tema e mudar `VITE_API_URL` para o endereço da API do projeto. Ao alterar o contrato da API, revisem também os caminhos das rotas, os nomes dos campos e o formato da resposta do login e do perfil.

## Checklist dos alunos

- [ ] Rodei o backend
- [ ] Rodei o frontend
- [ ] Configurei VITE_API_URL
- [ ] Entendi a estrutura do frontend
- [ ] Entendi onde fica a configuração do axios
- [ ] Completei o cadastro no frontend
- [ ] Enviei POST /auth/register pelo frontend
- [ ] Completei o login no frontend
- [ ] Recebi o token do backend
- [ ] Salvei o token no localStorage
- [ ] Completei a página protegida
- [ ] Enviei Authorization: Bearer TOKEN para o backend
- [ ] Recebi os dados do usuário logado
- [ ] Implementei logout
- [ ] Entendi que o frontend apenas guarda e envia o token
- [ ] Entendi que quem valida de verdade é o backend
