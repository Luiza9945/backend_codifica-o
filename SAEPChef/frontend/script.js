document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-login-overlay');
    const form = document.getElementById('form-login');
    const btnAbrir = document.getElementById('btn_login');
    const btnFechar = document.getElementById('btn-fechar-modal');
    const btnCancelar = document.getElementById('btn-cancelar-modal');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('login-email').value.trim();
        const senha = document.getElementById('login-senha').value.trim();
        const email = "sla";
        const senhaf = "123";
         

        if (!usuario || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const usuarioEncontrado = (usuario === email & senha === senhaf)

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            alert('Login bem-sucedido!');
            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
}



    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            form.reset(); 
            modal.classList.add('ativo');
        });
    }

    const fecharModal = () => {
        modal.classList.remove('ativo');
    };

    btnFechar.addEventListener('click', fecharModal);
    btnCancelar.addEventListener('click', fecharModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
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
