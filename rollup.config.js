import shebang from 'rollup-plugin-shebang';

export default [{
    input: './index.js',
    output: [{
        file: 'bin/bundle.js',
        format: 'cjs'
    }],
    plugins: [
        shebang({
            shebang: '#!/usr/bin/env node'
        })
    ]
}];
