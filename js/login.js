window.addEventListener("load", function () {
    // Seleção dos campos usuário, senha e confirmação de senha
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    confirmPwd = document.getElementById("confirmPwd");
    // Seleção do botão de login
    entrar = document.getElementById("login");
    // Contagem de tentativas de login realizadas
    quantidade = 0;
    // Adição de escutador de eventos ao botão de login que verifica se existe o usuário salvo no localStorage do navegador e caso estejam corretamente preenchidos os campos redireciona o usuário à página do jogo após 1,5 segundo, ou, em caso de 3 tentativas falhas de login, o usuário é redirecionado à página de fale conosco, esta que não foi implementada.
    entrar.addEventListener("click", function () {
        var usuarios = JSON.parse(localStorage.getItem("login"));
        console.log(usuarios);
        if (user.value == "") {
            document.getElementById("erroUser").innerHTML = "Nome de usuário inválido, favor insira um nome válido.";
        }else{
            for(i = 0; i < usuarios.length; i++){
                if(user.value == usuarios[i].user && pwd.value == usuarios[i].password){
                    setTimeout(function(){
                        window.location.href="../jogo.html";
                    },1500);
                }else{
                    quantidade++;
                    console.log(quantidade);
                    if(quantidade >= 3){
                        setTimeout(function(){
                            window.location.href="../faleConosco.html";
                        },1500);
                    }
                }
            }
        }
    });
});