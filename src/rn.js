import process from 'node:process';
import { rename } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

export const rn = async (chunk) => {
    let prevName;
    let actualName;
    const singleQuotesIndex = chunk.toString().indexOf(`'`);
    const doubleQuotesIndex = chunk.toString().indexOf(`"`);
    let parsedArr = [];
    if (singleQuotesIndex > -1) {
        parsedArr = chunk.toString().split(`'`);
        actualName = parsedArr[3];
    } else if (doubleQuotesIndex > -1) {
        parsedArr = chunk.toString().split(`"`);
        actualName = parsedArr[3];
    } else {
        parsedArr = chunk.toString().split(' ');
        actualName = parsedArr[2].replace(os.EOL, '');
    }
    prevName = parsedArr[1];
    if (parsedArr.length > 0) {
        try {
            rename(path.resolve(prevName), path.resolve(actualName), {flag: 'wx'})
            console.log('Operation successful')
        } catch (err) {
            console.log('Operation failed')
        }
    } else {
        console.log('Invalid input')
    }
    console.log(`You are currently in ${process.cwd()}`);
}
