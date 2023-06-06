import chalk from "chalk";
import fs from 'fs';
import catchFile from "./index.js";

const way = process.argv;

function showResult(list){
    console.log(chalk.yellow('lista de links: '), list)
}

async function textProcessor(args){
    const someWay = args[2]

    if(fs.lstatSync(someWay).isFile()){
        const file = await catchFile(someWay)
        showResult(file)
    } else if(fs.lstatSync(someWay).isDirectory()){
        const files = await fs.promises.readdir(someWay)
        files.forEach(async(f) => {
            const result = await catchFile(`${someWay}/${f}`)
            showResult(result)
        });
    }
    

}

textProcessor(way)