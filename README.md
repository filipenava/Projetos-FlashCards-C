# 🎯 FlashCards C - Sistema de Estudo Interativo

Sistema completo de flashcards para estudo da linguagem C, desenvolvido com Vue.js 3 e Firebase.

**🌐 Deploy:** [https://revisao-c.web.app](https://revisao-c.web.app)

---

## 📋 Sobre o Projeto

FlashCards C é uma aplicação web moderna para facilitar o aprendizado da linguagem de programação C através de flashcards interativos. O sistema oferece uma experiência gamificada com acompanhamento de progresso, sessões de estudo e estatísticas detalhadas.

### ✨ Características Principais

- 🔐 **Autenticação completa** com Firebase Auth (login, cadastro, recuperação de senha)
- 📚 **Categorias organizadas** cobrindo todos os aspectos da linguagem C
- 🎴 **Flashcards interativos** com animação de flip
- 📊 **Acompanhamento de progresso** em tempo real
- 💾 **Sincronização na nuvem** com Firestore
- 📈 **Estatísticas detalhadas** de estudo
- 🎨 **Interface moderna** e responsiva com Tailwind CSS
- ⚡ **Performance otimizada** com Vite

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Vue.js 3.5.13** - Framework progressivo
- **Vue Router 4.4.5** - Roteamento SPA
- **Pinia 2.2.6** - Gerenciamento de estado
- **Vite 6.0.3** - Build tool e dev server
- **Tailwind CSS 3.4.15** - Framework CSS utility-first

### Backend & Serviços
- **Firebase Authentication** - Autenticação de usuários
- **Cloud Firestore** - Banco de dados NoSQL
- **Firebase Hosting** - Hospedagem web
- **Firebase Analytics** - Análise de uso

---

## 📁 Estrutura do Projeto

```
flashcards-c/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── views/              # Páginas da aplicação
│   │   ├── Dashboard.vue   # Página inicial
│   │   ├── Categories.vue  # Listagem de categorias
│   │   ├── StudyMode.vue   # Modo de estudo
│   │   ├── Statistics.vue  # Estatísticas
│   │   ├── Login.vue       # Login
│   │   ├── Register.vue    # Cadastro
│   │   ├── ForgotPassword.vue # Recuperação de senha
│   │   └── Profile.vue     # Perfil do usuário
│   ├── stores/             # Pinia stores
│   │   ├── auth.js         # Gerenciamento de autenticação
│   │   └── flashcards.js   # Gerenciamento de flashcards
│   ├── firebase/           # Configuração Firebase
│   │   ├── config.js       # Inicialização do Firebase
│   │   └── firestore.js    # Helpers do Firestore
│   ├── data/               # Dados dos flashcards
│   │   └── flashcards.js   # Base de conhecimento
│   ├── router/             # Configuração de rotas
│   │   └── index.js        # Rotas e guards
│   ├── App.vue             # Componente raiz
│   ├── main.js             # Entry point
│   └── style.css           # Estilos globais (Tailwind)
├── public/                 # Arquivos estáticos
├── dist/                   # Build de produção
├── .env                    # Variáveis de ambiente (não versionado)
├── .env.example            # Template de variáveis
├── firebase.json           # Configuração Firebase Hosting
├── .firebaserc             # Projeto Firebase
├── package.json            # Dependências
├── vite.config.js          # Configuração Vite
├── tailwind.config.js      # Configuração Tailwind
├── REQUISITOS.md           # Documentação de requisitos
└── README.md               # Este arquivo
```

---

## 🎓 Categorias de Estudo

O sistema contém flashcards organizados nas seguintes categorias:

1. **Fundamentos da Linguagem C** - Conceitos básicos e história
2. **Tipos de Dados** - Tipos primitivos e compostos
3. **Variáveis e Constantes** - Declaração e uso
4. **Ponteiros** - Manipulação de memória
5. **Operadores** - Aritméticos, lógicos, relacionais
6. **Estruturas de Controle** - If, switch, loops
7. **Funções** - Declaração, parâmetros, recursão
8. **Arrays** - Vetores e matrizes
9. **Strings** - Manipulação de texto
10. **Structs e Unions** - Estruturas de dados
11. **Alocação Dinâmica** - Malloc, calloc, free
12. **Arquivos** - Leitura e escrita
13. **Preprocessador** - Diretivas e macros
14. **Boas Práticas** - Padrões e convenções

Cada flashcard contém:
- 📝 **Conceito** - Explicação detalhada
- 💻 **Sintaxe** - Código de exemplo
- 🔍 **Casos de uso** - Aplicações práticas
- ⚠️ **Erros comuns** - O que evitar
- 💡 **Dicas** - Melhores práticas

---

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ e npm
- Conta Firebase (gratuita)
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd flashcards-c
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id
```

**📌 Importante:** Nunca commite o arquivo `.env` com suas credenciais reais!

### 4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🏗️ Build e Deploy

### Build para produção
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Deploy no Firebase Hosting
```bash
firebase login
firebase deploy --only hosting
```

---

## 🎮 Funcionalidades

### 🔐 Sistema de Autenticação
- **Cadastro** com nome, email e senha
- **Login** com validação e feedback visual
- **Recuperação de senha** via email
- **Perfil do usuário** editável
- **Proteção de rotas** com navigation guards

### 📚 Estudo de Flashcards
- **Modo de estudo** com flip cards animados
- **Marcação de progresso**: Correto, Incorreto, Revisar
- **Filtro por categoria**
- **Sessões de estudo** rastreadas

### 📊 Acompanhamento
- **Dashboard** com visão geral do progresso
- **Estatísticas detalhadas** por categoria
- **Histórico de sessões**
- **Porcentagem de conclusão**

### 💾 Sincronização
- **LocalStorage** para acesso offline
- **Firestore** para backup na nuvem
- **Sincronização automática** quando online

---

## 🗄️ Estrutura do Firestore

### Coleções

#### `users`
```javascript
{
  userId: string,
  displayName: string,
  email: string,
  createdAt: timestamp,
  lastLogin: timestamp
}
```

#### `user_progress`
```javascript
{
  userId: string,
  progress: {
    [cardId]: {
      status: 'learned' | 'review' | 'incorrect',
      attempts: number,
      correctCount: number,
      lastStudied: timestamp
    }
  },
  lastUpdated: timestamp
}
```

#### `study_sessions`
```javascript
{
  userId: string,
  categoryId: string,
  correct: number,
  incorrect: number,
  duration: number,
  cardsStudied: array,
  createdAt: timestamp
}
```

---

## 🎨 Design System

### Cores Principais
- **Primary**: `#3B82F6` (Azul)
- **Secondary**: `#10B981` (Verde)
- **Accent**: `#F59E0B` (Laranja)

### Componentes Reutilizáveis
- `.card` - Container com sombra e bordas arredondadas
- `.btn` - Botões estilizados
- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário

---

## 📱 Responsividade

O sistema é totalmente responsivo e otimizado para:
- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Wide Screen** (1280px+)

---

## 🔒 Segurança

- ✅ Credenciais do Firebase em variáveis de ambiente
- ✅ Validação de formulários no cliente
- ✅ Regras de segurança do Firestore
- ✅ Autenticação obrigatória para rotas protegidas
- ✅ Sanitização de inputs

---

## 📊 Performance

- ⚡ Build otimizado com Vite
- 📦 Code splitting automático
- 🗜️ Compressão gzip no Firebase Hosting
- 💾 Cache de assets estáticos
- 🚀 Lazy loading de rotas

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build local

# Deploy
firebase deploy --only hosting   # Deploy para Firebase
```

---

## 💡 Como Usar

1. **Acesse o site** - [https://revisao-c.web.app](https://revisao-c.web.app)
2. **Crie uma conta** - Cadastre-se gratuitamente
3. **Dashboard** - Visualize seu progresso geral e acesse as categorias
4. **Selecione uma Categoria** - Escolha o tópico que deseja estudar
5. **Estude os Flashcards** - Clique no card para ver a resposta completa
6. **Marque seu Entendimento** - "Entendi", "Não Entendi" ou "Revisar Depois"
7. **Acompanhe Estatísticas** - Veja seu progresso e atividade recente
8. **Perfil** - Edite suas informações e acompanhe conquistas

---

## 📝 Adicionando Novos Flashcards

Edite o arquivo `src/data/flashcards.js` seguindo o modelo:

```javascript
{
  id: 'categoria-xxx',
  category: 'nome-categoria',
  categoryName: 'Nome Legível',
  difficulty: 'beginner|intermediate|advanced',
  question: 'Sua pergunta aqui',
  answer: {
    concept: 'Explicação conceitual',
    syntax: 'Sintaxe (opcional)',
    example: 'Código de exemplo',
    useCases: ['uso 1', 'uso 2'],
    commonErrors: ['erro 1', 'erro 2'],
    tips: 'Dica importante'
  },
  tags: ['tag1', 'tag2']
}
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

### Próximas Features
- [ ] Modo escuro
- [ ] Busca de flashcards
- [ ] Criação de flashcards personalizados
- [ ] Compartilhamento de progresso
- [ ] Sistema de conquistas/badges
- [ ] Modo de revisão espaçada (Spaced Repetition)
- [ ] Exportação de progresso (PDF/CSV)
- [ ] Suporte a outros idiomas
- [ ] PWA (Progressive Web App)
- [ ] Notificações de estudo

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para auxiliar no aprendizado de programação em C.

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](../../issues) descrevendo:
- O que aconteceu
- O que deveria acontecer
- Passos para reproduzir
- Screenshots (se aplicável)

---

## 💬 Suporte

Dúvidas ou sugestões? Entre em contato através das issues do GitHub.

---

## 🙏 Agradecimentos

- Vue.js Team
- Firebase Team
- Tailwind CSS Team
- Comunidade open source

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!**
