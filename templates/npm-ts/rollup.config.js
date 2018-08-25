import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'bin/bundle.js',
      format: 'umd'
    }
  ],
  plugins: [typescript()],
  external: ['fs', 'path', 'jsonfile']
};
