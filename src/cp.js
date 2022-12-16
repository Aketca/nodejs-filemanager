import process from 'node:process';
import {createWriteStream, createReadStream} from 'node:fs';
import path from 'node:path';
import { rm } from 'node:fs/promises';

export const cp = async (chunk, flag) => {
    let prevPath;
    let actualPath;
    const singleQuotesIndex = chunk.toString().indexOf(`'`);
    const doubleQuotesIndex = chunk.toString().indexOf(`"`);
    let parsedArr = [];
    if (singleQuotesIndex > -1) {
        parsedArr = chunk.toString().split(`'`);
        actualPath = parsedArr[3];
    } else if (doubleQuotesIndex > -1) {
        parsedArr = chunk.toString().split(`"`);
        actualPath = parsedArr[3];
    } else {
        parsedArr = chunk.toString().split(' ');
        actualPath = parsedArr[2].replace('\r\n', '');
    }
    prevPath = parsedArr[1];

    if (parsedArr.length > 0) {
        try {
            let readStream = createReadStream(path.resolve(prevPath));
            let writeStream = createWriteStream(path.resolve(actualPath, prevPath));
            readStream.pipe(writeStream);
            readStream.on('error', () => {
                console.log('Operation failed')
            })
            writeStream.on('error', () => {
                console.log('Operation failed')
            })
            writeStream.on('finish', () => {
                if (flag === 'mv') {
                    rm(path.resolve(prevPath))
                }
                console.log('Operation successful')
            })


        } catch (err) {
            console.log('Operation failed')
        }
    } else {
        console.log('Invalid input')
    }
    console.log(`You are currently in ${process.cwd()}`);
}