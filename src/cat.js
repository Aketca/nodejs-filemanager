import process from 'node:process';
import { createReadStream } from 'node:fs';
import path from 'node:path';

export const cat = async (chunk) => {
    const filePath = chunk.toString().replace('cat ', '').trim();
    try {
        let stream = createReadStream(path.resolve(filePath));
        stream.on('data', (chunk) => {
            console.log(chunk.toString())
        })
        stream.on('error', () => {
            console.log('Operation failed')
        })
    } catch (err) {
        console.log('Invalid input');
    }
    console.log(`You are currently in ${process.cwd()}`);

}
