import catchFile from "./index.js";
import chalk from "chalk";

const way = process.argv;

async function textProcessor(someWay){
    const file = await catchFile(someWay[2])
    console.log(chalk.yellow('lista de links: '), file)
}

textProcessor(way)