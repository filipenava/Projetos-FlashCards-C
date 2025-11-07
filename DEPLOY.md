# 🔥 Guia de Deploy - Firebase

## Pré-requisitos

✅ Firebase CLI instalado globalmente (`npm install -g firebase-tools`)
✅ Conta Google configurada
✅ Projeto Firebase criado (revisao-c)

## Configuração Inicial

### 1. Login no Firebase
```bash
firebase login
```

### 2. Inicializar Projeto (já configurado)
O projeto já está configurado com:
- `firebase.json` - Configuração de hosting
- `.firebaserc` - Projeto padrão: revisao-c
- Regras de rewrite para SPA

### 3. Configurar Firestore (Opcional)

No console do Firebase (https://console.firebase.google.com):
1. Acesse seu projeto "revisao-c"
2. Vá em **Firestore Database**
3. Clique em "Criar banco de dados"
4. Escolha o modo de teste (para desenvolvimento)
5. Selecione a localização (ex: us-central1)

**Regras de segurança recomendadas para desenvolvimento:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura para todos
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Deploy

### 1. Build do Projeto
```bash
npm run build
```
Isso gera a pasta `dist/` com os arquivos otimizados.

### 2. Deploy para Firebase Hosting
```bash
firebase deploy --only hosting
```

### 3. Verificar Deploy
Após o deploy, você receberá uma URL:
```
https://revisao-c.web.app
ou
https://revisao-c.firebaseapp.com
```

## Comandos Úteis

### Ver projeto atual
```bash
firebase use
```

### Testar localmente antes do deploy
```bash
firebase serve
```

### Deploy completo (hosting + firestore + functions)
```bash
firebase deploy
```

### Ver logs
```bash
firebase functions:log
```

### Rollback (voltar versão anterior)
```bash
firebase hosting:rollback
```

## Scripts Adicionais no package.json

Adicione ao `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && firebase deploy --only hosting",
    "deploy:prod": "npm run build && firebase deploy",
    "firebase:serve": "npm run build && firebase serve"
  }
}
```

Depois use:
```bash
npm run deploy
```

## Estrutura de Dados no Firestore

### Coleções criadas automaticamente:

**1. users** - Perfis de usuários
```javascript
{
  userId: string,
  name: string,
  email: string,
  lastLogin: timestamp
}
```

**2. user_progress** - Progresso individual
```javascript
{
  userId: string,
  progress: {
    [cardId]: {
      status: 'learned' | 'learning' | 'review',
      attempts: number,
      correctCount: number,
      lastStudied: timestamp
    }
  },
  lastUpdated: timestamp
}
```

**3. study_sessions** - Histórico de sessões
```javascript
{
  userId: string,
  categoryId: string,
  correct: number,
  incorrect: number,
  startTime: timestamp,
  endTime: timestamp,
  duration: number,
  cardsStudied: number
}
```

**4. flashcards** - Flashcards (opcional)
```javascript
{
  id: string,
  category: string,
  categoryName: string,
  difficulty: string,
  question: string,
  answer: object,
  tags: array
}
```

## Sincronização de Dados

O sistema funciona em **modo híbrido**:
- ✅ **LocalStorage**: Sempre ativo (funciona offline)
- ✅ **Firebase**: Sincronização automática quando online

### Ativar sincronização para um usuário:
```javascript
// No seu código Vue
import { useFlashcardsStore } from '@/stores/flashcards'

const store = useFlashcardsStore()

// Definir ID do usuário (após login)
store.setUserId('user-id-123')

// O progresso será sincronizado automaticamente!
```

## Monitoramento

### Firebase Console
- **Analytics**: Ver uso em tempo real
- **Performance**: Métricas de carregamento
- **Crashlytics**: Erros e crashes

### Google Analytics
Já está configurado! Métricas automáticas:
- Page views
- Eventos customizados
- Taxa de retenção

## Domínio Customizado (Opcional)

1. No Firebase Console → Hosting
2. Clique em "Adicionar domínio personalizado"
3. Siga as instruções para configurar DNS

## Troubleshooting

### Erro: "Firebase command not found"
```bash
npm install -g firebase-tools
```

### Erro: "Not authorized"
```bash
firebase logout
firebase login
```

### Erro de build
```bash
rm -rf node_modules
npm install
npm run build
```

### Deploy não atualiza
Limpe o cache:
```bash
firebase hosting:channel:delete preview
firebase deploy --only hosting
```

---

**🎉 Seu app está pronto para produção!**
