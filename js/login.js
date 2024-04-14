window.addEventListener("load", function () {
    user = document.getElementById("user");
    erroUser = document.getElementById("erroUser");
    pwd = document.getElementById("pwd");
    confirmPwd = document.getElementById("confirmPwd");
    entrar = document.getElementById("login");
    quantidade = 0;
    entrar.addEventListener("click", function () {
        var usuarios = JSON.parse(localStorage.getItem("login"));
        if (user.value == "" && pwd.value == "") {
            showGeneralError(user,pwd,erroUsuario,erroSenha);
            fieldErrorHide(user,erroUsuario);
            fieldErrorHide(pwd,erroSenha);
        }else if(user.value == ""){
            showEspecificError(user,erroUsuario);
        }else if(pwd.value == ""){
            showEspecificError(pwd,erroSenha);
        }else{
            for(i = 0; i < usuarios.length; i++){
                if(user.value == usuarios[i].user && pwd.value == usuarios[i].password){
                    setTimeout(function(){
                        window.location.href="../jogo.html";
                    },1500);
                }else{
                    quantidade++;
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

function showGeneralError(field1, field2, fieldError1, fieldError2){
    field1.classList.add("errorAdjustment");
    field2.classList.add("errorAdjustment");
    fieldError1.classList.remove("invisibility");
    fieldError2.classList.remove("invisibility");
    field1.focus();
}

function hideEspecificError(field, fieldError){
    field.classList.remove("errorAdjustment");
    fieldError.classList.add("invisibility");
}

function showEspecificError(field, fieldError){
    field.classList.add("errorAdjustment");
    fieldError.classList.remove("invisibility");
    field.focus();
}

function fieldErrorHide(field,fieldError){
    field.addEventListener("keypress",function(){
        hideEspecificError(field,fieldError);
    });
}