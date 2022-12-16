import process from 'node:process';
import path from 'node:path';

export const cd = async (chunk) => {
    const folderPath = chunk.toString().replace('cd ', '').trim();
    try {
        process.chdir(path.resolve(folderPath));
    } catch (err) {
        console.log('Operation failed')
    }
    console.log(`You are currently in ${process.cwd()}`);
}