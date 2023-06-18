import { defineConfig, Options } from 'tsup';

const base: Options = {
  outDir: 'packages',
  format: ['cjs', 'esm'],
  external: ['virtual:routes'],
  tsconfig: 'tsconfig.json',
  dts: {
    resolve: true,
  },
  clean: true,
  sourcemap: false,
};

export default defineConfig([

  /** plugins 插件集 */
  {
    dts: { resolve: true },
    entry: ['src/plugins/index.ts'],
    outDir: 'plugins',
    format: ['cjs', 'esm'],
    tsconfig: 'tsconfig.json',
  },

  /** packages 工具集 */
  {
    dts: { resolve: true },
    clean: true,
    entry: ['src/index.ts'],
    outDir: 'packages',
    format: ['cjs', 'esm'],
    sourcemap: false,
  },

  /** React Hooks */
  {
    dts: { resolve: true },
    clean: true,
    entry: ['src/hooks/index.ts'],
    outDir: 'hooks',
    format: ['cjs', 'esm'],
    sourcemap: false,
  },

  /** React Components */
  {
    dts: { resolve: true },
    clean: true,
    entry: ['src/components/index.ts'],
    outDir: 'components',
    format: ['cjs', 'esm'],
    sourcemap: false,
    bundle: false,
    loader: {
      '.css': 'file',
      '.less': 'file',
    },
  },
  // {
  //   ...base,
  //   entry: [
  //     'src/**/*.ts',
  //     'src/**/*.tsx',
  //   ],
  //   bundle: false,
  //   loader: {
  //     // 不处理 样式
  //     '.css': 'file',
  //     '.less': 'file',
  //   },
  // },
  // 处理样式 - 直接拷贝文件
  // {
  //   ...base,
  //   entry: ['src/**/*.less'],
  //   loader: {
  //     '.css': 'copy',
  //     '.less': 'copy',
  //   },
  // }
]);
