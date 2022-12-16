import {createReadStream, createWriteStream} from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import process from 'node:process';

export const compress = async (chunk) => {
    const fileName = chunk.toString().replace(chunk.toString().indexOf('decompress') > -1 ? 'decompress ' : 'compress ', '').trim();

    try {
        const readStream = createReadStream(path.resolve(fileName));
        const writeStream = createWriteStream(path.resolve(fileName.includes('.br') ? fileName.replace('.br', '') : fileName + '.br'));
        const brotli = fileName.includes('.br') ? zlib.createBrotliDecompress() : zlib.createBrotliCompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);
        stream.on('finish', () => {
            console.log(`You are currently in ${process.cwd()}`);
        });
    } catch (err) {
        console.log('Operation failed')
    }
}


