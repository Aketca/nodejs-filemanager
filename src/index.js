const parseArgs = () => {
    let user = process.argv.find((item) => item.includes('--username')).replace('--username=', '');
    console.log(`Welcome to the File Manager, ${user}!`);

};

parseArgs();