// Documento ligado à criação de usuários e armazenamento destes no localstorage do navegador
window.addEventListener("load",function(){
    // user refere-se ao campo de nome de usuário no formulário de cadastro
    user = document.getElementById("user");
    // erroUsuario refere-se à mensagem exibida caso haja erro no preenchimento do campo user
    erroUsuario = document.getElementById("erroUsuario");
    // pwd refere-se ao campo de senha no formulário de cadastro
    pwd = document.getElementById("pwd");
    // erroSenha refere-se à mensagem exibida caso haja erro no preenchimento do campo senha
    erroSenha = document.getElementById("erroSenha");
    // confirmPwd refere-se ao campo de confirmação de senha no formulário de cadastro
    confirmPwd = document.getElementById("confirmPwd");
    // erroConfirmacao refere-se à mensagem exibida caso haja erro no preenchimento do campo de confirmação de senha
    erroConfirmacao = document.getElementById("erroConfirmacao");
    // cadastrar refere-se ao botão utilizado para confirmar o cadastro na aplicação
    cadastrar = document.getElementById("cadastrar");
    // Vetor usuários refere-se ao vetor inicialmente vazio onde serão salvos os cadastros realizados na tela de cadastro
    usuarios = [];
    // Adição de escutador de eventos ao botão cadastrar
    cadastrar.addEventListener("click",function(){
        // Evento que verifica o preenchimento dos campos e caso tenham sido informados corretamente redireciona à página de login
        if(!user.value && !pwd.value && !confirmPwd.value){
        // Bloco que adiciona a classe de ajuste visual para erros aos campos de usuário, senha e confirmação de senha (caso hajam erros no preenchimento)
        user.classList.add("errorAdjustment");
        pwd.classList.add("errorAdjustment");
        confirmPwd.classList.add("errorAdjustment");
        // Bloco que remove a classe de ajuste visual das mensagens de erro dos campos de usuário, senha e conformição de senha (caso hajam erros no preenchimento)
        erroUsuario.classList.remove("invisibility");
        erroSenha.classList.remove("invisibility");
        erroConfirmacao.classList.remove("invisibility");
        // Direciona o cursor de entrada do usuário para o campo usuário
        user.focus();
        // Bloco que faz com que caso seja entrado qualquer tipo de texto remove a classe de ajuste visual para os erros e oculta as mensagens de erro nos campos
        user.addEventListener("keypress",function(){
            user.classList.remove("errorAdjustment");
            erroUsuario.classList.add("invisibility");
        });
        pwd.addEventListener("keypress",function(){
            pwd.classList.remove("errorAdjustment");
            erroSenha.classList.add("invisibility");
        });
        confirmPwd.addEventListener("keypress",function(){
            confirmPwd.classList.remove("errorAdjustment");
            erroConfirmacao.classList.add("invisibility");
        });
        }else if(!user.value){
            user.classList.add("errorAdjustment");
            erroUsuario.classList.remove("invisibility");
            user.focus();
        }else if(!pwd.value){
            pwd.classList.add("errorAdjustment");
            erroSenha.classList.remove("invisibility");
            pwd.focus();
        }else if(!confirmPwd.value){
            confirmPwd.classList.add("errorAdjustment");
            erroConfirmacao.classList.remove("invisibility");
            confirmPwd.focus();
        }else if(user.value.split("").length > 1 && pwd.value.split("").length >= 6 && pwd.value == confirmPwd.value){
            // Bloco que valida as entradas do usuário no formulário de cadastro e salva o usuário cadastrado no localstorage
            usuario = {
                user:`${user.value}`,
                password:`${pwd.value}`
            }
            // Criação do objeto usuário a ser salvado no vetor de usuarios
            usuarios.push(usuario);
            // Adição do objeto usuário no vetor usuário
            localStorage.setItem("login",JSON.stringify(usuarios));
            // Adição do vetor usuários ao local storage com a chave login
            alertWifi("Cadastrado com sucesso!",false,0,"",30,"");
            // Biblioteca utilizada para a criação do painel de confirmação de cadastro.
            setTimeout(function(){
                window.location.href = 'login.html'
            },1000);
            // Função de redirecionamento à página de login
        }
    });
});