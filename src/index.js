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
    if (chunkStringified.trim().slice(0,2) === 'up') {
        await up();
    }
    if (chunkStringified.trim().slice(0,3) === 'cd ') {
        await cd(chunk);
    }
    if (chunkStringified.trim().slice(0,2) === 'ls') {
        await ls();
    }
    if (chunkStringified.trim().slice(0,4) === 'cat ') {
        await cat(chunk);
    }
    if (chunkStringified.trim().slice(0,4) === 'add ') {
        await add(chunk);
    }
    if (chunkStringified.trim().slice(0,3) === 'rn ') {
        await rn(chunk);
    }
    if (chunkStringified.trim().slice(0,3) === 'cp ') {
        await cp(chunk);
    }
    if (chunkStringified.trim().slice(0,3) === 'mv ') {
        await cp(chunk, 'mv');
    }
    if (chunkStringified.trim().slice(0,3) === 'rm ') {
        await rm(chunk);
    }
    if (chunkStringified.trim().slice(0,3) === 'os ') {
        await osFunc(chunk);
    }
    if (chunkStringified.trim().slice(0,5) === 'hash ') {
        await hashFunc(chunk);
    }
    if (chunkStringified.includes('compress ')) {
        await compress(chunk)
    }
};
const index = async (args) => {
    const userParam = args.find((item) => item.includes('--username='));
    await process.chdir(os.homedir());

    if (userParam) {
        const userName = userParam.replace('--username=', '');
        console.log(`Welcome to the File Manager, ${userName}!`)
        console.log(`You are currently in ${process.cwd()}`)


        process.stdin.on('data', echoInput);

        process.on('SIGINT', () => process.exit(0) );

        process.on('exit', () => {
            console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
        });
    } else {
        console.log('Invalid input')
    }
};

await index(process.argv.slice(2));