
# HOW IT WORK

```
import createLocaleMiddleware from 'express-middleware-locale';

const locales = {
  vi: {
    key: {
      code: "hello {{{name}}}"
    }
  }
};

// express
server.use(createLocaleMiddleware({
  detect: (req, res, next) => req.headers['x-locale'] || 'en',
  locales
}));

// translate
server.get('/', (req, res, next) => req.t('key.code', { name: 'world' }));

```