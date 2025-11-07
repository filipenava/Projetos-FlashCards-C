# Sistema de Flashcards para Linguagem C

Sistema interativo de estudos focado no aprendizado da linguagem C, com flashcards organizados por categoria, exemplos práticos e sistema de progresso.

## 🚀 Tecnologias

- **Vue 3** - Framework JavaScript progressivo
- **Vite** - Build tool rápido
- **Vue Router** - Roteamento SPA
- **Pinia** - Gerenciamento de estado
- **Tailwind CSS** - Framework CSS utility-first

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 🎯 Funcionalidades

- ✅ **10+ Categorias de Estudo** - Fundamentos, Tipos de Dados, Variáveis, Ponteiros, Arrays, Strings, Funções, Operadores, etc.
- ✅ **Sistema de Flashcards Interativo** - Animação de flip para visualizar frente e verso
- ✅ **Progresso Persistente** - LocalStorage salva automaticamente seu progresso
- ✅ **Múltiplos Níveis** - Iniciante, Intermediário e Avançado
- ✅ **Exemplos de Código** - Cada card inclui exemplos práticos funcionais
- ✅ **Casos de Uso** - Aplicações reais dos conceitos
- ✅ **Erros Comuns** - Alertas sobre armadilhas frequentes
- ✅ **Dicas e Boas Práticas** - Recomendações de especialistas
- ✅ **Estatísticas Detalhadas** - Acompanhe seu progresso por categoria
- ✅ **Design Responsivo** - Funciona perfeitamente em desktop e mobile

## 📁 Estrutura do Projeto

```
flashcards-c/
├── src/
│   ├── components/      # Componentes Vue reutilizáveis
│   ├── views/          # Páginas principais
│   │   ├── Dashboard.vue
│   │   ├── Categories.vue
│   │   ├── StudyMode.vue
│   │   └── Statistics.vue
│   ├── stores/         # Pinia stores
│   │   └── flashcards.js
│   ├── data/           # Dados dos flashcards
│   │   └── flashcards.js
│   ├── router/         # Configuração de rotas
│   │   └── index.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── REQUISITOS.md
```

## 🎓 Categorias Disponíveis

1. **Fundamentos Básicos** - Introdução, estrutura, compilação
2. **Tipos de Dados** - int, float, double, char, modificadores
3. **Variáveis e Constantes** - Declaração, escopo, classes de armazenamento
4. **Operadores** - Aritméticos, lógicos, relacionais, bit a bit
5. **Estruturas de Controle** - if/else, switch, loops
6. **Funções** - Declaração, parâmetros, recursão
7. **Arrays** - Vetores unidimensionais e multidimensionais
8. **Strings** - Manipulação e funções da biblioteca
9. **Ponteiros** - Conceitos, aritmética, aplicações
10. **Gerenciamento de Memória** - malloc, free, boas práticas

## 💡 Como Usar

1. **Dashboard** - Visualize seu progresso geral e acesse as categorias
2. **Selecione uma Categoria** - Escolha o tópico que deseja estudar
3. **Estude os Flashcards** - Clique no card para ver a resposta completa
4. **Marque seu Entendimento** - "Entendi", "Não Entendi" ou "Revisar Depois"
5. **Acompanhe Estatísticas** - Veja seu progresso e atividade recente

## 🎨 Paleta de Cores

- **Primary (Azul)**: `#2563eb` - Confiança e foco
- **Secondary (Verde)**: `#16a34a` - Progresso e sucesso
- **Accent (Laranja)**: `#ea580c` - Atenção e energia

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

## 🔧 Configuração do Ambiente

O projeto utiliza:
- Node.js 16+ recomendado
- NPM ou Yarn
- Navegadores modernos (Chrome, Firefox, Edge, Safari)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Adicionar novos flashcards
- Melhorar explicações existentes
- Corrigir erros
- Sugerir novas funcionalidades

## 📞 Suporte

Para dúvidas ou sugestões, consulte o documento `REQUISITOS.md` para mais detalhes sobre o projeto.

---

**Bons estudos! 📚💻**
