window.addEventListener("load",function(){
    user = document.getElementById("user");
    erroUsuario = document.getElementById("erroUsuario");
    pwd = document.getElementById("pwd");
    erroSenha = document.getElementById("erroSenha");
    confirmPwd = document.getElementById("confirmPwd");
    erroConfirmacao = document.getElementById("erroConfirmacao");
    cadastrar = document.getElementById("cadastrar");
    usuarios = [];
    cadastrar.addEventListener("click",function(){
        if(!user.value && !pwd.value && !confirmPwd.value){
            showGeneralError(user, pwd, confirmPwd, erroUsuario, erroSenha, erroConfirmacao);
            fieldErrorHide(user,err)
            fieldErrorHide(pwd,erroSenha);
            fieldErrorHide(confirmPwd,erroConfirmacao);
        }else if(!user.value){
            showEspecificError(user,erroUsuario);
        }else if(!pwd.value){
            showEspecificError(pwd,erroSenha);
        }else if(!confirmPwd.value){
            showEspecificError(confirmPwd,erroConfirmacao);
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

function showGeneralError(field1, field2, field3, fieldError1, fieldError2, fieldError3){
    field1.classList.add("errorAdjustment");
    field2.classList.add("errorAdjustment");
    field3.classList.add("errorAdjustment");
    fieldError1.classList.remove("invisibility");
    fieldError2.classList.remove("invisibility");
    fieldError3.classList.remove("invisibility");
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

function validarSenha(senha){
    regex = /^(?=.*[!@#$%^&*()-_=+`~,.<>?/|\\:;"'{[}\]])(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    regex.test(senha)
}