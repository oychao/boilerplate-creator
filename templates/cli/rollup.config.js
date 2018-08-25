import babel from 'rollup-plugin-babel';
import shebang from 'rollup-plugin-shebang';
import json from 'rollup-plugin-json';

export default {
  input: './index.js',
  output: [
    {
      file: 'bin/bundle.js',
      format: 'cjs'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      plugins: ['@babel/external-helpers']
    }),
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
};
