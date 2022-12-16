const { createHash } = await import('node:crypto');
import { createReadStream } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export const hashFunc = async (chunk) => {
    const filePath = chunk.toString().replace('hash ', '').trim();
    try {
        let readStream = createReadStream(path.resolve(filePath));
        const hash = createHash('sha256');

        readStream.on('readable', ()=>{
            const data = readStream.read();
            if (data)
                hash.update(data);
            else {
                console.log(`${hash.digest('hex')}`);
            }
        })
    } catch (err) {
        console.log('Operation failed')
    }
    console.log(`You are currently in ${process.cwd()}`);

}