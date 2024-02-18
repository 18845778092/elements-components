import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import I18n from '@intlify/unplugin-vue-i18n/vite'
const { name } = pkg

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    vueJsx(),
    UnoCSS(),
    dts({ rollupTypes: true }),
    I18n({
      include: [path.resolve(__dirname, './locales/**')],
      // 说明:由于配置了modules/i18n.ts中默认为legacy: false
      // 所以禁止修改
      compositionOnly: true,
      jitCompilation: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.ts'),
      name,
      formats: ['es', 'umd'],
      // the proper extensions will be added
      fileName: (format) => `${name}.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
