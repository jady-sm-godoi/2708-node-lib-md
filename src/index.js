import fs from 'fs'

import chalk from 'chalk';


function linkExtractor(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^?\s#.].[^\s]*)\)/gm
    const matches = [...text.matchAll(regex)]
    const results = matches.map(result => 
        ({
            [result[1]] : result[2]
        })
    )
    return results.length !== 0 ? results : 'não há links no texto!'
}

function handleError(e){
    throw new Error(chalk.red(e.code, 'file not found!'))
}

async function catchFile(caminhoDoArquivo){
    const encoding = 'utf-8';

    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return linkExtractor(texto)
    } catch (error) {
        handleError(error)
    } finally {
        console.log(chalk.yellow('Uhull!!'))
    }
}

export default catchFile;


