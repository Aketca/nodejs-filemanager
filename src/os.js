import os from 'node:os';
import process from 'node:process';

export const osFunc = (chunk) => {
    if (chunk.toString().includes('--EOL')) {
        console.log(JSON.stringify(os.EOL));
    }
    if (chunk.toString().includes('--cpus')) {
        console.log(JSON.stringify(os.cpus()));
    }
    if (chunk.toString().includes('--homedir')) {
        console.log(JSON.stringify(os.homedir()));
    }
    if (chunk.toString().includes('--username')) {
        console.log(JSON.stringify(os.userInfo().username));
    }
    if (chunk.toString().includes('--architecture')) {
        console.log(JSON.stringify(os.arch()));
    }
    console.log(`You are currently in ${process.cwd()}`);
}