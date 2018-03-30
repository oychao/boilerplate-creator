export default [{
    input: './index.js',
    output: [{
        file: 'dist/bundle.js',
        format: 'cjs',
    },],
    plugins: [],
    external: [
        'fs',
        'path',
        'jsonfile',
    ],
},];
