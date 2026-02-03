# 环境变量

## webpack 中

### .env.development

```env
VUE_APP_ENV = 'development'
VUE_APP_BASE_API = '/api'
```

### .env.production

```env
VUE_APP_ENV = 'production'
VUE_APP_BASE_API = 'prod/api'
```

### 访问方式

```js
process.env.VUE_APP_ENV;
process.env.VUE_APP_BASE_API;
```

## vite 中

### .env.development

```env
VITE_APP_ENV = 'development'
VITE_APP_BASE_API = '/api'
```

### .env.production

```env
VITE_APP_ENV = 'production'
VITE_APP_BASE_API = 'prod/api'
```

### 访问方式

```js
import.meta.env.VITE_APP_ENV;
import.meta.env.VITE_APP_BASE_API;
```
