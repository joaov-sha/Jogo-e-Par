window.addEventListener("load",function(){
    user = document.getElementById("user");
    erroUsuario = document.getElementById("erroUsuario");
    pwd = document.getElementById("pwd");
    erroSenha = document.getElementById("erroSenha");
    confirmPwd = document.getElementById("confirmPwd");
    erroConfirmacao = document.getElementById("erroConfirmacao");
    cadastrar = document.getElementById("cadastrar");
    entrar = document.getElementById("login");
    usuarios = [];
    cadastrar.addEventListener("click",function(){
        if(!user.value && !pwd.value && !confirmPwd.value){
        user.classList.remove("errorAdjustment");
        pwd.classList.remove("errorAdjustment");
        confirmPwd.classList.remove("errorAdjustment");
        erroUsuario.classList.remove("invisibility");
        erroSenha.classList.remove("invisibility");
        erroConfirmacao.classList.remove("invisibility");
        user.focus();
        user.addEventListener("keypress",function(){
            user.classList.add("errorAdjustment");
            erroUsuario.classList.add("invisibility");
        });
        pwd.addEventListener("keypress",function(){
            pwd.classList.add("errorAdjustment");
            erroSenha.classList.add("invisibility");
        });
        confirmPwd.addEventListener("keypress",function(){
            confirmPwd.classList.add("errorAdjustment");
            erroConfirmacao.classList.add("invisibility");
        });
        }else if(!user.value){
            user.classList.remove("errorAdjustment");
            erroUsuario.classList.remove("invisibility");
            user.focus();
        }else if(!pwd.value){
            pwd.classList.remove("errorAdjustment");
            erroSenha.classList.remove("invisibility");
            pwd.focus();
        }else if(!confirmPwd.value){
            confirmPwd.classList.remove("errorAdjustment");
            erroConfirmacao.classList.remove("invisibility");
            confirmPwd.focus();
        }else if(user.value.split("").length > 1 && pwd.value.split("").length >= 6 && pwd.value == confirmPwd.value){
            usuario = {
                user:`${user.value}`,
                password:`${pwd.value}`
            }
            usuarios.push(usuario);
            localStorage.setItem("login",JSON.stringify(usuarios));
            alertWifi("Cadastrado com sucesso!",false,0,"",30,"");
            setTimeout(function(){
                window.location.href = 'login.html'
            },1000);
        }
    });
});