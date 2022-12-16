import os from 'node:os';
import process from 'node:process';
import {ls} from "./ls.js";
import {up} from "./up.js";
import {cd} from "./cd.js";
import {cat} from "./cat.js";
import {add} from "./add.js";
import {rn} from "./rn.js";
import {cp} from "./cp.js";
import {rm} from "./rm.js";
import {compress} from "./compress.js";
import {hashFunc} from "./hash.js";
import {osFunc} from "./os.js";

const echoInput = async (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('.exit')) {
        process.exit(0);
    }
    if (chunkStringified.includes('up')) {
        await up();
    }
    if (chunkStringified.includes('cd ')) {
        await cd(chunk);
    }
    if (chunkStringified.includes('ls')) {
        await ls();
    }
    if (chunkStringified.includes('cat ')) {
        await cat(chunk);
    }
    if (chunkStringified.includes('add ')) {
        await add(chunk);
    }
    if (chunkStringified.includes('rn ')) {
        await rn(chunk);
    }
    if (chunkStringified.includes('cp ')) {
        await cp(chunk);
    }
    if (chunkStringified.includes('mv ')) {
        await cp(chunk, 'mv');
    }
    if (chunkStringified.includes('rm ')) {
        await rm(chunk);
    }
    if (chunkStringified.includes('os ')) {
        await osFunc(chunk);
    }
    if (chunkStringified.includes('hash ')) {
        await hashFunc(chunk);
    }
    if (chunkStringified.includes('compress ')) {
        await compress(chunk)
    }
    // process.stdout.write(`Received from master process: ${chunkStringified}`)
    // process.stdout.write(`You are currently in ${currDir}`);
};
const index = async (args) => {
    const userParam = args.find((item) => item.includes('--username='));
    await process.chdir(os.homedir());

    if (userParam) {
        const userName = userParam.replace('--username=', '');
        console.log(`Welcome to the File Manager, ${userName}!`)
        console.log(`You are currently in ${process.cwd()}`)


        process.stdin.on('data', echoInput);

        process.on('SIGINT', process.exit );

        process.on('exit', () => {
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        });
    } else {
        console.log('Invalid input')
    }
};

await index(process.argv.slice(2));