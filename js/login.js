window.addEventListener("load", function () {
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    confirmPwd = document.getElementById("confirmPwd");
    entrar = document.getElementById("login");
    quantidade = 0;
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