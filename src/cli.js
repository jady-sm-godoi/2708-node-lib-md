import chalk from "chalk";
import fs from 'fs';
import catchFile from "./index.js";
import validList from "./http-validacao.js";

const way = process.argv;

async function showResult(valid, list, nameArq = ''){
    if(valid){
        console.log(
            chalk.yellow('lista de links: '), 
            chalk.black.bgGreen(nameArq), 
            await validList(list)
        )
    }else{
        console.log(
            chalk.yellow('lista de links: '), 
            chalk.black.bgGreen(nameArq), 
            list
        )
    }
}

async function textProcessor(args){
    const someWay = args[2]
    const valida = args[3] === 'valida'

    try {
        fs.lstatSync(someWay)
    } catch (error) {
        if(error.code === 'ENOENT'){
            console.log('arquivo ou diretório não existe')
            return;
        }
    }

    if(fs.lstatSync(someWay).isFile()){
        const file = await catchFile(someWay)
        showResult(valida, file)
    } else if(fs.lstatSync(someWay).isDirectory()){
        const files = await fs.promises.readdir(someWay)
        files.forEach(async(f) => {
            const result = await catchFile(`${someWay}/${f}`)
            showResult(valida, result, f)
        });
    }
    

}

textProcessor(way)