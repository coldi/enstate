/* eslint-disable no-console */
const { execSync } = require('child_process');

const exec = (command, extraEnv) =>
    execSync(command, {
        stdio: 'inherit',
        env: Object.assign({}, process.env, extraEnv),
    });

console.log('Building CommonJS modules ...');

exec('babel src -d dist/cjs --ignore __tests__', {
    BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel src -d dist/es --ignore __tests__', {
    BABEL_ENV: 'es',
});

console.log('\nBuilding yansl.js ...');

exec('rollup -c -f umd -o dist/umd/yansl.js', {
    BABEL_ENV: 'umd',
    NODE_ENV: 'development',
});

console.log('\nBuilding yansl.min.js ...');

exec('rollup -c -f umd -o dist/umd/yansl.min.js', {
    BABEL_ENV: 'umd',
    NODE_ENV: 'production',
});
