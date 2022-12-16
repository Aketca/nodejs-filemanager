import { rm as removeFn } from 'node:fs/promises';
import path from 'node:path';

export const rm = async (chunk) => {
    const filePath = chunk.toString().replace('rm ', '').trim();
    try {
        removeFn(path.resolve(filePath))
    } catch (err) {
        console.log('Operation failed')
    }
    console.log(`You are currently in ${process.cwd()}`);
}