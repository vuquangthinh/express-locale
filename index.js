import objectPath from 'object-path';
import locales from 'app/locales';

/**
 * @param {Function} detect detect = (req, res, next) => { return req.headers['x-locale'] }
 */
export default ({ detect, locales }) => (req, res, next) => {
  const locale = detect(req, res, next);
  //  req.headers['x-locale'] || 'en';
  req.locale = locale;

  req.t = (code, params = {}) => {
    const text = objectPath.get(locales[locale], code, code);

    if (params) {
      for (var k in params) {
        if (typeof params[k] !== 'function') {
          text = text.replace('{{{' + k + '}}}', params[k].toString());
        }
      }
    }

    // remove remaining variables
    const regexRemainVar = /{{{[a-zA-Z_0-9]+}}}/;
    return text.replace(regexRemainVar, '');
  };

  next();
};
