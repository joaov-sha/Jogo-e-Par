window.addEventListener("load", function () {
    inicializarJogo();
    score();
    nivel.addEventListener("change", function () {
        if (nivel.value == 0) {
            tempo.value = `${minutos}:${segundos}`;
        } else if (nivel.value == 1) {
            tempo.value = "01:45";
            intervalo = 1000;
        } else if (nivel.value == 2) {
            tempo.value = "01:15";
            intervalo = 650;
        } else if (nivel.value == 3) {
            tempo.value = "00:30";
            intervalo = 300;
        }
    });
    start.addEventListener("click", function () {
        if (nivel.value == 0) {
            alert("Para jogar, primeiro selecione um nível de dificuldade.");
        } else if (nivel.value == 1) {
            countdown(tempo);
            temporizador = setInterval(function () {
                generateNumber();
                if (minutos == 0 && segundos == 0) {
                    clearInterval(temporizador);
                } else {
                    if (segundos == 0) {
                        minutos--;
                        segundos = 59;
                    } else {
                        segundos--;
                    }
                }
                minutosF = minutos.toString().padStart(2, '0');
                segundosF = segundos.toString().padStart(2, '0');
                tempo.value = `${minutosF}:${segundosF}`;
                numero.classList.remove("certo");
                numero.classList.remove("errado");
            }, `${intervalo}`);
        } else if (nivel.value == 2) {
            countdown(tempo);
            temporizador = setInterval(function () {
                countdown(tempo);
                temporizador = setInterval(function () {
                    generateNumber();
                    if (minutos == 0 && segundos == 0) {
                        clearInterval(temporizador);
                    } else {
                        if (segundos == 0) {
                            minutos--;
                            segundos = 59;
                        } else {
                            segundos--;
                        }
                    }
                    minutosF = minutos.toString().padStart(2, '0');
                    segundosF = segundos.toString().padStart(2, '0');
                    tempo.value = `${minutosF}:${segundosF}`;
                    numero.classList.remove("certo");
                    numero.classList.remove("errado");
                }, `${intervalo}`);
            }, `${intervalo}`);
        } else if (nivel.value == 3) {
            countdown(tempo);
            temporizador = setInterval(function () {
                countdown(tempo);
                temporizador = setInterval(function () {
                    generateNumber();
                    if (minutos == 0 && segundos == 0) {
                        clearInterval(temporizador);
                    } else {
                        if (segundos == 0) {
                            minutos--;
                            segundos = 59;
                        } else {
                            segundos--;
                        }
                    }
                    minutosF = minutos.toString().padStart(2, '0');
                    segundosF = segundos.toString().padStart(2, '0');
                    numero.classList.remove("certo");
                    numero.classList.remove("errado");
                }, `${intervalo}`);
                tempo.value = `${minutosF}:${segundosF}`;
            }, `${intervalo}`);
        }
    });
    pause.addEventListener("click", function () {
        clearInterval(temporizador);
    });
    parar.addEventListener("click", function () {
        clearInterval(temporizador);
        nivel.value = 0;
        tempo.value = "00:00";
        acertos.value = 0;
        percent.innerHTML = "0%";
        erros.value = 0;
        sorteados.value = 0;
        intervalo = 0;
        numero.innerHTML = "_";
    });
});
function inicializarJogo() {
    numero = document.getElementById("numero");
    nivel = document.getElementById("nivel");
    tempo = document.getElementById("tempo");
    acertos = document.getElementById("acertos");
    percent = document.getElementById("percent");
    erros = document.getElementById("erros");
    sorteados = document.getElementById("sorteados");
    start = document.getElementById("start");
    pause = document.getElementById("pause");
    parar = document.getElementById("parar");
    tempo.value = "00:00";
    acertos.value = 0;
    percent.innerHTML = "0%";
    erros.value = 0;
    sorteados.value = 0;
    intervalo = 0;
    numero.innerHTML = "_";
}
function generateNumber() {
    number = parseInt(Math.random() * 100 + 1);
    if (number % 2 == 0) {
        sorteados.value++;
    }
    numero.innerHTML = number;
}
function countdown(tempo) {
    vetTempo = tempo.value.split(":");
    minutos = parseInt(vetTempo[0], 10);
    segundos = parseInt(vetTempo[1], 10);
}
function score() {
    numero.addEventListener("click", function () {
        generatedNumber = parseInt(numero.innerHTML, 10);
        if (generatedNumber % 2 == 0) {
            acertos.value++;
            percent.innerHTML = ((acertos.value / (acertos.value + erros.value)) * 100).toFixed(2) + "%";
            numero.classList.add("certo");
        } else {
            erros.value++;
            numero.classList.add("errado");
        }
    });
}