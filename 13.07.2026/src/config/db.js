import fs  from "fs/promises"
import path from "path"
import {fileURLToPath} from "url"

const nomeAtual = fileURLToPath(import.meta.url)
const arquivoAtual = path.dirname(nomeAtual)
const caminhoArquivo = path.join(arquivoAtual,"motoristas.json")

async function lerDados() {

    const conteudoArquivo = await fs.readFile(caminhoArquivo, "utf-8")

    return json.parse(conteudoArquivo)
}

async function salvarDados(dados) {

   await fs.writeFile(caminhoArquivo , JSON.stringify(dados , null , 2) ,"utf-8")
}

export {lerDados , salvarDados}