const fs = require('fs');

process.chdir('./src');

const output = [];

function scanDir(dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    // This is the generated file
    if (item === 'index.ts') continue;

    // Recursively scan this directory
    if (!item.includes('.')) scanDir(dir + '/' + item);

    // Export the file’s contents
    if (!item.includes('.ts')) continue;
    const component = item.split('.')[0];

    output.push(
      `export { default as ${component} } from '${dir}/${component}';\n` +
        `export * from '${dir}/${component}';\n`
    );
  }
}

scanDir('.');
fs.writeFileSync('index.ts', output.join('\n'));
