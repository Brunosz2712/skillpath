# SkillPath — Planejador de Transição de Carreira

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript** para apoiar pessoas que querem **mudar de carreira**, mas não sabem por onde começar.  
O app organiza trilhas iniciais de estudo em diferentes áreas e acompanha o progresso do usuário.

---

## 👥 Integrantes do grupo

- **Bruno da Silva Souza 2TDSPW** — RM: **94346**
- **Julio Samuel de Oliveira 2TDSPG** — RM: **557453**
- **Leonardo da Silva Pereira 2TDSPG** — RM: **557598**

---

## 📌 Repositório (GitHub Classroom)

> **Link do repositório no GitHub Classroom:**  
> `https://github-classroom.com/SEU_LINK_AQUI`  

_(substituir pelo link oficial do Classroom da disciplina)_

---

## 🎥 Vídeo da apresentação (YouTube)

> **Link do vídeo demonstrando o app:**  
> `https://youtube.com/SEU_VIDEO_AQUI`

O vídeo apresenta:

- Fluxo de autenticação (login / cadastro / logout)
- Navegação entre as telas
- CRUD de feedbacks
- Progresso das trilhas
- Tela “Sobre o App” exibindo o hash do commit de referência

---

## 🧩 Descrição da solução (Global Solution)

O **SkillPath** é um app pensado para pessoas que querem **transição de carreira**, mas estão perdidas sobre por onde começar.

A solução:

- Organiza **trilhas iniciais de estudo** por área:
  - **Tecnologia**
  - **Contabilidade**
  - **Administração**
  - **Economia**
- Cada trilha contém **4 cursos-base** (ex.: Lógica de Programação, HTML/CSS, Banco de Dados, etc.).
- O usuário acompanha o **percentual de conclusão** de cada curso com um slider.
- O app sugere **empresas onde esse perfil pode se encaixar**, ajudando a conectar estudo com mercado.

O foco não é “colocar IA em tudo”, e sim **dar clareza de caminho**:  
uma rota simples, mensurável e conectada com oportunidades reais.

---

## ✅ Requisitos da avaliação e onde aparecem no app

### 1. Telas e Navegação (6+ telas) — React Navigation

Navegação baseada em:

- **AuthStack** (login, cadastro)
- **MainTabs** (bottom tab com 5 abas)
- **TrilhasStack** (lista de trilhas + detalhes)

Telas implementadas:

1. **LoginScreen**
2. **SignupScreen**
3. **AreaSelectionScreen** (escolha de área: Tech, Contabilidade, Adm, Economia)
4. **TrackListScreen** (lista de trilhas da área)
5. **TrackDetailScreen** (detalhe da trilha + sliders de progresso)
6. **CompaniesScreen** (empresas sugeridas por área)
7. **ProfileScreen** (perfil simples do usuário)
8. **AboutScreen** (hash do commit + descrição do app)
9. **FeedbackScreen** (CRUD de feedbacks — integrado à API Java)

> A tela **“Sobre o App”** não conta para o requisito de 6 telas, conforme enunciado, mas foi implementada para atender a parte de publicação.

---

### 2. CRUD com API (Java/.NET) — Axios

CRUD preparado para integração com **API Java** em:

- **Autenticação**
  - `src/services/authService.ts`
- **Feedbacks do app (comentários dos usuários)**
  - `src/services/feedbackService.ts`

Operações implementadas no `feedbackService`:

- `GET /api/feedback` → **Read** (lista feedbacks)
- `POST /api/feedback` → **Create**
- `PUT /api/feedback/{id}` → **Update**
- `DELETE /api/feedback/{id}` → **Delete**

Enquanto a API não está publicada, o app pode ser rodado com dados mockados,  
mas o código já está pronto para falar com o backend real.

---

### 3. Sistema de Autenticação

Fluxo de autenticação implementado:

- **Tela de cadastro (SignupScreen)**
- **Tela de login (LoginScreen)**
- **Logout** via contexto (`AuthContext`) limpando o usuário e redirecionando para o fluxo de autenticação.
- **Rotas protegidas**: se não houver usuário logado, o app exibe o `AuthStack`; se houver, mostra o `MainTabs`.

Arquivos relevantes:

- `src/contexts/AuthContext.tsx`
- `src/navigation/AppNavigator.tsx`
- `src/screens/LoginScreen.tsx`
- `src/screens/SignupScreen.tsx`
- `src/services/authService.ts` (Axios para API Java/.NET)

Formulários com validação mínima (campos obrigatórios, mensagens de erro) e feedback visual de loading.

---

### 4. Estilização e identidade visual

Referência visual:

- Paleta inspirada no site/app da **Alura**:
  - Fundo em tons de azul escuro (`#020617`, `#0b1120`)
  - Botões com **verde “neon”** (`#22c55e`) e detalhes em **ciano** (`#38bdf8`)
- Layouts com “card” central, sombra e bordas arredondadas.

Telas com identidade consistente:

- **Login / Signup**  
  Cards com gradiente, tipografia destacada e botões em estilo “call to action”.
- **Trilhas e Detalhe da Trilha**  
  Cards para cada curso, sliders de progresso, CTA “Iniciar trilha”.
- **CompaniesScreen**  
  Cards com imagem de empresa (`empresa1.png`), nome, segmento e descrição curta.
- **ProfileScreen**  
  Foto/ilustração de perfil (`perfil1.png`), nome do usuário, área de interesse.
- **AboutScreen**  
  Hero com imagem (`about1.png`) e hash do commit.
- **FeedbackScreen**  
  Hero com imagem (`feedback.webp`), formulário e lista de feedbacks estilosos.

---
