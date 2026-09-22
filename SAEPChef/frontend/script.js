document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-login-overlay');
    const form = document.getElementById('form-login');
    const btnAbrir = document.getElementById('btn_login');
    const btnFechar = document.getElementById('btn-fechar-modal');
    const btnCancelar = document.getElementById('btn-cancelar-modal');

    const erroGeral = document.getElementById('erro-geral');
    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');

    const API_URL = 'http://localhost:3000';


    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const estaLogado = !!usuarioLogado; 

    const btnVerPerfil = document.getElementById('btn_verperfil'); 
    if (btnVerPerfil) {
        btnVerPerfil.addEventListener('click', (e) => {
            if (!estaLogado) {
                e.preventDefault(); 
                alert('Você precisa estar logado para acessar o seu perfil!');
                if (modal) modal.classList.add('ativo'); 
            } else {
                window.location.href = 'perfil.html'; 
            }
        });
    }

 
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (erroGeral) erroGeral.textContent = '';
            if (erroEmail) erroEmail.textContent = '';
            if (erroSenha) erroSenha.textContent = '';

            const emailDigitado = document.getElementById('login-email').value.trim();
            const senhaDigitada = document.getElementById('login-senha').value.trim();

            let temErro = false;

            if (!emailDigitado) {
                if (erroEmail) erroEmail.textContent = 'Por favor, preencha o e-mail.';
                temErro = true;
            }
            if (!senhaDigitada) {
                if (erroSenha) erroSenha.textContent = 'Por favor, preencha a senha.';
                temErro = true;
            }

            if (temErro) return;

            try {
                const resposta = await fetch(`${API_URL}/usuarios/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailDigitado, senha: senhaDigitada })
                });

                const dados = await resposta.json().catch(() => ({}));

                if (resposta.ok) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(dados));
                    alert('Login bem-sucedido!');
                    window.location.href = 'index.html';
                } else {
                    if (erroGeral) erroGeral.textContent = dados.erro || 'Usuário ou senha incorretos.';
                }

            } catch (error) {
                console.error('Erro ao conectar com a API:', error);
                if (erroGeral) erroGeral.textContent = 'Não foi possível conectar ao servidor de login.';
            }
        });
    }


    const fecharModal = () => {
        if (modal) modal.classList.remove('ativo');
        if (erroGeral) erroGeral.textContent = '';
        if (erroEmail) erroEmail.textContent = '';
        if (erroSenha) erroSenha.textContent = '';
    };

    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            if (form) form.reset();
            fecharModal();
            if (modal) modal.classList.add('ativo');
        });
    }

    if (btnFechar) btnFechar.addEventListener('click', fecharModal);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });
    }


    const estrelas = document.querySelectorAll('.c .curt');

    estrelas.forEach(estrela => {
        estrela.style.cursor = 'pointer';

        estrela.addEventListener('click', (e) => {
            if (!estaLogado) {
                alert('Você precisa estar logado para favoritar uma receita!');
                if (modal) modal.classList.add('ativo'); 
                return; 
            }

            const containerC = e.target.closest('.c');
            const pQuantidade = containerC.querySelector('.qnt p');
            let quantidadeAtual = parseInt(pQuantidade.textContent, 10);

            if (quantidadeAtual > 0) {
                pQuantidade.textContent = '0';
                estrela.style.opacity = '0.5';
            } else {
                pQuantidade.textContent = '1';
                estrela.style.opacity = '1';
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const estrelas = document.querySelectorAll('.c .curt');

    estrelas.forEach(estrela => {
        estrela.style.cursor = 'pointer';

        estrela.addEventListener('click', (e) => {
            const containerC = e.target.closest('.c');
            
            const pQuantidade = containerC.querySelector('.qnt p');
            
            let quantidadeAtual = parseInt(pQuantidade.textContent, 10);

            if (quantidadeAtual > 0) {
                pQuantidade.textContent = '0';
                estrela.style.opacity = '0.5'; 
            } else {
                pQuantidade.textContent = '1';
                estrela.style.opacity = '1';
            }
        });
    });
});
