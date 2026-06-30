notaSercive.js 

let notas = [
    { id: 1, titulo: "Estudar backend", conteudo: "Aprender node js e Arquitetura" },
];


const listarTodas = () => notas;
const criar = (titulo, conteudo) => {
    const nova = { id: Date.now(), titulo, conteudo };
    notas.push(nova);
    return nova;
};
const atualizar = (id, titulo, conteudo) => {
    const index = notas.findIndex(n => n.id === parseInt(id));
    if (index !== -1) {
        notas[index] = { ...notas[index], titulo, conteudo };
        return notas[index];
    }
    return null;
};


const excluir = (id) => {
    notas = notas.filter(n => n.id !== parseInt(id));
};


module.exports = { listarTodas, criar, atualizar, excluir };