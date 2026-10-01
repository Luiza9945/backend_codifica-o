document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalLogin');
    const form = document.getElementById('formLogin');
    const btnAbrir = document.getElementById('btnAbrirLogin');
    const btnFechar = modal ? modal.querySelector('.btn-close') : null;

    const emailInput = document.getElementById('emailLogin');
    const senhaInput = document.getElementById('senhaLogin');

    const API_URL = 'http://localhost:3013';

    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const estaLogado = !!usuarioLogado;

    const btnCriarConta = document.getElementById('btnCriarConta');

    if (btnCriarConta) {
        btnCriarConta.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cadastro.html';
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailDigitado = emailInput.value.trim();
            const senhaDigitada = senhaInput.value.trim();

            if (!emailDigitado) {
                alert('Por favor, preencha o e-mail.');
                emailInput.focus();
                return;
            }

            if (!senhaDigitada) {
                alert('Por favor, preencha a senha.');
                senhaInput.focus();
                return;
            }

            try {
                const resposta = await fetch(`${API_URL}/usuarios/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: emailDigitado,
                        senha: senhaDigitada
                    })
                });

                const dados = await resposta.json().catch(() => ({}));

                if (resposta.ok) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(dados));

                    alert('Login bem-sucedido!');

                    const instanciaModal = bootstrap.Modal.getInstance(modal);

                    if (instanciaModal) {
                        instanciaModal.hide();
                    }

                    window.location.href = 'index.html';
                } else {
                    alert(dados.erro || dados.message || 'Usuário ou senha incorretos.');
                }

            } catch (error) {
                console.error('Erro ao conectar com a API:', error);
                alert('Não foi possível conectar ao servidor de login.');
            }
        });
    }

    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            if (form) {
                form.reset();
            }
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            if (form) {
                form.reset();
            }
        });
    }

    const botoesWallpaper = document.querySelectorAll('[id^="btnWallpaper"]');

    botoesWallpaper.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();

            if (!estaLogado) {
                alert('Você precisa estar logado para acessar um wallpaper.');

                if (modal) {
                    const instanciaModal = bootstrap.Modal.getOrCreateInstance(modal);
                    instanciaModal.show();
                }

                return;
            }

            const idBotao = botao.id;
            const numeroWallpaper = idBotao.replace('btnWallpaper', '');

            window.location.href = `wallpaper.html?id=${numeroWallpaper}`;
        });
    });

    const campoPesquisa = document.getElementById('campoPesquisa');
    const btnPesquisar = document.getElementById('btnPesquisar');

    if (btnPesquisar) {
        btnPesquisar.addEventListener('click', pesquisarWallpapers);
    }

    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', pesquisarWallpapers);
    }

    carregarWallpapers();
});

function pesquisarWallpapers() {
    const campoPesquisa = document.getElementById('campoPesquisa');

    if (!campoPesquisa) {
        return;
    }

    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    for (let i = 1; i <= 6; i++) {
        const card = document.getElementById(`wallpaper${i}`);
        const usuario = document.getElementById(`usuario${i}`);
        const titulo = document.getElementById(`tituloWallpaper${i}`);
        const descricao = document.getElementById(`descricaoWallpaper${i}`);

        if (!card) {
            continue;
        }

        const nomeUsuario = usuario
            ? usuario.textContent.toLowerCase()
            : '';

        const nomeTitulo = titulo
            ? titulo.textContent.toLowerCase()
            : '';

        const textoDescricao = descricao
            ? descricao.textContent.toLowerCase()
            : '';

        const encontrou =
            nomeUsuario.includes(pesquisa) ||
            nomeTitulo.includes(pesquisa) ||
            textoDescricao.includes(pesquisa);

        card.style.display = encontrou ? '' : 'none';
    }
}

async function carregarWallpapers() {
    const API_URL = 'http://localhost:3013';

    try {
        const resposta = await fetch(`${API_URL}/wallpapers`);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar wallpapers.');
        }

        const wallpapers = await resposta.json();

        wallpapers.forEach((wallpaper, index) => {
            const numero = index + 1;

            const imagem = document.getElementById(`imagemWallpaper${numero}`);
            const usuario = document.getElementById(`usuario${numero}`);
            const descricao = document.getElementById(`descricaoWallpaper${numero}`);

            if (imagem) {
                imagem.src = wallpaper.wallpaper;
            }

            if (usuario) {
                usuario.textContent = wallpaper.criador;
            }

            if (descricao) {
                descricao.textContent = wallpaper.descricao;
            }
        });

    } catch (error) {
        console.error('Erro ao carregar wallpapers:', error);
    }
}