import typescript from 'rollup-plugin-typescript';

export default [
    {
        input: './index.ts',
        output: [
            {
                file: 'dist/bundle.js',
                format: 'cjs',
            },
        ],
        plugins: [typescript(),],
        external: ['fs', 'path', 'jsonfile',],
    },
];
