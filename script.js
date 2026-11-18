const form = document.getElementById('form-cadastro');
const btnLimpar = document.querySelector('.limpar');

const nome = document.getElementById('nome');
const nomeMaterno = document.getElementById('nome-materno');
const nascimento = document.getElementById('nascimento');
const cpf = document.getElementById('cpf');
const telefone = document.getElementById('telefone');
const celular = document.getElementById('celular');
const endereco = document.getElementById('endereco');
const login = document.getElementById('login');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmar-senha');

cpf.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = valor;
});

nascimento.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    e.target.value = valor.slice(0, 10);
});

telefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    e.target.value = valor.slice(0, 14);
});

celular.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = valor.slice(0, 15);
});

btnLimpar.addEventListener('click', () => {
    form.reset();
   
    document.querySelectorAll('.input-box input').forEach(input => {
        input.style.borderColor = 'rgba(255, 255, 255, 0.25)';
    });
    nome.focus();
});

const regexRegras = {
    nome: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/,
    nascimento: /^\d{2}\/\d{2}\/\d{4}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\)\s\d{4}-\d{4}$/,
    celular: /^\(\d{2}\)\s\d{5}-\d{4}$/,
    login: /^[A-Za-z]{6}$/,        
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/ 
};

function validarCampo(input, regex, mensagemErro) {
    if (!regex.test(input.value.trim())) {
        input.style.borderColor = '#ff4d4d';
        alert(mensagemErro);
        input.focus();
        return false;
    }
    input.style.borderColor = '#4dff88';
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    if (!validarCampo(nome, regexRegras.nome, 'Nome inválido! Digite apenas letras (mínimo 3 caracteres).')) return;
    if (!validarCampo(nomeMaterno, regexRegras.nome, 'Nome materno inválido! Digite apenas letras.')) return;
    if (!validarCampo(nascimento, regexRegras.nascimento, 'Data de nascimento inválida! Use o formato DD/MM/AAAA.')) return;
    if (!validarCampo(cpf, regexRegras.cpf, 'CPF inválido! Use o formato 000.000.000-00.')) return;
    if (!validarCampo(telefone, regexRegras.telefone, 'Telefone inválido! Use o formato (00) 0000-0000.')) return;
    if (!validarCampo(celular, regexRegras.celular, 'Celular inválido! Use o formato (00) 00000-0000.')) return;
    
    if (endereco.value.trim().length < 5) {
        endereco.style.borderColor = '#ff4d4d';
        alert('Preencha o endereço completo.');
        endereco.focus();
        return;
    } else {
        endereco.style.borderColor = '#4dff88';
    }

    if (!validarCampo(login, regexRegras.login, 'Login inválido! Deve conter exatamente 6 letras.')) return;
    if (!validarCampo(senha, regexRegras.senha, 'Senha inválida! Use no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.')) return;

    if (senha.value !== confirmarSenha.value) {
        confirmarSenha.style.borderColor = '#ff4d4d';
        alert('As senhas não coincidem!');
        confirmarSenha.focus();
        return;
    } else {
        confirmarSenha.style.borderColor = '#4dff88';
    }

    alert('Cadastro realizado com sucesso!');
    form.reset();
});