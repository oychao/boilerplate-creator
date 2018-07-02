import typescript from 'rollup-plugin-typescript2';
import shebang from 'rollup-plugin-shebang';
import json from 'rollup-plugin-json';

export default [
    {
        input: './src/index.ts',
        output: [
            {
                file: 'bin/bundle.js',
                format: 'cjs'
            }
        ],
        plugins: [
            typescript(),
            shebang({
                shebang: '#!/usr/bin/env node'
            }),
            json({
                preferConst: true,
                indent: '  '
            })
        ],
        external: [
            'fs',
            'path',
            'commander',
            'mkdirp',
            'chalk',
            'ora',
            'promise-jsonfile',
            'shelljs'
        ]
    }
];
