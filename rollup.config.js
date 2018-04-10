import shebang from 'rollup-plugin-shebang';
import json from 'rollup-plugin-json';

export default [{
    input: './index.js',
    output: [{
        file: 'bin/bundle.js',
        format: 'cjs',
    },],
    plugins: [
        shebang({
            shebang: '#!/usr/bin/env node',
        }),
        json({
            preferConst: true,
            indent: '  ',
        }),
    ],
    external: [
        'fs',
        'path',
        'chalk',
        'commander',
        'mkdirp',
        'ora',
        'promise-jsonfile',
        'readline-sync',
        'shelljs',
    ],
},];
