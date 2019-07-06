import json from 'rollup-plugin-json';

export default [{
  input: './index.js',
  output: [{
    banner: '#!/usr/bin/env node',
    file: 'bin/bundle.js',
    format: 'cjs'
  }],
  plugins: [
    json({
      preferConst: true,
      indent: '  '
    })
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
    'fs-extra',
    'axios'
  ]
}];
