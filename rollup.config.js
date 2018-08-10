import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const config = {
    input: 'src/index.js',
    output: {
        name: 'enstate',
        globals: {
            react: 'React',
        },
    },
    external: ['react'],
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            plugins: [
                'external-helpers',
                'transform-class-properties',
                'transform-object-rest-spread',
            ],
            presets: [['env', { modules: false }], 'react'],
        }),
        resolve(),
        commonjs({
            include: /node_modules/,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(uglify());
}

export default config;
