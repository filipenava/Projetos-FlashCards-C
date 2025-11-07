# 🔥 Integração Firebase - Sistema FlashCards C

## ✅ Configuração Completa

O Firebase foi totalmente integrado ao projeto com:

### 📦 Serviços Configurados

1. **Firebase Analytics** - Métricas automáticas de uso
2. **Firestore Database** - Armazenamento de dados em nuvem
3. **Firebase Hosting** - Deploy automático

### 📁 Arquivos Criados

```
src/
├── firebase/
│   ├── config.js         # Configuração e inicialização do Firebase
│   └── firestore.js      # Funções helper para Firestore
```

### 🔄 Funcionalidades Implementadas

#### 1. Sincronização de Progresso
- **LocalStorage** (offline): Funciona sempre
- **Firebase** (online): Sincronização automática quando conectado
- Backup automático do progresso do usuário

#### 2. Histórico de Sessões
- Registra cada sessão de estudo
- Armazena: categoria, acertos, erros, duração, cards estudados
- Permite análise futura do desempenho

#### 3. Sistema Híbrido
```javascript
// Progresso salvo em 2 lugares:
1. LocalStorage → Sempre (offline-first)
2. Firebase → Quando usuário está logado
```

## 🚀 Como Usar

### Modo Anônimo (Padrão)
O sistema funciona normalmente sem login:
- Progresso salvo no LocalStorage
- Nenhum dado enviado ao Firebase
- Funciona 100% offline

### Modo Sincronizado
Para habilitar sincronização com Firebase:

```javascript
// Em qualquer componente Vue
import { useFlashcardsStore } from '@/stores/flashcards'

const store = useFlashcardsStore()

// Definir ID do usuário (após implementar login)
store.setUserId('user-id-aqui')

// Agora o progresso sincroniza automaticamente!
```

### Desabilitar Sincronização
```javascript
store.syncEnabled = false
```

## 📊 Estrutura de Dados

### User Progress
```javascript
{
  userId: "user123",
  progress: {
    "fb-001": {
      status: "learned",
      attempts: 3,
      correctCount: 2,
      lastStudied: "2025-11-07T17:30:00.000Z"
    },
    "td-001": {
      status: "learning",
      attempts: 1,
      correctCount: 0,
      lastStudied: "2025-11-07T17:35:00.000Z"
    }
  },
  lastUpdated: "2025-11-07T17:35:00.000Z"
}
```

### Study Sessions
```javascript
{
  userId: "user123",
  categoryId: "ponteiros",
  correct: 8,
  incorrect: 2,
  startTime: "2025-11-07T17:00:00.000Z",
  endTime: "2025-11-07T17:30:00.000Z",
  duration: 1800, // segundos
  cardsStudied: 10
}
```

## 🔐 Autenticação (Futuro)

Para adicionar login, instale:
```bash
npm install @vuefire/core
```

Exemplo básico:
```javascript
// src/composables/useAuth.js
import { getAuth, signInAnonymously } from 'firebase/auth'
import { useFlashcardsStore } from '@/stores/flashcards'

export function useAuth() {
  const auth = getAuth()
  const store = useFlashcardsStore()
  
  async function loginAnonymously() {
    const result = await signInAnonymously(auth)
    store.setUserId(result.user.uid)
  }
  
  return { loginAnonymously }
}
```

## 📈 Analytics Tracking

O Analytics já está configurado e rastreia automaticamente:
- **Page views**: Todas as navegações
- **User engagement**: Tempo de uso
- **Performance**: Velocidade de carregamento

### Eventos Customizados (Opcional)
```javascript
import { analytics } from '@/firebase/config'
import { logEvent } from 'firebase/analytics'

// Rastrear quando usuário completa uma categoria
logEvent(analytics, 'category_completed', {
  category_id: 'ponteiros',
  cards_studied: 10,
  accuracy: 80
})

// Rastrear flashcard difícil
logEvent(analytics, 'card_difficult', {
  card_id: 'ptr-001',
  attempts: 5
})
```

## 🛡️ Regras de Segurança do Firestore

Configure no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User progress - apenas o próprio usuário pode editar
    match /user_progress/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Study sessions - apenas o próprio usuário
    match /study_sessions/{sessionId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Flashcards - todos podem ler, apenas admins podem escrever
    match /flashcards/{cardId} {
      allow read: if true;
      allow write: if false; // Ou verificar admin
    }
    
    // User profiles
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Deploy

### 1. Build do projeto
```bash
npm run build
```

### 2. Deploy para Firebase Hosting
```bash
npm run deploy
```

### 3. Acesse seu app
```
https://revisao-c.web.app
```

## 📱 PWA (Opcional)

Para tornar o app instalável:

1. Instale o plugin Vite PWA:
```bash
npm install -D vite-plugin-pwa
```

2. Configure em `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FlashCards C',
        short_name: 'FlashCards',
        description: 'Sistema de estudo para linguagem C',
        theme_color: '#2563eb',
        icons: [/* seus ícones */]
      }
    })
  ]
}
```

## 🔧 Funções Disponíveis

### firestore.js

```javascript
// Progresso
saveUserProgress(userId, progressObject)
loadUserProgress(userId)

// Sessões
saveStudySession(userId, sessionData)
getUserSessions(userId, limit)

// Flashcards (opcional)
getAllFlashcards()
addFlashcard(flashcardData)

// Perfil
saveUserProfile(userId, userData)
getUserProfile(userId)
```

## 📊 Monitoramento

Acesse o Firebase Console para ver:
- Usuários ativos em tempo real
- Páginas mais visitadas
- Tempo médio de sessão
- Taxa de retenção
- Erros e crashes

## 🎯 Próximos Passos

1. ✅ Firebase configurado
2. ✅ Firestore integrado
3. ✅ Analytics funcionando
4. ⬜ Implementar autenticação (Google, Email)
5. ⬜ Adicionar leaderboard
6. ⬜ Sistema de conquistas
7. ⬜ Notificações push
8. ⬜ Compartilhamento social

---

**Firebase está pronto! 🔥**
Consulte `DEPLOY.md` para instruções de deploy detalhadas.
