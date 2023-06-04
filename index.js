import fs from 'fs'

import chalk from 'chalk';

function handleError(e){
    throw new Error(chalk.red(e.code, 'file not found!'))
}

async function catchFile(caminhoDoArquivo){
    const encoding = 'utf-8';

    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        console.log(chalk.green(texto))
    } catch (error) {
        handleError(error)
    } finally {
        console.log(chalk.yellow('Uhull!!'))
    }
}

catchFile('./arquivos/texto.md')