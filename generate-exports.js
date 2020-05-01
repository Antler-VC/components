const fs = require('fs');

const components = fs
  .readdirSync('./src')
  .filter(name => name.includes('.ts') && name !== 'index.ts')
  .map(name => name.split('.ts')[0]);

const output = [];

for (const component of components) {
  output.push(
    `export { default as ${component} } from './${component}';\n` +
      `export * from './${component}';\n`
  );
}

fs.writeFileSync('./src/index.ts', output.join('\n'));
