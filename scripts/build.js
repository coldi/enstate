/* eslint-disable no-console */
const { execSync } = require('child_process');

const exec = (command, extraEnv) =>
    execSync(command, {
        stdio: 'inherit',
        env: Object.assign({}, process.env, extraEnv),
    });

console.log('Building CommonJS modules ...');

exec('babel src -d dist/cjs', {
    BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel src -d dist', {
    BABEL_ENV: 'es',
});

console.log('\nBuilding enstate.js ...');

exec('rollup -c -f umd -o dist/umd/enstate.js', {
    BABEL_ENV: 'umd',
    NODE_ENV: 'development',
});

console.log('\nBuilding enstate.min.js ...');

exec('rollup -c -f umd -o dist/umd/enstate.min.js', {
    BABEL_ENV: 'umd',
    NODE_ENV: 'production',
});
