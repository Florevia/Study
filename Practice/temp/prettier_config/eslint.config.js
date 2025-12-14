export default [
  {
    rules: {
      // 可选项："error"、"warn"、"off"
      // 是否禁止 console 语句
      'no-console': 'warn',
      // 是否禁止使用未定义的变量
      'no-unused-vars': 'error',
      // 是否禁止重新赋值 const 变量
      'no-const-assign': 'error',
      // 是否禁止使用 debugger 语句
      'no-debugger': 'error',
      // 是否禁止在变量使用前先声明
      'no-use-before-define': 'error',
      // 是否禁止使用未定义的变量
      'no-undef': 'error'
    },
    languageOptions: {
      globals: {
        window: 'readonly',
        console: 'readonly'
      }
    },
    files: ['src/**/*.{js,css,html}'],
    ignores: ['node_modules/**', 'dist/**']
  }
];
