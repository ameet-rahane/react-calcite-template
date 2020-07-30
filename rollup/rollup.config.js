import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: [{ dir: path.resolve('public'), format: 'es' }],
  plugins: [
    resolve(), // tells Rollup how to find node_modules
    commonjs(), // needed if you're using libraries that leverage commonjs
    postcss({ // allows us to import the global calcite css
      extensions: ['.css']
    }),
    copy({ // copy over the calcite-components assets
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@esri/calcite-components/dist/calcite/assets'),
          dest: path.resolve(__dirname, 'public')
        },
      ]
    }),
    production && terser() // minify, but only in production
  ]
};
