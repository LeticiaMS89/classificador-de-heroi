# 🛡️ Classificador de Nível de Herói

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> Aplicação web interativa para avaliação e classificação de aventureiros com base na sua experiência (XP), desenvolvida com foco em Clean Code, Acessibilidade (WCAG) e uma interface inspirada no universo RPG/Tech.

---

## 📌 Sobre o Projeto

O **Classificador de Nível de Herói** calcula e atribui patentes oficiais a personagens/aventureiros de acordo com a quantidade acumulada de Pontos de Experiência (XP). 

A aplicação foi construída do zero aplicando boas práticas de desenvolvimento front-end, separação clara de responsabilidades (Regras de Negócio isoladas da manipulação do DOM) e design responsivo para desktop e mobile.

---

## 🚀 Funcionalidades

- ⚔️ **Classificação Automática**: Identificação instantânea do Elo/Patente do herói com base em regras predefinidas.
- 📈 **Barra de Progresso Dinâmica**: Exibição da porcentagem necessária para o próximo Elo/Nível.
- 🎨 **Interface Temática RPG/Dark Mode**: Design System construído com Variáveis CSS e paleta de cores personalizada para cada patente.
- ♿ **Acessibilidade e Semântica**: Estruturado com tags HTML5 semânticas, rótulos acessíveis e leitores de tela (`aria-live`).
- 🛑 **Validação de Formulário**: Mensagens de erro amigáveis para campos vazios ou valores numéricos inválidos.
- 📱 **Layout Totalmente Responsivo**: Adaptável para dispositivos móveis, tablets e desktops.

---

## 🏆 Tabela de Ranks & Patentes

| Patente / Elo | Intervalo de Experiência (XP) | Cor Representativa |
| :--- | :--- | :--- |
| **Ferro** | Menor que 1.000 XP | `#94a3b8` |
| **Bronze** | 1.001 a 2.000 XP | `#cd7f32` |
| **Prata** | 2.001 a 5.000 XP | `#cbd5e1` |
| **Ouro** | 5.001 a 7.000 XP | `#fbbf24` |
| **Platina** | 7.001 a 8.000 XP | `#38bdf8` |
| **Ascendente** | 8.001 a 9.000 XP | `#a855f7` |
| **Imortal** | 9.001 a 10.000 XP | `#ef4444` |
| **Radiante** | Maior ou igual a 10.001 XP | `#f59e0b` |

---

## 💻 Tecnologias Utilizadas

- **HTML5**: Estruturação semântica do formulário e elementos de feedback.
- **CSS3**: Layouts com Flexbox/Grid, CSS Custom Properties (variáveis), animações de transição e sombras.
- **JavaScript ES6+**:
  - Orientação a Objetos e funções puras.
  - Métodos modernos de Array (`find`).
  - Manipulação assíncrona/dinâmica do DOM.
  - Formatador numérico nativo (`Intl.NumberFormat`).
- **Google Fonts**: Tipografias *Inter* (Interface) e *Rajdhani* (Títulos estilo gaming).

---

## 📁 Estrutura de Arquivos

```text
classificador-de-heroi/
├── index.html     # Estrutura HTML5 semântica e acessível
├── style.css      # Estilização visual, tema dark e responsividade
└── script.js      # Lógica de classificação, validações e controle de UI
```

## 🔧 Como Executar o Projeto
Não é necessária a instalação de dependências externas ou servidores complexos.

1. Clone este repositório:
```bash
git clone [https://github.com/seu-usuario/classificador-de-heroi.git](https://github.com/seu-usuario/classificador-de-heroi.git)
```

2. Acesse a pasta do projeto:
```bash
cd classificador-de-heroi
```

3. Abra o projeto:

Dê um duplo clique no arquivo `index.html` para abrir diretamente no seu navegador, OU

Execute com a extensão Live Server no Visual Studio Code (`Alt + L, Alt + O`).

## 🛠️ Destaques da Implementação
Separação de Responsabilidades (Clean Code)
A lógica que calcula a patente do herói é mantida estritamente isolada das funções de manipulação de tela, facilitando a reutilização e testes unitários:
```bash
// Exemplo de Função Pura de Negócio
function obterPatentePorXP(xp) {
    const patenteEncontrada = RANKS.find(rank => xp >= rank.minXP && xp <= rank.maxXP);
    return patenteEncontrada || RANKS[RANKS.length - 1];
}
```

## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para estudar, modificar e compartilhar.
