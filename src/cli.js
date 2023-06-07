import chalk from "chalk";
import fs from 'fs';
import catchFile from "./index.js";

const way = process.argv;

function showResult(list, nameArq = ''){
    console.log(
        chalk.yellow('lista de links: '), 
        chalk.black.bgGreen(nameArq), 
        list
    )
}

async function textProcessor(args){
    const someWay = args[2]

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
        showResult(file)
    } else if(fs.lstatSync(someWay).isDirectory()){
        const files = await fs.promises.readdir(someWay)
        files.forEach(async(f) => {
            const result = await catchFile(`${someWay}/${f}`)
            showResult(result, f)
        });
    }
    

}

textProcessor(way)