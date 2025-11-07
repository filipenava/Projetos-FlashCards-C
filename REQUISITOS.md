# Documento de Requisitos - Sistema de Flashcards para Linguagem C

## 1. Visão Geral do Projeto

### 1.1 Objetivo
Desenvolver um sistema interativo de flashcards para auxiliar no aprendizado da linguagem de programação C, abrangendo desde conceitos básicos até tópicos avançados, com explicações detalhadas, exemplos práticos e aplicações reais.

### 1.2 Escopo
O sistema abrangerá todos os aspectos fundamentais e avançados da linguagem C, incluindo:
- Tipos de dados e variáveis
- Operadores e expressões
- Estruturas de controle
- Funções e escopo
- Ponteiros e gerenciamento de memória
- Arrays e strings
- Estruturas e uniões
- Manipulação de arquivos
- Preprocessador
- Técnicas avançadas

### 1.3 Público-Alvo
- Iniciantes em programação
- Estudantes de ciência da computação
- Desenvolvedores em transição para C
- Profissionais buscando revisão de conceitos

---

## 2. Requisitos Funcionais

### 2.1 Gestão de Flashcards

#### RF-001: Categorização de Conteúdo
**Descrição:** O sistema deve organizar os flashcards em categorias hierárquicas.

**Categorias Principais:**
1. **Fundamentos Básicos**
   - Introdução à linguagem C
   - Primeiro programa
   - Estrutura básica
   - Compilação e execução

2. **Tipos de Dados**
   - Tipos primitivos (int, float, double, char)
   - Modificadores de tipo (short, long, signed, unsigned)
   - Tipo void
   - Tamanhos e limites
   - Conversão de tipos

3. **Variáveis e Constantes**
   - Declaração de variáveis
   - Inicialização
   - Escopo (local, global, estático)
   - Classe de armazenamento (auto, register, static, extern)
   - Constantes (#define, const)
   - Literais

4. **Operadores**
   - Aritméticos
   - Relacionais
   - Lógicos
   - Bit a bit
   - Atribuição
   - Incremento/Decremento
   - Ternário
   - Precedência e associatividade

5. **Estruturas de Controle**
   - if/else
   - switch/case
   - Loops (for, while, do-while)
   - break, continue, goto
   - Controle de fluxo aninhado

6. **Funções**
   - Declaração e definição
   - Parâmetros (por valor, por referência)
   - Retorno de valores
   - Recursão
   - Funções inline
   - Funções variádicas

7. **Arrays**
   - Arrays unidimensionais
   - Arrays multidimensionais
   - Inicialização
   - Passagem para funções
   - Arrays de caracteres

8. **Strings**
   - Manipulação de strings
   - Funções da biblioteca string.h
   - Strings literais
   - Operações comuns

9. **Ponteiros**
   - Conceito de ponteiro
   - Operadores (* e &)
   - Aritmética de ponteiros
   - Ponteiros para ponteiros
   - Ponteiros void
   - Ponteiros para funções
   - Ponteiros constantes vs ponteiros para constantes

10. **Gerenciamento de Memória**
    - Alocação estática vs dinâmica
    - malloc, calloc, realloc, free
    - Memory leaks
    - Boas práticas

11. **Estruturas e Uniões**
    - Definição de struct
    - Acesso a membros
    - Estruturas aninhadas
    - typedef
    - Uniões (union)
    - Enumerações (enum)
    - Bit fields

12. **Manipulação de Arquivos**
    - Abertura e fechamento (fopen, fclose)
    - Leitura (fread, fscanf, fgets)
    - Escrita (fwrite, fprintf, fputs)
    - Posicionamento (fseek, ftell, rewind)
    - Modos de abertura

13. **Preprocessador**
    - Diretivas #include, #define
    - Macros
    - Compilação condicional (#ifdef, #ifndef, #if)
    - #pragma
    - Macros predefinidas

14. **Tópicos Avançados**
    - Bibliotecas padrão
    - Manipulação de bits
    - Argumentos de linha de comando
    - Estruturas de dados complexas
    - Tratamento de erros
    - Debug e profiling

#### RF-002: Estrutura do Flashcard
Cada flashcard deve conter:
- **Frente:** Pergunta ou conceito
- **Verso:** Resposta detalhada com:
  - Explicação conceitual
  - Sintaxe (quando aplicável)
  - Exemplo de código prático
  - Casos de uso comuns
  - Erros frequentes e como evitá-los
  - Dicas e boas práticas
  - Referências relacionadas

**Exemplo de Estrutura:**
```
FRENTE:
"O que é um ponteiro em C?"

VERSO:
CONCEITO:
Um ponteiro é uma variável que armazena o endereço de memória de outra variável.

SINTAXE:
tipo *nome_ponteiro;

EXEMPLO:
int x = 10;
int *ptr = &x;  // ptr armazena o endereço de x
printf("%d", *ptr);  // imprime 10

CASOS DE USO:
- Passagem de parâmetros por referência
- Alocação dinâmica de memória
- Manipulação de arrays e strings
- Estruturas de dados complexas

ERROS COMUNS:
- Usar ponteiro não inicializado
- Esquecer de liberar memória alocada
- Confundir * (desreferência) com & (endereço)

DICA:
Sempre inicialize ponteiros ou atribua NULL para evitar comportamento indefinido.
```

#### RF-003: Sistema de Dificuldade
O sistema deve classificar cada flashcard em níveis:
- **Iniciante:** Conceitos básicos e sintaxe fundamental
- **Intermediário:** Aplicações práticas e combinações de conceitos
- **Avançado:** Técnicas complexas, otimizações e nuances

#### RF-004: Busca e Filtros
- Buscar flashcards por palavra-chave
- Filtrar por categoria
- Filtrar por nível de dificuldade
- Filtrar por tags (memória, sintaxe, biblioteca, etc.)

#### RF-005: Sistema de Progresso
- Marcar flashcards como "Aprendido", "Em Aprendizado", "Não Estudado"
- Rastrear taxa de acerto
- Identificar conceitos com maior dificuldade
- Gerar relatórios de progresso

### 2.2 Modos de Estudo

#### RF-006: Modo Prática
- Apresentar flashcards sequencialmente
- Permitir revirar o card para ver a resposta
- Opções: "Sei", "Não sei", "Revisar depois"
- Navegação (próximo, anterior, pular)

#### RF-007: Modo Quiz
- Perguntas de múltipla escolha
- Perguntas verdadeiro/falso
- Preenchimento de código
- Feedback imediato
- Pontuação ao final

#### RF-008: Modo Estudo Espaçado
- Implementar algoritmo de repetição espaçada
- Revisitar flashcards com base no desempenho
- Maior frequência para conceitos não dominados

#### RF-009: Modo Aleatório
- Selecionar flashcards aleatoriamente
- Opção de limitar por categoria
- Útil para revisão geral

#### RF-010: Modo Maratona
- Estudar uma categoria completa
- Modo cronometrado opcional
- Estatísticas ao final

### 2.3 Recursos Adicionais

#### RF-011: Exemplos Interativos
- Código executável embutido (se possível)
- Explicação linha a linha
- Variações do código
- Saída esperada

#### RF-012: Notas Pessoais
- Permitir adicionar notas a cada flashcard
- Destacar partes importantes
- Criar lembretes personalizados

#### RF-013: Favoritos
- Marcar flashcards como favoritos
- Criar coleções personalizadas
- Exportar favoritos

#### RF-014: Sistema de Tags
- Tags predefinidas: sintaxe, memória, ponteiros, arquivos, etc.
- Tags personalizadas
- Busca por tags

#### RF-015: Histórico de Estudo
- Registrar sessões de estudo
- Tempo dedicado por categoria
- Evolução ao longo do tempo
- Calendário de estudos

---

## 3. Requisitos Não-Funcionais

### 3.1 Usabilidade
**RNF-001:** Interface intuitiva e limpa
**RNF-002:** Navegação fácil entre categorias
**RNF-003:** Design responsivo (desktop e mobile)
**RNF-004:** Atalhos de teclado para ações comuns
**RNF-005:** Feedback visual claro para todas as ações

### 3.2 Performance
**RNF-006:** Carregamento de flashcards em menos de 2 segundos
**RNF-007:** Busca retornando resultados em menos de 1 segundo
**RNF-008:** Suporte para pelo menos 500+ flashcards sem degradação

### 3.3 Portabilidade
**RNF-009:** Funcionar em navegadores modernos (Chrome, Firefox, Edge, Safari)
**RNF-010:** Compatível com Windows, Linux e macOS
**RNF-011:** Versão mobile responsiva

### 3.4 Manutenibilidade
**RNF-012:** Código organizado e documentado
**RNF-013:** Facilidade para adicionar novos flashcards
**RNF-014:** Estrutura modular

### 3.5 Confiabilidade
**RNF-015:** Salvar progresso automaticamente
**RNF-016:** Backup de dados do usuário
**RNF-017:** Recuperação de sessão após fechamento

### 3.6 Acessibilidade
**RNF-018:** Suporte a leitores de tela
**RNF-019:** Contraste adequado para leitura
**RNF-020:** Tamanhos de fonte ajustáveis
**RNF-021:** Navegação via teclado

---

## 4. Conteúdo dos Flashcards

### 4.1 Quantidade Estimada por Categoria

| Categoria | Quantidade Estimada |
|-----------|---------------------|
| Fundamentos Básicos | 15 flashcards |
| Tipos de Dados | 25 flashcards |
| Variáveis e Constantes | 30 flashcards |
| Operadores | 35 flashcards |
| Estruturas de Controle | 30 flashcards |
| Funções | 40 flashcards |
| Arrays | 25 flashcards |
| Strings | 25 flashcards |
| Ponteiros | 50 flashcards |
| Gerenciamento de Memória | 30 flashcards |
| Estruturas e Uniões | 35 flashcards |
| Manipulação de Arquivos | 30 flashcards |
| Preprocessador | 25 flashcards |
| Tópicos Avançados | 40 flashcards |
| **TOTAL** | **~435 flashcards** |

### 4.2 Padrão de Qualidade do Conteúdo

Cada flashcard deve seguir os critérios:
- ✅ Informação tecnicamente precisa
- ✅ Exemplo de código funcional e testado
- ✅ Explicação clara e concisa
- ✅ Contextualização prática
- ✅ Alertas sobre erros comuns
- ✅ Referências cruzadas quando apropriado

---

## 5. Interface do Usuário

### 5.1 Telas Principais

#### Tela 1: Dashboard
- Resumo do progresso
- Categorias disponíveis
- Estatísticas rápidas
- Últimos estudos
- Recomendações de estudo

#### Tela 2: Seleção de Categoria
- Lista de categorias com ícones
- Número de flashcards por categoria
- Progresso em cada categoria
- Filtros e busca

#### Tela 3: Visualização de Flashcard
- Card centralizado
- Botão para virar
- Controles de navegação
- Indicador de progresso
- Opções de feedback
- Barra lateral com informações

#### Tela 4: Quiz
- Pergunta clara
- Opções de resposta
- Timer (opcional)
- Feedback imediato
- Pontuação

#### Tela 5: Estatísticas
- Gráficos de progresso
- Tempo de estudo
- Taxa de acerto
- Áreas de melhoria
- Histórico

#### Tela 6: Configurações
- Preferências de estudo
- Modo escuro/claro
- Notificações
- Exportar/Importar dados

### 5.2 Elementos de Design

**Paleta de Cores Sugerida:**
- Primary: Azul (#2563eb) - confiável e focado
- Secondary: Verde (#16a34a) - progresso e sucesso
- Accent: Laranja (#ea580c) - atenção e energia
- Background: Branco/Cinza claro
- Text: Cinza escuro (#1f2937)
- Code: Fundo cinza com destaque de sintaxe

**Tipografia:**
- Títulos: Sans-serif (Inter, Roboto)
- Corpo: Sans-serif legível
- Código: Monospace (Fira Code, JetBrains Mono)

---

## 6. Tecnologias Sugeridas

### 6.1 Frontend
- **Framework:** React.js ou Vue.js
- **Styling:** Tailwind CSS ou CSS Modules
- **Animações:** Framer Motion
- **Ícones:** Lucide Icons ou Font Awesome

### 6.2 Backend (Firebase)

- **Plataforma:** Firebase (serviços integrados: Authentication, Cloud Firestore, Cloud Functions, Storage, Hosting, Analytics).
- **Banco de Dados:** Cloud Firestore — NoSQL baseado em documentos/coleções, escalável, com suporte a sincronização offline e consultas indexadas.
- **Autenticação:** Firebase Auth (e-mail/senha, provedores OAuth como Google/GitHub), integração com regras de segurança do Firestore.
- **Lógica de Back-end:** Cloud Functions (serverless) para processamento assíncrono, webhooks, validações sensíveis e integrações externas.
- **Armazenamento de Arquivos:** Firebase Storage para imagens, exemplos de código, e outros assets.
- **Segurança:** Regras do Firestore + políticas IAM; validar dados tanto nas regras quanto em Cloud Functions quando necessário.
- **Modelagem e Índices:** Estruturar dados por coleções/subcoleções; usar índices compostos para consultas complexas.
- **Sincronização e Offline:** Firestore oferece cache local e sincronização automática entre cliente e nuvem.
- **Backup e Export:** Planejar exportações regulares (Cloud Scheduler + Cloud Functions ou exportação nativa do Firestore).
- **Custo:** Acompanhamento de leituras/gravações/armazenamento; iniciar com plano gratuito e estimar uso para evitar surpresas.
- **Integração com Frontend:** SDKs oficiais para Web/React/Vue; usar Admin SDK para tarefas administrativas no servidor.

### 6.3 Armazenamento Local
- **LocalStorage:** Para dados do usuário
- **IndexedDB:** Para grande volume de flashcards

### 6.4 Deploy
- **Frontend:** Vercel, Netlify ou GitHub Pages
- **Backend:** Railway, Render ou Heroku

---

## 7. Cronograma de Desenvolvimento

### Fase 1: Planejamento e Design (1-2 semanas)
- [ ] Finalizar requisitos
- [ ] Criar wireframes
- [ ] Definir arquitetura
- [ ] Preparar conteúdo inicial

### Fase 2: Desenvolvimento do Core (3-4 semanas)
- [ ] Estrutura básica da aplicação
- [ ] Sistema de flashcards
- [ ] Navegação entre categorias
- [ ] Visualização de cards

### Fase 3: Funcionalidades Avançadas (2-3 semanas)
- [ ] Sistema de progresso
- [ ] Modos de estudo
- [ ] Sistema de busca
- [ ] Estatísticas

### Fase 4: Conteúdo (2-3 semanas)
- [ ] Criar todos os flashcards
- [ ] Revisar exemplos de código
- [ ] Validar informações técnicas

### Fase 5: Testes e Refinamento (1-2 semanas)
- [ ] Testes de usabilidade
- [ ] Correções de bugs
- [ ] Otimização de performance
- [ ] Ajustes de design

### Fase 6: Deploy e Lançamento (1 semana)
- [ ] Deploy em produção
- [ ] Documentação final
- [ ] Preparar material de divulgação

**Tempo Total Estimado:** 10-15 semanas

---

## 8. Métricas de Sucesso

### 8.1 Indicadores de Performance
- Taxa de retenção de conceitos
- Tempo médio de estudo por sessão
- Número de flashcards completados
- Taxa de conclusão de categorias

### 8.2 Feedback dos Usuários
- Satisfação geral (1-5)
- Facilidade de uso
- Qualidade do conteúdo
- Sugestões de melhoria

### 8.3 Objetivos Quantitativos
- Criar pelo menos 400 flashcards
- Tempo médio de carregamento < 2s
- Taxa de acerto médio > 70%
- Usuários completando pelo menos 3 categorias

---

## 9. Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| Conteúdo técnico incorreto | Alto | Média | Revisão por especialistas, fontes confiáveis |
| Baixo engajamento dos usuários | Médio | Média | Gamificação, design atraente |
| Complexidade técnica | Médio | Baixa | Começar simples, iterar gradualmente |
| Sobrecarga de informação | Alto | Alta | Dividir em módulos menores, progressão clara |

---

## 10. Expansões Futuras

### 10.1 Versão 2.0
- [ ] Exercícios práticos de codificação
- [ ] Sistema de ranking e competições
- [ ] Compartilhamento social
- [ ] Certificados de conclusão

### 10.2 Integrações
- [ ] Compilador C online integrado
- [ ] Integração com GitHub
- [ ] Exportar para Anki
- [ ] API pública

### 10.3 Conteúdo Adicional
- [ ] Flashcards para C++
- [ ] Desafios de algoritmos
- [ ] Projetos práticos guiados
- [ ] Vídeo-aulas complementares

---

## 11. Referências e Recursos

### 11.1 Documentação Oficial
- The C Programming Language (K&R)
- ISO C Standard
- GNU C Library Documentation

### 11.2 Recursos Online
- cppreference.com
- GeeksforGeeks C Programming
- W3Schools C Tutorial
- Tutorialspoint C

### 11.3 Livros Recomendados
- "C Programming: A Modern Approach" - K. N. King
- "Expert C Programming" - Peter van der Linden
- "C Traps and Pitfalls" - Andrew Koenig

---

## 12. Contato e Manutenção

**Responsável pelo Projeto:** [Seu Nome]
**Data de Criação:** 07/11/2025
**Última Atualização:** 07/11/2025
**Versão do Documento:** 1.0

---

## Apêndice A: Glossário

- **Flashcard:** Cartão de estudo com pergunta/conceito na frente e resposta no verso
- **Repetição Espaçada:** Técnica de estudo que aumenta intervalos entre revisões
- **Taxa de Retenção:** Percentual de conceitos retidos após estudo
- **Ponteiro:** Variável que armazena endereço de memória

---

## Apêndice B: Exemplos de Flashcards

### Exemplo 1: Nível Iniciante
**Frente:** Qual a diferença entre `=` e `==` em C?

**Verso:**
- `=` é o operador de **atribuição** (atribui valor)
- `==` é o operador de **comparação** (verifica igualdade)

Exemplo:
```c
int x = 5;      // atribuição: x recebe 5
if (x == 5) {   // comparação: x é igual a 5?
    printf("x é 5");
}
```

**Erro comum:** Usar `=` em condições ao invés de `==`

### Exemplo 2: Nível Intermediário
**Frente:** Como passar um array para uma função em C?

**Verso:**
Arrays são sempre passados por referência (ponteiro).

```c
void printArray(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    printArray(numbers, 5);
    return 0;
}
```

**Importante:** Sempre passe o tamanho do array como parâmetro separado.

### Exemplo 3: Nível Avançado
**Frente:** Explique a diferença entre `char *p` e `char (*p)[]`

**Verso:**
- `char *p` - ponteiro para char
- `char (*p)[]` - ponteiro para array de char

```c
char str[] = "hello";
char *p1 = str;           // p1 aponta para primeiro char
char (*p2)[] = &str;      // p2 aponta para o array inteiro

printf("%c", *p1);         // 'h'
printf("%c", (*p2)[0]);    // 'h'
```

**Uso:** Arrays de ponteiros vs ponteiros para arrays em funções complexas.

---

*Documento gerado para auxiliar no desenvolvimento de um sistema educacional de flashcards focado em linguagem C.*
