export const flashcardsData = [
  // Fundamentos Básicos
  {
    id: 'fb-001',
    category: 'fundamentos',
    categoryName: 'Fundamentos Básicos',
    difficulty: 'beginner',
    question: 'O que é a linguagem C?',
    answer: {
      concept: 'C é uma linguagem de programação de propósito geral, procedural e de baixo nível, criada por Dennis Ritchie em 1972. É amplamente usada para desenvolvimento de sistemas operacionais, drivers e software embarcado.',
      syntax: null,
      example: `// Primeiro programa em C
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      useCases: [
        'Desenvolvimento de sistemas operacionais (Linux, Windows)',
        'Programação de sistemas embarcados',
        'Drivers de dispositivos',
        'Jogos e engines gráficas',
        'Compiladores e interpretadores'
      ],
      commonErrors: [
        'Esquecer de incluir bibliotecas necessárias',
        'Não retornar valor na função main',
        'Esquecer o ponto e vírgula'
      ],
      tips: 'C é a base para muitas linguagens modernas como C++, Java e C#. Aprender C solidifica o entendimento de como computadores funcionam.'
    },
    tags: ['introdução', 'história', 'conceito']
  },
  
  // Tipos de Dados
  {
    id: 'td-001',
    category: 'tipos-dados',
    categoryName: 'Tipos de Dados',
    difficulty: 'beginner',
    question: 'Quais são os tipos de dados primitivos em C?',
    answer: {
      concept: 'C possui tipos de dados básicos para armazenar diferentes tipos de valores: inteiros, caracteres, números de ponto flutuante e void.',
      syntax: `int     // Números inteiros
float   // Números decimais (precisão simples)
double  // Números decimais (precisão dupla)
char    // Caracteres únicos
void    // Sem tipo`,
      example: `#include <stdio.h>

int main() {
    int idade = 25;
    float altura = 1.75;
    double salario = 3500.50;
    char inicial = 'J';
    
    printf("Idade: %d\\n", idade);
    printf("Altura: %.2f\\n", altura);
    printf("Salário: %.2lf\\n", salario);
    printf("Inicial: %c\\n", inicial);
    
    return 0;
}`,
      useCases: [
        'int: contadores, índices, números inteiros',
        'float/double: cálculos matemáticos, valores monetários',
        'char: caracteres individuais, códigos ASCII',
        'void: funções sem retorno, ponteiros genéricos'
      ],
      commonErrors: [
        'Usar float quando precisão double é necessária',
        'Confundir char com string',
        'Overflow em operações com int'
      ],
      tips: 'Use sizeof() para verificar o tamanho de cada tipo no seu sistema. Ex: sizeof(int)'
    },
    tags: ['tipos', 'primitivos', 'dados']
  },
  
  {
    id: 'td-002',
    category: 'tipos-dados',
    categoryName: 'Tipos de Dados',
    difficulty: 'intermediate',
    question: 'O que são modificadores de tipo em C?',
    answer: {
      concept: 'Modificadores alteram o tamanho ou sinal dos tipos de dados básicos. São: signed, unsigned, short e long.',
      syntax: `short int
long int
unsigned int
signed int
long long int
unsigned long long`,
      example: `#include <stdio.h>
#include <limits.h>

int main() {
    short int s = 32767;
    unsigned int u = 4294967295U;
    long long ll = 9223372036854775807LL;
    
    printf("Short: %d (min: %d, max: %d)\\n", s, SHRT_MIN, SHRT_MAX);
    printf("Unsigned: %u (max: %u)\\n", u, UINT_MAX);
    printf("Long Long: %lld\\n", ll);
    
    return 0;
}`,
      useCases: [
        'unsigned: quando valores negativos não são necessários (dobra o range positivo)',
        'short: economizar memória com valores pequenos',
        'long: valores muito grandes',
        'long long: cálculos astronômicos ou financeiros de alta precisão'
      ],
      commonErrors: [
        'Overflow ao ultrapassar limites do tipo',
        'Usar unsigned sem entender comportamento de underflow',
        'Misturar signed e unsigned em comparações'
      ],
      tips: 'Use a biblioteca <limits.h> para conhecer os limites de cada tipo no seu sistema.'
    },
    tags: ['modificadores', 'tipos', 'signed', 'unsigned']
  },

  // Variáveis
  {
    id: 'var-001',
    category: 'variaveis',
    categoryName: 'Variáveis e Constantes',
    difficulty: 'beginner',
    question: 'Como declarar e inicializar variáveis em C?',
    answer: {
      concept: 'Variáveis são espaços na memória para armazenar dados. Devem ser declaradas com um tipo antes de serem usadas.',
      syntax: `tipo nome_variavel;              // Declaração
tipo nome_variavel = valor;     // Declaração + Inicialização
tipo var1, var2, var3;          // Múltiplas variáveis`,
      example: `#include <stdio.h>

int main() {
    // Declaração
    int x;
    
    // Inicialização
    x = 10;
    
    // Declaração + Inicialização
    int y = 20;
    float pi = 3.14159;
    char letra = 'A';
    
    // Múltiplas variáveis
    int a = 1, b = 2, c = 3;
    
    printf("x = %d, y = %d\\n", x, y);
    printf("pi = %.2f, letra = %c\\n", pi, letra);
    
    return 0;
}`,
      useCases: [
        'Armazenar valores temporários em cálculos',
        'Guardar entrada do usuário',
        'Contadores em loops',
        'Flags e estados do programa'
      ],
      commonErrors: [
        'Usar variável sem inicializar (valor lixo)',
        'Nomes de variáveis com espaços ou começando com números',
        'Usar palavras reservadas como nomes de variáveis'
      ],
      tips: 'Sempre inicialize variáveis antes de usar. Use nomes descritivos: "idade" é melhor que "x".'
    },
    tags: ['variáveis', 'declaração', 'inicialização']
  },

  {
    id: 'var-002',
    category: 'variaveis',
    categoryName: 'Variáveis e Constantes',
    difficulty: 'intermediate',
    question: 'Qual a diferença entre escopo local e global?',
    answer: {
      concept: 'O escopo define onde uma variável pode ser acessada. Variáveis globais são acessíveis em todo o programa, enquanto locais apenas dentro de sua função/bloco.',
      syntax: `int global;  // Variável global (fora de funções)

void funcao() {
    int local;  // Variável local (dentro de função)
}`,
      example: `#include <stdio.h>

int contador = 0;  // Global

void incrementar() {
    contador++;  // Acessa global
    int temp = 100;  // Local
    printf("Temp local: %d\\n", temp);
}

int main() {
    int x = 10;  // Local de main
    
    printf("Contador inicial: %d\\n", contador);
    incrementar();
    printf("Contador após função: %d\\n", contador);
    
    // printf("%d", temp);  // ERRO! temp não existe aqui
    
    return 0;
}`,
      useCases: [
        'Global: configurações, constantes compartilhadas',
        'Local: variáveis temporárias, cálculos intermediários',
        'Evitar globais quando possível (melhor manutenção)'
      ],
      commonErrors: [
        'Abusar de variáveis globais',
        'Shadowing: variável local com mesmo nome que global',
        'Acessar variável fora de seu escopo'
      ],
      tips: 'Prefira variáveis locais. Globais devem ser usadas com cuidado pois podem ser modificadas por qualquer função.'
    },
    tags: ['escopo', 'global', 'local', 'variáveis']
  },

  // Ponteiros
  {
    id: 'ptr-001',
    category: 'ponteiros',
    categoryName: 'Ponteiros',
    difficulty: 'intermediate',
    question: 'O que é um ponteiro em C?',
    answer: {
      concept: 'Um ponteiro é uma variável que armazena o endereço de memória de outra variável. É fundamental para manipulação de memória dinâmica e estruturas de dados.',
      syntax: `tipo *nome_ponteiro;       // Declaração
&variavel                  // Operador de endereço
*ponteiro                  // Operador de desreferência`,
      example: `#include <stdio.h>

int main() {
    int x = 10;
    int *ptr = &x;  // ptr armazena o endereço de x
    
    printf("Valor de x: %d\\n", x);
    printf("Endereço de x: %p\\n", (void*)&x);
    printf("Valor de ptr: %p\\n", (void*)ptr);
    printf("Valor apontado por ptr: %d\\n", *ptr);
    
    *ptr = 20;  // Modifica x através do ponteiro
    printf("Novo valor de x: %d\\n", x);
    
    return 0;
}`,
      useCases: [
        'Passagem de parâmetros por referência',
        'Alocação dinâmica de memória',
        'Manipulação de arrays e strings',
        'Estruturas de dados (listas, árvores)',
        'Funções que retornam múltiplos valores'
      ],
      commonErrors: [
        'Usar ponteiro não inicializado (ponteiro selvagem)',
        'Desreferenciar ponteiro NULL',
        'Esquecer de liberar memória alocada',
        'Confundir * (declaração) com * (desreferência)'
      ],
      tips: 'Sempre inicialize ponteiros! Use NULL quando não apontar para nada. Verifique se ponteiro é NULL antes de desreferenciar.'
    },
    tags: ['ponteiros', 'memória', 'endereço']
  },

  // Operadores
  {
    id: 'op-001',
    category: 'operadores',
    categoryName: 'Operadores',
    difficulty: 'beginner',
    question: 'Qual a diferença entre = e == em C?',
    answer: {
      concept: '= é o operador de atribuição (atribui valor). == é o operador de comparação (verifica igualdade).',
      syntax: `x = 5;      // Atribuição: x recebe 5
x == 5      // Comparação: x é igual a 5? (retorna 1 ou 0)`,
      example: `#include <stdio.h>

int main() {
    int x = 10;  // Atribuição
    
    if (x == 10) {  // Comparação
        printf("x é igual a 10\\n");
    }
    
    // ERRO COMUM:
    if (x = 5) {  // Atribui 5 a x e depois testa (sempre true se != 0)
        printf("Isto sempre executará!\\n");
    }
    
    printf("x agora vale: %d\\n", x);  // 5, não 10!
    
    return 0;
}`,
      useCases: [
        '= : atribuir valores a variáveis',
        '== : condições em if, while, for',
        '== : validações e comparações'
      ],
      commonErrors: [
        'Usar = em condições ao invés de ==',
        'Achar que == modifica valores',
        'Comparar floats com == (imprecisão)'
      ],
      tips: 'Para evitar erros, alguns programadores colocam a constante primeiro: if (5 == x). Assim, if (5 = x) dá erro de compilação!'
    },
    tags: ['operadores', 'atribuição', 'comparação']
  },

  // Estruturas de Controle
  {
    id: 'ec-001',
    category: 'controle',
    categoryName: 'Estruturas de Controle',
    difficulty: 'beginner',
    question: 'Como funciona o if-else em C?',
    answer: {
      concept: 'if-else permite executar código condicionalmente. Se a condição é verdadeira (diferente de 0), executa o bloco if, senão executa o else.',
      syntax: `if (condição) {
    // código se verdadeiro
} else if (outra_condição) {
    // código se segunda condição verdadeira
} else {
    // código se todas falsas
}`,
      example: `#include <stdio.h>

int main() {
    int nota = 85;
    
    if (nota >= 90) {
        printf("Conceito: A\\n");
    } else if (nota >= 80) {
        printf("Conceito: B\\n");
    } else if (nota >= 70) {
        printf("Conceito: C\\n");
    } else if (nota >= 60) {
        printf("Conceito: D\\n");
    } else {
        printf("Conceito: F\\n");
    }
    
    // if de uma linha (sem chaves)
    if (nota >= 60)
        printf("Aprovado!\\n");
    else
        printf("Reprovado!\\n");
    
    return 0;
}`,
      useCases: [
        'Validação de entrada do usuário',
        'Decisões baseadas em condições',
        'Controle de fluxo do programa',
        'Tratamento de casos especiais'
      ],
      commonErrors: [
        'Esquecer chaves em blocos com múltiplas linhas',
        'Usar = ao invés de == na condição',
        'Ponto e vírgula após o if: if(x > 0); {...}'
      ],
      tips: 'Sempre use chaves {} mesmo para uma linha. Isso evita bugs quando adicionar mais código depois.'
    },
    tags: ['if', 'else', 'condicionais', 'controle']
  },

  // Funções
  {
    id: 'fun-001',
    category: 'funcoes',
    categoryName: 'Funções',
    difficulty: 'beginner',
    question: 'Como declarar e usar funções em C?',
    answer: {
      concept: 'Funções são blocos de código reutilizáveis que executam uma tarefa específica. Podem receber parâmetros e retornar valores.',
      syntax: `tipo_retorno nome_funcao(tipo param1, tipo param2) {
    // corpo da função
    return valor;
}`,
      example: `#include <stdio.h>

// Declaração (protótipo)
int somar(int a, int b);
void saudar(char nome[]);
double calcularMedia(int valores[], int tamanho);

// Definição
int somar(int a, int b) {
    return a + b;
}

void saudar(char nome[]) {
    printf("Olá, %s!\\n", nome);
}

double calcularMedia(int valores[], int tamanho) {
    int soma = 0;
    for (int i = 0; i < tamanho; i++) {
        soma += valores[i];
    }
    return (double)soma / tamanho;
}

int main() {
    int resultado = somar(5, 3);
    printf("5 + 3 = %d\\n", resultado);
    
    saudar("Maria");
    
    int notas[] = {8, 9, 7, 10};
    double media = calcularMedia(notas, 4);
    printf("Média: %.2f\\n", media);
    
    return 0;
}`,
      useCases: [
        'Dividir código em partes reutilizáveis',
        'Organizar lógica complexa',
        'Evitar repetição de código',
        'Facilitar testes e manutenção'
      ],
      commonErrors: [
        'Esquecer de declarar protótipo antes de usar',
        'Tipo de retorno não corresponde ao return',
        'Não retornar valor em função não-void',
        'Número ou tipo de argumentos incorreto'
      ],
      tips: 'Sempre declare protótipos no início ou use header files. Funções devem fazer uma coisa e fazer bem!'
    },
    tags: ['funções', 'declaração', 'parâmetros', 'retorno']
  },

  // Arrays
  {
    id: 'arr-001',
    category: 'arrays',
    categoryName: 'Arrays',
    difficulty: 'beginner',
    question: 'Como declarar e usar arrays em C?',
    answer: {
      concept: 'Arrays são coleções de elementos do mesmo tipo, armazenados em posições consecutivas de memória. Indexados a partir de 0.',
      syntax: `tipo nome[tamanho];                    // Declaração
tipo nome[] = {val1, val2, ...};      // Com inicialização
tipo nome[tamanho] = {val1, val2};    // Parcial`,
      example: `#include <stdio.h>

int main() {
    // Declaração
    int numeros[5];
    
    // Inicialização
    int valores[] = {10, 20, 30, 40, 50};
    
    // Acesso
    printf("Primeiro elemento: %d\\n", valores[0]);
    printf("Último elemento: %d\\n", valores[4]);
    
    // Modificação
    valores[2] = 100;
    
    // Iteração
    for (int i = 0; i < 5; i++) {
        printf("valores[%d] = %d\\n", i, valores[i]);
    }
    
    // Tamanho do array
    int tamanho = sizeof(valores) / sizeof(valores[0]);
    printf("Tamanho: %d elementos\\n", tamanho);
    
    return 0;
}`,
      useCases: [
        'Armazenar coleções de dados',
        'Implementar estruturas de dados',
        'Processar múltiplos valores',
        'Matrizes e tabelas'
      ],
      commonErrors: [
        'Acessar índice fora dos limites (buffer overflow)',
        'Esquecer que índices começam em 0',
        'Não inicializar elementos',
        'Passar array sem seu tamanho para função'
      ],
      tips: 'Arrays não guardam seu tamanho! Sempre passe o tamanho como parâmetro para funções. Use sizeof para calcular tamanho.'
    },
    tags: ['arrays', 'vetores', 'coleções']
  },

  // Strings
  {
    id: 'str-001',
    category: 'strings',
    categoryName: 'Strings',
    difficulty: 'beginner',
    question: 'Como funcionam strings em C?',
    answer: {
      concept: 'Em C, strings são arrays de caracteres terminados com \'\\0\' (null terminator). Não existe tipo string primitivo.',
      syntax: `char nome[tamanho];
char nome[] = "texto";
char *nome = "texto";  // String literal (read-only)`,
      example: `#include <stdio.h>
#include <string.h>

int main() {
    // Declaração
    char nome[50] = "João";
    char sobrenome[] = "Silva";
    char *mensagem = "Olá, Mundo!";
    
    // Exibição
    printf("%s %s\\n", nome, sobrenome);
    printf("%s\\n", mensagem);
    
    // Tamanho
    printf("Comprimento de nome: %lu\\n", strlen(nome));
    
    // Cópia
    char copia[50];
    strcpy(copia, nome);
    
    // Concatenação
    strcat(nome, " Pedro");
    printf("Nome completo: %s\\n", nome);
    
    // Comparação
    if (strcmp(nome, copia) == 0) {
        printf("Strings iguais\\n");
    }
    
    // Acesso a caracteres
    printf("Primeira letra: %c\\n", nome[0]);
    
    return 0;
}`,
      useCases: [
        'Armazenar texto',
        'Entrada de dados do usuário',
        'Manipulação de texto',
        'Nomes, mensagens, caminhos de arquivo'
      ],
      commonErrors: [
        'Buffer overflow ao copiar strings',
        'Esquecer do \'\\0\' ao manipular manualmente',
        'Usar == para comparar strings (compara endereços!)',
        'Modificar string literal'
      ],
      tips: 'Use funções da string.h (strcpy, strcat, strcmp). Sempre reserve espaço extra para o \'\\0\'. Prefira strncpy e strncat para segurança.'
    },
    tags: ['strings', 'caracteres', 'texto']
  }
]
