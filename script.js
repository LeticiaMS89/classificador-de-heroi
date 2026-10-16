/**
 * Classificador de Nível de Herói
 * Arquitetura baseada em Modulos ES6/Clean Code.
 */

"use strict";

/* ==========================================================================
   1. CONFIGURAÇÃO DAS PATENTES / RANKS (REGRAS DE NEGÓCIO)
   ========================================================================== */
const RANKS = [
    { name: "Ferro",      minXP: 0,     maxXP: 1000,    color: "var(--rank-ferro)" },
    { name: "Bronze",     minXP: 1001,  maxXP: 2000,    color: "var(--rank-bronze)" },
    { name: "Prata",      minXP: 2001,  maxXP: 5000,    color: "var(--rank-prata)" },
    { name: "Ouro",       minXP: 5001,  maxXP: 7000,    color: "var(--rank-ouro)" },
    { name: "Platina",    minXP: 7001,  maxXP: 8000,    color: "var(--rank-platina)" },
    { name: "Ascendente", minXP: 8001,  maxXP: 9000,    color: "var(--rank-ascendente)" },
    { name: "Imortal",    minXP: 9001,  maxXP: 10000,   color: "var(--rank-imortal)" },
    { name: "Radiante",   minXP: 10001, maxXP: Infinity, color: "var(--rank-radiante)" }
];

/* ==========================================================================
   2. LÓGICA PURA DE CLASSIFICAÇÃO
   ========================================================================== */

/**
 * Retorna o objeto completo da patente correspondente ao XP informado.
 * @param {number} xp - Quantidade de pontos de experiência do herói.
 * @returns {Object} Dados da patente (nome, minXP, maxXP, cor).
 */
function obterPatentePorXP(xp) {
    const patenteEncontrada = RANKS.find(rank => xp >= rank.minXP && xp <= rank.maxXP);
    // Caso caia em um valor fora do esperado, retorna a última patente por segurança
    return patenteEncontrada || RANKS[RANKS.length - 1];
}

/**
 * Calcula a porcentagem de progresso em direção à próxima patente.
 * @param {number} xp - XP atual do herói.
 * @param {Object} rankAtual - Objeto da patente atual.
 * @returns {number} Porcentagem entre 0 e 100.
 */
function calcularProgressoProximoElo(xp, rankAtual) {
    if (rankAtual.maxXP === Infinity) return 100; // Rank máximo já atingido

    const xpNoNivelAtual = xp - rankAtual.minXP;
    const xpNecessarioNoNivel = rankAtual.maxXP - rankAtual.minXP;
    const porcentagem = (xpNoNivelAtual / xpNecessarioNoNivel) * 100;

    return Math.min(Math.max(Math.round(porcentagem), 0), 100);
}

/* ==========================================================================
   3. MANIPULAÇÃO DA INTERFACE (DOM CONTROLLER)
   ========================================================================== */
class HeroAppUI {
    constructor() {
        // Elementos do Formulário
        this.form = document.getElementById("heroForm");
        this.inputName = document.getElementById("heroName");
        this.inputXP = document.getElementById("heroXP");
        this.btnReset = document.getElementById("btnReset");

        // Elementos de Erro
        this.nameError = document.getElementById("nameError");
        this.xpError = document.getElementById("xpError");

        // Elementos do Card de Resultado
        this.resultCard = document.getElementById("resultCard");
        this.rankBadge = document.getElementById("rankBadge");
        this.resultHeroName = document.getElementById("resultHeroName");
        this.resultHeroXP = document.getElementById("resultHeroXP");
        this.resultMessage = document.getElementById("resultMessage");
        this.progressBar = document.getElementById("progressBar");
        this.progressText = document.getElementById("progressText");

        this.initEvents();
    }

    /**
     * Vincula os escutadores de eventos aos elementos da página.
     */
    initEvents() {
        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        this.btnReset.addEventListener("click", () => this.resetForm());

        // Limpa mensagens de erro conforme o usuário digita
        this.inputName.addEventListener("input", () => this.clearError(this.nameError));
        this.inputXP.addEventListener("input", () => this.clearError(this.xpError));
    }

    /**
     * Trata o envio do formulário, realizando a validação e exibindo o veredito.
     * @param {Event} event 
     */
    handleSubmit(event) {
        event.preventDefault();

        const nome = this.inputName.value.trim();
        const xp = parseInt(this.inputXP.value, 10);

        if (!this.validarFormulario(nome, xp)) {
            return;
        }

        // Executa a regra de classificação
        const patente = obterPatentePorXP(xp);
        const progresso = calcularProgressoProximoElo(xp, patente);

        // Atualiza e exibe os resultados na UI
        this.renderizarResultado(nome, xp, patente, progresso);
    }

    /**
     * Valida os campos de entrada do usuário.
     * @param {string} nome 
     * @param {number} xp 
     * @returns {boolean}
     */
    validarFormulario(nome, xp) {
        let isValid = true;

        if (!nome) {
            this.showError(this.nameError, "Por favor, informe o nome do herói.");
            isValid = false;
        }

        if (isNaN(xp) || xp < 0) {
            this.showError(this.xpError, "Insira um valor de XP válido (maior ou igual a 0).");
            isValid = false;
        }

        return isValid;
    }

    showError(element, message) {
        element.textContent = message;
    }

    clearError(element) {
        element.textContent = "";
    }

    /**
     * Renderiza o resultado formatado no card principal.
     */
    renderizarResultado(nome, xp, patente, progresso) {
        this.resultHeroName.textContent = nome;
        this.resultHeroXP.textContent = xp.toLocaleString("pt-BR");
        
        // Atualiza a badge da patente
        this.rankBadge.textContent = patente.name;
        this.rankBadge.style.backgroundColor = patente.color;
        this.rankBadge.style.color = (patente.name === "Prata" || patente.name === "Ferro") ? "#0f172a" : "#ffffff";

        // Mensagem oficial exigida no desafio da lógica
        this.resultMessage.innerHTML = `O Herói de nome <strong>${nome}</strong> está no nível de <strong style="color: ${patente.color}">${patente.name}</strong>.`;

        // Barra de progresso
        this.progressBar.style.width = `${progresso}%`;
        this.progressBar.style.backgroundColor = patente.color;
        this.progressText.textContent = `${progresso}%`;

        // Exibe o card caso esteja oculto
        this.resultCard.classList.remove("hidden");
    }

    /**
     * Reseta o formulário e oculta o card de resultado.
     */
    resetForm() {
        this.form.reset();
        this.clearError(this.nameError);
        this.clearError(this.xpError);
        this.resultCard.classList.add("hidden");
    }
}

/* ==========================================================================
   4. INICIALIZAÇÃO DA APLICAÇÃO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    new HeroAppUI();
});
