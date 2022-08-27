"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = setLogger;
exports.proxyLogger = proxyLogger;
exports.default = void 0;
var _logger = {
  error(code) {
    for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      message[_key - 1] = arguments[_key];
    }

    console.error("[next-auth][error][".concat(code.toLowerCase(), "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), ...message);
  },

  warn(code) {
    for (var _len2 = arguments.length, message = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      message[_key2 - 1] = arguments[_key2];
    }

    console.warn("[next-auth][warn][".concat(code.toLowerCase(), "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()), ...message);
  },

  debug(code) {
    var _process, _process$env;

    if (!((_process = process) !== null && _process !== void 0 && (_process$env = _process.env) !== null && _process$env !== void 0 && _process$env._NEXTAUTH_DEBUG)) return;

    for (var _len3 = arguments.length, message = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      message[_key3 - 1] = arguments[_key3];
    }

    console.log("[next-auth][debug][".concat(code.toLowerCase(), "]"), ...message);
  }

};

function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}

var _default = _logger;
exports.default = _default;

function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (typeof window === 'undefined') {
      return logger;
    }

    var clientLogger = {};

    var _loop = function _loop(level) {
      clientLogger[level] = function (code) {
        for (var _len4 = arguments.length, message = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          message[_key4 - 1] = arguments[_key4];
        }

        _logger[level](code, ...message);

        var url = "".concat(basePath, "/_log");
        var body = new URLSearchParams({
          level,
          code,
          message: JSON.stringify(message.map(m => {
            if (m instanceof Error) {
              return {
                name: m.name,
                message: m.message,
                stack: m.stack
              };
            }

            return m;
          }))
        });

        if (navigator.sendBeacon) {
          return navigator.sendBeacon(url, body);
        }

        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        });
      };
    };

    for (var level in logger) {
      _loop(level);
    }

    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}