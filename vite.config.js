import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import Components from 'unplugin-vue-components/vite';
import eslint from 'vite-plugin-eslint'; // Добавьте этот импорт
import checker from 'vite-plugin-checker'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    checker({
      typescript: true, // Включает проверку TypeScript
      vueTsc: true,     // Проверка типов в .vue файлах
    }),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    eslint({
      fix: true,
      lintOnStart: true,
      overrideConfig: {
        rules: {
          "@typescript-eslint/no-explicit-any": "off" // Отключаем правило
        }
      }
    }),
  ],

  build: {
    rollupOptions: {
      input: '/src/main.ts' // Убедитесь, что указан .ts файл
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  config: {
    rules: {
      "@typescript-eslint/no-explicit-any": "off" // Локальное переопределение
    }
  }
});
