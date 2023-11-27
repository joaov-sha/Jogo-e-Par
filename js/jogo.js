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

    function inicializar() {
        dificuldade = document.getElementById("dificuldade");
        nivel = dificuldade.value;
        tempo = document.getElementById("tempo");
        iniciar = document.getElementById("iniciar");
        pausar = document.getElementById("pausar");
        parar = document.getElementById("parar");
        sair = document.getElementById("sair");
        numero = document.getElementById("numero");
        acertos = document.getElementById("acertos");
        percentAcertos = document.getElementById("percentAcertos");
        erros = document.getElementById("erros");
        pares = document.getElementById("pares");
        tempo.innerHTML = "00:00";
        acertos.innerHTML = "0000";
        percentAcertos.innerHTML = "00.00%";
        erros.innerHTML = "0000";
        pares.innerHTML = "0000";
        intervalo = 0;
        numero.innerHTML = "_";
    }

    function gerarNumero() {
        number = parseInt(Math.random() * 100 + 1);
        if (number % 2 == 0) {
            contagem();
            contagemPares = parseInt(pares.innerHTML);
            contagemPares++;
            pares.innerHTML = contagemPares;
        }
        numero.innerHTML = number;
    }

    function contagem() {
        vetTempo = tempo.innerHTML.split(":");
        minutos = parseInt(vetTempo[0], 10);
        segundos = parseInt(vetTempo[1], 10);
    }

    function marcar() {
        numero.addEventListener("click", function () {
            if (nivel !== 0 && !numero.classList.contains("certo") && !numero.classList.contains("errado")) {
                numeroGerado = parseInt(numero.innerHTML, 10);
                contagem();
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