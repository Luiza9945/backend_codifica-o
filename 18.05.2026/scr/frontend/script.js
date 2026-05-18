const API_URL = '/api/notas';
const form = document.getElementById('notaForm');
const lista = document.getElementById('listaNotas');


async function carregarNotas() {
    const res = await fetch(API_URL);
    const notas = await res.json();
    lista.innerHTML = notas.map(n=> `
        <div class="nota>
        <h3>${n.titulo}</h3>
        <p>${n.conteudo}</p>
        <button onClick="editarNota(${n.id}, '${n.titulo}', '${n.conteudo}')">Modificar</button>
        <button class="btn-delete" onClick="deletarNota(${n.id})">Excluir</button>
        </div>
        `).join('');    
}


form.onsubmit = async (e) => {
    e.prevenDefault();
    const id = getElementById('titulo').value;
    const payload = {
        titulo : document.getElementById('titulo').value, 
        conteudo : document.getElementById('conteudo').value
    };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;
    await fetch(url, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)    
    });
    form.reset();
    document.getElementById('notaId').value = '';
    carregarNotas();
};


async function deletarNota(id){
    await fetch(`${API_URL}/${id}`, { method : 'DELETE' });
    carregarNotas();
}


function editarNota(id, titulo, conteudo){
    document.getElementById('notaId').value =id;
    document.getElementById('titulo').value =titulo;
    document.getElementById('conteudo').value =conteudo;
    window.scrollTo(0, 0);
}
carregarNotas();
