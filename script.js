// Banco de dados das perguntas do 6º Ano (Ciências - Sistemas do Corpo Humano)
const perguntas = [
    {
        pergunta: "Qual é a principal função do Sistema Respiratório?",
        alternativas: [
            "Transportar o sangue por todo o corpo",
            "Absorver oxigênio do ar e eliminar gás carbônico",
            "Digerir os alimentos que comemos",
            "Controlar nossos movimentos e pensamentos"
        ],
        correta: 1 // Índice da resposta correta
    },
    {
        pergunta: "Qual órgão do Sistema Digestório é responsável por absorver a maior parte dos nutrientes?",
        alternativas: [
            "Estômago",
            "Boca",
            "Intestino Delgado",
            "Esôfago"
        ],
        correta: 2
    },
    {
        pergunta: "O coração pertence a qual sistema do corpo humano?",
        alternativas: [
            "Sistema Cardiovascular (ou Circulatório)",
            "Sistema Nervoso",
            "Sistema Esquelético",
            "Sistema Respiratório"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a função do Sistema Esquelético?",
        alternativas: [
            "Bombear sangue para os músculos",
            "Transformar o oxigênio em energia",
            "Sustentar o corpo e proteger órgãos importantes",
            "Filtrar as impurezas da água do nosso corpo"
        ],
        correta: 3
    },
    {
        pergunta: "Qual órgão é considerado o 'centro de controle' do Sistema Nervoso?",
        alternativas: [
            "O Coração",
            "O Cérebro",
            "O Pulmão",
            "Os Rins"
        ],
        correta: 1
    }
];

// Variáveis de Controle de Estado do Jogo
let perguntaAtualIndex = 0;
let pontuacao = 0;

// Elementos do DOM mapeados
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const textoPergunta = document.getElementById("texto-pergunta");
const containerAlternativas = document.getElementById("container-alternativas");
const contadorPerguntas = document.getElementById("contador-perguntas");
const placarPontos = document.getElementById("placar-pontos");
const barraPreenchimento = document.getElementById("barra-preenchimento");

const feedbackContainer = document.getElementById("feedback");
const textoFeedback = document.getElementById("texto-feedback");
const totalPontosSpan = document.getElementById("total-pontos");

// Eventos de Clique Principais
btnIniciar.addEventListener("click", iniciarJogo);
btnProxima.addEventListener("click", irParaProximaPergunta);
btnReiniciar.addEventListener("click", reiniciarJogo);

// Função para iniciar o jogo
function iniciarJogo() {
    telaInicial.classList.add("escondido");
    telaJogo.classList.remove("escondido");
    perguntaAtualIndex = 0;
    pontuacao = 0;
    atualizarPlacar();
    carregarPergunta();
}

// Função para renderizar a pergunta na tela
function carregarPergunta() {
    configurarLayoutProximaPergunta();
    
    const dadosPergunta = perguntas[perguntaAtualIndex];
    textoPergunta.innerText = dadosPergunta.pergunta;
    
    // Atualiza cabeçalhos e barra de progresso do Quiz
    contadorPerguntas.innerText = `Pergunta: ${perguntaAtualIndex + 1}/${perguntas.length}`;
    const porcentagemProgresso = ((perguntaAtualIndex + 1) / perguntas.length) * 100;
    barraPreenchimento.style.width = `${porcentagemProgresso}%`;

    // Limpa alternativas anteriores e adiciona as novas
    containerAlternativas.innerHTML = "";
    dadosPergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.innerText = alternativa;
        botao.classList.add("btn-alternativa");
        botao.addEventListener("click", () => verificarResposta(index, botao));
        containerAlternativas.appendChild(botao);
    });
}

// Lógica de verificação de acerto ou erro
function verificarResposta(indiceSelecionado, botaoClicado) {
    const dadosPergunta = perguntas[perguntaAtualIndex];
    const botoes = containerAlternativas.querySelectorAll(".btn-alternativa");

    // Desabilita todos os botões para impedir cliques múltiplos
    botoes.forEach(btn => btn.disabled = true);

    if (indiceSelecionado === dadosPergunta.correta) {
        botaoClicado.classList.add("correta");
        pontuacao += 20; // 20 pontos por pergunta (totalizando 100)
        atualizarPlacar();
        mostrarFeedback(true, "Parabéns! Você acertou! 🌟");
    } else {
        botaoClicado.classList.add("incorreta");
        // Destaca também qual era a resposta correta para aprendizado
        botoes[dadosPergunta.correta].classList.add("correta");
        mostrarFeedback(false, "Quase lá! Continue estudando! 🧠");
    }
}

// Exibe o contêiner de feedback após a resposta
function mostrarFeedback(isCorreto, mensagem) {
    feedbackContainer.classList.remove("escondido");
    textoFeedback.innerText = mensagem;
    
    if (isCorreto) {
        feedbackContainer.className = "correta-bg";
    } else {
        feedbackContainer.className = "incorreta-bg";
    }
}

// Reseta o contêiner de feedback para a próxima rodada
function configurarLayoutProximaPergunta() {
    feedbackContainer.classList.add("escondido");
    feedbackContainer.className = "";
}

function atualizarPlacar() {
    placarPontos.innerText = `Pontos: ${pontuacao}`;
}

// Controle de fluxo de perguntas
function irParaProximaPergunta() {
    perguntaAtualIndex++;
    if (perguntaAtualIndex < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo();
    }
}

// Transição para a tela de pontuação final
function finalizarJogo() {
    telaJogo.classList.add("escondido");
    telaFinal.classList.remove("escondido");
    totalPontosSpan.innerText = pontuacao;
}

function reiniciarJogo() {
    telaFinal.classList.add("escondido");
    iniciarJogo();
}