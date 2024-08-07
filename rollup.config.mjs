import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/editor.mjs',
  output: {
    file: 'public/editor.bundle.js',
    format: 'iife',
    name: 'CodeMirrorBundle'
  },
  plugins: [nodeResolve()]
};
