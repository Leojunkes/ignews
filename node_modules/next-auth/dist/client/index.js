"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSession = useSession;
exports.getSession = getSession;
exports.getProviders = getProviders;
exports.signIn = signIn;
exports.signOut = signOut;
exports.setOptions = setOptions;
exports.Provider = Provider;
exports.default = void 0;

var _react = require("react");

var _logger2 = _interopRequireWildcard(require("../lib/logger"));

var _parseUrl = _interopRequireDefault(require("../lib/parse-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)(process.env.NEXTAUTH_URL || process.env.VERCEL_URL).baseUrl,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).basePath,
  baseUrlServer: (0, _parseUrl.default)(process.env.NEXTAUTH_URL_INTERNAL || process.env.NEXTAUTH_URL || process.env.VERCEL_URL).baseUrl,
  basePathServer: (0, _parseUrl.default)(process.env.NEXTAUTH_URL_INTERNAL || process.env.NEXTAUTH_URL).basePath,
  keepAlive: 0,
  clientMaxAge: 0,
  _clientLastSync: 0,
  _clientSyncTimer: null,
  _eventListenersAdded: false,
  _clientSession: undefined,
  _getSession: () => {}
};
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
var broadcast = BroadcastChannel();

if (typeof window !== 'undefined' && !__NEXTAUTH._eventListenersAdded) {
  __NEXTAUTH._eventListenersAdded = true;
  broadcast.receive(() => __NEXTAUTH._getSession({
    event: 'storage'
  }));
  document.addEventListener('visibilitychange', () => {
    !document.hidden && __NEXTAUTH._getSession({
      event: 'visibilitychange'
    });
  }, false);
}

var SessionContext = (0, _react.createContext)();

function useSession(session) {
  var context = (0, _react.useContext)(SessionContext);
  if (context) return context;
  return _useSessionHook(session);
}

function _useSessionHook(session) {
  var [data, setData] = (0, _react.useState)(session);
  var [loading, setLoading] = (0, _react.useState)(!data);
  (0, _react.useEffect)(() => {
    __NEXTAUTH._getSession = _asyncToGenerator(function* () {
      var {
        event = null
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      try {
        var triggredByEvent = event !== null;
        var triggeredByStorageEvent = event === 'storage';
        var clientMaxAge = __NEXTAUTH.clientMaxAge;
        var clientLastSync = parseInt(__NEXTAUTH._clientLastSync);

        var currentTime = _now();

        var clientSession = __NEXTAUTH._clientSession;

        if (!triggeredByStorageEvent && clientSession !== undefined) {
          if (clientMaxAge === 0 && triggredByEvent !== true) {
            return;
          } else if (clientMaxAge > 0 && clientSession === null) {
            return;
          } else if (clientMaxAge > 0 && currentTime < clientLastSync + clientMaxAge) {
            return;
          }
        }

        if (clientSession === undefined) {
          __NEXTAUTH._clientSession = null;
        }

        __NEXTAUTH._clientLastSync = _now();
        var newClientSessionData = yield getSession({
          triggerEvent: !triggeredByStorageEvent
        });
        __NEXTAUTH._clientSession = newClientSessionData;
        setData(newClientSessionData);
        setLoading(false);
      } catch (error) {
        logger.error('CLIENT_USE_SESSION_ERROR', error);
        setLoading(false);
      }
    });

    __NEXTAUTH._getSession();
  });
  return [data, loading];
}

function getSession(_x) {
  return _getSession2.apply(this, arguments);
}

function _getSession2() {
  _getSession2 = _asyncToGenerator(function* (ctx) {
    var _ctx$triggerEvent;

    var session = yield _fetchData('session', ctx);

    if ((_ctx$triggerEvent = ctx === null || ctx === void 0 ? void 0 : ctx.triggerEvent) !== null && _ctx$triggerEvent !== void 0 ? _ctx$triggerEvent : true) {
      broadcast.post({
        event: 'session',
        data: {
          trigger: 'getSession'
        }
      });
    }

    return session;
  });
  return _getSession2.apply(this, arguments);
}

function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}

function _getCsrfToken() {
  _getCsrfToken = _asyncToGenerator(function* (ctx) {
    var _yield$_fetchData;

    return (_yield$_fetchData = yield _fetchData('csrf', ctx)) === null || _yield$_fetchData === void 0 ? void 0 : _yield$_fetchData.csrfToken;
  });
  return _getCsrfToken.apply(this, arguments);
}

function getProviders() {
  return _getProviders.apply(this, arguments);
}

function _getProviders() {
  _getProviders = _asyncToGenerator(function* () {
    return _fetchData('providers');
  });
  return _getProviders.apply(this, arguments);
}

function signIn(_x3) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = _asyncToGenerator(function* (provider) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var authorizationParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      callbackUrl = window.location,
      redirect = true
    } = options;

    var baseUrl = _apiBaseUrl();

    var providers = yield getProviders();

    if (!(provider in providers)) {
      window.location = "".concat(baseUrl, "/signin?callbackUrl=").concat(encodeURIComponent(callbackUrl));
      return;
    }

    var isCredentials = providers[provider].type === 'credentials';
    var isEmail = providers[provider].type === 'email';
    var canRedirectBeDisabled = isCredentials || isEmail;
    var signInUrl = isCredentials ? "".concat(baseUrl, "/callback/").concat(provider) : "".concat(baseUrl, "/signin/").concat(provider);
    var fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(_objectSpread(_objectSpread({}, options), {}, {
        csrfToken: yield getCsrfToken(),
        callbackUrl,
        json: true
      }))
    };

    var _signInUrl = "".concat(signInUrl, "?").concat(new URLSearchParams(authorizationParams));

    var res = yield fetch(_signInUrl, fetchOptions);
    var data = yield res.json();

    if (redirect || !canRedirectBeDisabled) {
      var _data$url;

      var url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
      window.location = url;
      if (url.includes('#')) window.location.reload();
      return;
    }

    var error = new URL(data.url).searchParams.get('error');

    if (res.ok) {
      yield __NEXTAUTH._getSession({
        event: 'storage'
      });
    }

    return {
      error,
      status: res.status,
      ok: res.ok,
      url: error ? null : data.url
    };
  });
  return _signIn.apply(this, arguments);
}

function signOut() {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = _asyncToGenerator(function* () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      callbackUrl = window.location,
      redirect = true
    } = options;

    var baseUrl = _apiBaseUrl();

    var fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        csrfToken: yield getCsrfToken(),
        callbackUrl,
        json: true
      })
    };
    var res = yield fetch("".concat(baseUrl, "/signout"), fetchOptions);
    var data = yield res.json();
    broadcast.post({
      event: 'session',
      data: {
        trigger: 'signout'
      }
    });

    if (redirect) {
      var _data$url2;

      var url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
      window.location = url;
      if (url.includes('#')) window.location.reload();
      return;
    }

    yield __NEXTAUTH._getSession({
      event: 'storage'
    });
    return data;
  });
  return _signOut.apply(this, arguments);
}

function setOptions() {
  var {
    baseUrl,
    basePath,
    clientMaxAge,
    keepAlive
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (baseUrl) __NEXTAUTH.baseUrl = baseUrl;
  if (basePath) __NEXTAUTH.basePath = basePath;
  if (clientMaxAge) __NEXTAUTH.clientMaxAge = clientMaxAge;

  if (keepAlive) {
    __NEXTAUTH.keepAlive = keepAlive;
    if (typeof window === 'undefined') return;

    if (__NEXTAUTH._clientSyncTimer !== null) {
      clearTimeout(__NEXTAUTH._clientSyncTimer);
    }

    __NEXTAUTH._clientSyncTimer = setTimeout(_asyncToGenerator(function* () {
      if (!__NEXTAUTH._clientSession) return;
      yield __NEXTAUTH._getSession({
        event: 'timer'
      });
    }), keepAlive * 1000);
  }
}

function Provider(_ref3) {
  var {
    children,
    session,
    options
  } = _ref3;
  setOptions(options);
  return (0, _react.createElement)(SessionContext.Provider, {
    value: useSession(session)
  }, children);
}

function _fetchData(_x4) {
  return _fetchData2.apply(this, arguments);
}

function _fetchData2() {
  _fetchData2 = _asyncToGenerator(function* (path) {
    var {
      ctx,
      req = ctx === null || ctx === void 0 ? void 0 : ctx.req
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
      var baseUrl = yield _apiBaseUrl();
      var options = req ? {
        headers: {
          cookie: req.headers.cookie
        }
      } : {};
      var res = yield fetch("".concat(baseUrl, "/").concat(path), options);
      var data = yield res.json();
      return Object.keys(data).length > 0 ? data : null;
    } catch (error) {
      logger.error('CLIENT_FETCH_ERROR', path, error);
      return null;
    }
  });
  return _fetchData2.apply(this, arguments);
}

function _apiBaseUrl() {
  if (typeof window === 'undefined') {
    if (!process.env.NEXTAUTH_URL) {
      logger.warn('NEXTAUTH_URL', 'NEXTAUTH_URL environment variable not set');
    }

    return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
  }

  return __NEXTAUTH.basePath;
}

function _now() {
  return Math.floor(Date.now() / 1000);
}

function BroadcastChannel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'nextauth.message';
  return {
    receive(onReceive) {
      if (typeof window === 'undefined') return;
      window.addEventListener('storage', function () {
        var _ref4 = _asyncToGenerator(function* (event) {
          if (event.key !== name) return;
          var message = JSON.parse(event.newValue);
          if ((message === null || message === void 0 ? void 0 : message.event) !== 'session' || !(message !== null && message !== void 0 && message.data)) return;
          onReceive(message);
        });

        return function (_x5) {
          return _ref4.apply(this, arguments);
        };
      }());
    },

    post(message) {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
        timestamp: _now()
      })));
    }

  };
}

var _default = {
  getSession,
  getCsrfToken,
  getProviders,
  useSession,
  signIn,
  signOut,
  Provider,
  setOptions,
  options: setOptions,
  session: getSession,
  providers: getProviders,
  csrfToken: getCsrfToken,
  signin: signIn,
  signout: signOut
};
exports.default = _default;