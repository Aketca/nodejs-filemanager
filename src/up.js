import process from 'node:process';
import path from 'node:path';

export const up = async () => {
    process.chdir(path.join(process.cwd(), '..'));
    console.log(`You are currently in ${process.cwd()}`);
}