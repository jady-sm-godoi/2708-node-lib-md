import fs from 'fs'

import chalk from 'chalk';

function handleError(e){
    throw new Error(chalk.red(e.code, 'file not found!'))
}

function catchFile(caminhoDoArquivo){
    const encoding = 'utf-8';
    fs.promises.readFile(caminhoDoArquivo, encoding)
        .then((text) => console.log(chalk.green(text)))
        .catch(handleError)
}

// function catchFile(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (error, text) => {
//         if(error){
//             handleError(error)
//         }
        
//         console.log(chalk.green(text))
//     })
// }

catchFile('./arquivos/texto.md')