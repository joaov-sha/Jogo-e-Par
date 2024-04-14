// Arquivo responsável por dar funcionalidades ao jogo
// Criação das variáveis do jogo
// Criação do elemento de áudio utilizado para ter como trilha sonora no jogo
// Escutador de eventos responsável por modificar os valores de tempo disponível e tempo de cronometragem.
// Escutador de eventos responsável por iniciar o cronômetro e também as funções de marcação de erros e acertos e a trilha sonora.
// Escutador de eventos responsável por pausar o cronômetro, podendo este ser retomado clicando em iniciar novamente.
// Escutador de eventos responsável por realizar a interrupção do cronômetro, sua zeragem e também a zeragem dos contadores disponíveis para o usuário.
// Escutador de eventos responsável por redirecionar o usuário à tela login caso ele clique sobre o botão sair
window.addEventListener("load", function () {
    let nivel, tempo, intervalo, numero, acertos, percentAcertos, erros, pares, minutos, segundos, temporizador;

    const audio = document.getElementById("audio");
    inicializar();
    marcar();

    dificuldade.addEventListener("change", function () {
        if (nivel !== 0) {
            nivel = dificuldade.value;
            if (nivel == 0) {
                tempo.innerHTML = "00:00";
            } else if (nivel == 1) {
                tempo.innerHTML = "01:45";
                intervalo = 1000;
            } else if (nivel == 2) {
                tempo.innerHTML = "01:15";
                intervalo = 650;
            } else if (nivel == 3) {
                tempo.innerHTML = "00:30";
                intervalo = 300;
            }
        } else {
            tempo.innerHTML = "00:00";
        }
    });

    iniciar.addEventListener("click", function () {
        if (nivel == 0) {
            alert("Para jogar, primeiro selecione um nível de dificuldade.");
            numero.disabled = true;
        } else if (nivel == 1 || nivel == 2 || nivel == 3) {
            audio.play();
            contagem();
            temporizador = setInterval(function () {
                gerarNumero();
                if (minutos == 0 && segundos == 0) {
                    clearInterval(temporizador);
                    numero.disabled = true;
                    audio.pause();
                } else {
                    numero.disabled = false;
                    if (segundos == 0) {
                        minutos--;
                        segundos = 59;
                    } else {
                        segundos--;
                    }
                }
                let minutosF = minutos.toString().padStart(2, '0');
                let segundosF = segundos.toString().padStart(2, '0');
                tempo.innerHTML = `${minutosF}:${segundosF}`;
                numero.classList.remove("certo");
                numero.classList.remove("errado");
            }, intervalo);
        }
    });

    pausar.addEventListener("click", function () {
        clearInterval(temporizador);
    });

    parar.addEventListener("click", function () {
        clearInterval(temporizador);
        nivel = 0;
        tempo.innerHTML = "00:00";
        acertos.innerHTML = "0000";
        percentAcertos.innerHTML = "00.00%";
        erros.innerHTML = "0000";
        pares.innerHTML = "0000";
        intervalo = 0;
        numero.innerHTML = "_";
        audio.pause();
        audio.currentTime = 0;
    });

    sair.addEventListener("click",function(){
        setTimeout(function(){
            alert("Você será redirecionado à página de login, obrigado por jogar.");
            window.location.href="login.html";
        },3000);
    });

    // Função responsável por inicializar os valores contidos no jogo
    function inicializar() {
        // Instânciação do seletor de dificuldade
        dificuldade = document.getElementById("dificuldade");
        // Aquisição do nível de dificuldade selecionado (inicialmente em 0);
        nivel = dificuldade.value;
        // Instânciação do temporizador
        tempo = document.getElementById("tempo");
        // Instânciação do botão de início do contador
        iniciar = document.getElementById("iniciar");
        // Instânciação do botão de pausa do contador
        pausar = document.getElementById("pausar");
        // Instânciação do botão de parar do contador
        parar = document.getElementById("parar");
        // Instânciação do botão de logout do jogo
        sair = document.getElementById("sair");
        // Instânciação do botão de ação do jogo
        numero = document.getElementById("numero");
        // Instânciação do contador de acertos do jogo
        acertos = document.getElementById("acertos");
        // Instânciação do número percentual de acertos
        percentAcertos = document.getElementById("percentAcertos");
        // Instânciação do número de erros cometidos
        erros = document.getElementById("erros");
        // Instânciação do número de números pares gerados
        pares = document.getElementById("pares");
        // Zeragem inicial do tempo
        tempo.innerHTML = "00:00";
        // Zeragem inicial do número de acertos
        acertos.innerHTML = "0000";
        // Zeragem inicial do número percentual de acertos
        percentAcertos.innerHTML = "00.00%";
        // Zeragem inicial do número de erros
        erros.innerHTML = "0000";
        // Zeragem inicial do número de pares gerados
        pares.innerHTML = "0000";
        // Definição inicial do intervalo de tempo para execução de ações do cronômetro (setInterval)
        intervalo = 0;
        // Definição para o conteúdo inicial do botão de ação ser o caractere _ (underscore)
        numero.innerHTML = "_";
    }

    // Função responsável por gerar os números a serem clicados
    function gerarNumero() {
        number = parseInt(Math.random() * 100 + 1);
        if (number % 2 == 0) {
            contagemPares = parseInt(pares.innerHTML);
            contagemPares++;
            pares.innerHTML = contagemPares;
        }
        numero.innerHTML = number;
    }

    // Função responsável pela alteração do cronômetro
    function contagem() {
        vetTempo = tempo.innerHTML.split(":");
        minutos = parseInt(vetTempo[0], 10);
        segundos = parseInt(vetTempo[1], 10);
    }

    // Função responsável pela marcação dos pontos feitos pelo usuário, ao clicar sobre um número gerador que seja par, computa um acerto, ao clicar sobre um que seja impar computa um erro, e então calcula o percentual de acertos realizados pelo usuário
    function marcar() {
        numero.addEventListener("click", function () {
            if (nivel !== 0 && !numero.classList.contains("certo") && !numero.classList.contains("errado")) {
                numeroGerado = parseInt(numero.innerHTML, 10);
                // contagem();
                if (numeroGerado % 2 == 0) {
                    acertos.innerHTML++;
                    percentAcertos.innerHTML = ((acertos.innerHTML / (acertos.innerHTML + erros.innerHTML)) * 100).toFixed(2) + "%";
                    numero.classList.add("certo");
                } else {
                    erros.innerHTML++;
                    numero.classList.add("errado");
                }
                numero.disabled = true;
            }
        });
    }
});