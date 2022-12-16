import process from 'node:process';
import { readdir } from 'node:fs/promises';

export const ls = async () => {
    function Structure(name, type) {
        this.Name = name;
        this.Type = type;
    }
    try {
        const files = await readdir(process.cwd(), {withFileTypes: true});
        console.table(files.sort(a => a.isFile() ? 1 : -1).map(el => new Structure(el.name, el.isFile() ? 'file' : 'directory')));
        console.log(`You are currently in ${process.cwd()}`);
    } catch (err) {
        console.error(err);
    }
}
