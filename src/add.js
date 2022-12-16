import process from 'node:process';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

export const add = async (chunk) => {
    const filePath = chunk.toString().replace('add ', '').trim();
    if (filePath) {
        try {
            writeFile(path.resolve(filePath), '', {flag: 'wx'})
        } catch (err) {
            console.log('Operation failed')
        }
    } else {
        console.log('Invalid input')
    }

    console.log(`You are currently in ${process.cwd()}`);
}
