"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callback;

var _callback2 = _interopRequireDefault(require("../lib/oauth/callback"));

var _callbackHandler = _interopRequireDefault(require("../lib/callback-handler"));

var cookie = _interopRequireWildcard(require("../lib/cookie"));

var _logger = _interopRequireDefault(require("../../lib/logger"));

var _dispatchEvent = _interopRequireDefault(require("../lib/dispatch-event"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function callback(_x, _x2) {
  return _callback.apply(this, arguments);
}

function _callback() {
  _callback = _asyncToGenerator(function* (req, res) {
    var _req$cookies$cookies$, _req$cookies;

    var {
      provider,
      adapter,
      baseUrl,
      basePath,
      secret,
      cookies,
      callbackUrl,
      pages,
      jwt,
      events,
      callbacks,
      session: {
        jwt: useJwtSession,
        maxAge: sessionMaxAge
      }
    } = req.options;
    var sessionToken = (_req$cookies$cookies$ = (_req$cookies = req.cookies) === null || _req$cookies === void 0 ? void 0 : _req$cookies[cookies.sessionToken.name]) !== null && _req$cookies$cookies$ !== void 0 ? _req$cookies$cookies$ : null;

    if (provider.type === 'oauth') {
      try {
        var {
          profile,
          account,
          OAuthProfile
        } = yield (0, _callback2.default)(req);

        try {
          _logger.default.debug('OAUTH_CALLBACK_RESPONSE', {
            profile,
            account,
            OAuthProfile
          });

          if (!profile) {
            return res.redirect("".concat(baseUrl).concat(basePath, "/signin"));
          }

          var userOrProfile = profile;

          if (adapter) {
            var {
              getUserByProviderAccountId
            } = yield adapter.getAdapter(req.options);
            var userFromProviderAccountId = yield getUserByProviderAccountId(account.provider, account.id);

            if (userFromProviderAccountId) {
              userOrProfile = userFromProviderAccountId;
            }
          }

          try {
            var signInCallbackResponse = yield callbacks.signIn(userOrProfile, account, OAuthProfile);

            if (signInCallbackResponse === false) {
              return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=AccessDenied"));
            } else if (typeof signInCallbackResponse === 'string') {
              return res.redirect(signInCallbackResponse);
            }
          } catch (error) {
            if (error instanceof Error) {
              return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=").concat(encodeURIComponent(error.message)));
            }

            _logger.default.warn('SIGNIN_CALLBACK_REJECT_REDIRECT');

            return res.redirect(error);
          }

          var {
            user,
            session,
            isNewUser
          } = yield (0, _callbackHandler.default)(sessionToken, profile, account, req.options);

          if (useJwtSession) {
            var _user$id;

            var defaultJwtPayload = {
              name: user.name,
              email: user.email,
              picture: user.image,
              sub: (_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.toString()
            };
            var jwtPayload = yield callbacks.jwt(defaultJwtPayload, user, account, OAuthProfile, isNewUser);
            var newEncodedJwt = yield jwt.encode(_objectSpread(_objectSpread({}, jwt), {}, {
              token: jwtPayload
            }));
            var cookieExpires = new Date();
            cookieExpires.setTime(cookieExpires.getTime() + sessionMaxAge * 1000);
            cookie.set(res, cookies.sessionToken.name, newEncodedJwt, _objectSpread({
              expires: cookieExpires.toISOString()
            }, cookies.sessionToken.options));
          } else {
            cookie.set(res, cookies.sessionToken.name, session.sessionToken, _objectSpread({
              expires: session.expires || null
            }, cookies.sessionToken.options));
          }

          yield (0, _dispatchEvent.default)(events.signIn, {
            user,
            account,
            isNewUser
          });

          if (isNewUser && pages.newUser) {
            return res.redirect("".concat(pages.newUser).concat(pages.newUser.includes('?') ? '&' : '?', "callbackUrl=").concat(encodeURIComponent(callbackUrl)));
          }

          return res.redirect(callbackUrl || baseUrl);
        } catch (error) {
          if (error.name === 'AccountNotLinkedError') {
            return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthAccountNotLinked"));
          } else if (error.name === 'CreateUserError') {
            return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthCreateAccount"));
          }

          _logger.default.error('OAUTH_CALLBACK_HANDLER_ERROR', error);

          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Callback"));
        }
      } catch (error) {
        if (error.name === 'OAuthCallbackError') {
          _logger.default.error('CALLBACK_OAUTH_ERROR', error);

          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthCallback"));
        }

        _logger.default.error('OAUTH_CALLBACK_ERROR', error);

        return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Callback"));
      }
    } else if (provider.type === 'email') {
      try {
        if (!adapter) {
          _logger.default.error('EMAIL_REQUIRES_ADAPTER_ERROR');

          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Configuration"));
        }

        var {
          getVerificationRequest,
          deleteVerificationRequest,
          getUserByEmail
        } = yield adapter.getAdapter(req.options);
        var verificationToken = req.query.token;
        var email = req.query.email;
        var invite = yield getVerificationRequest(email, verificationToken, secret, provider);

        if (!invite) {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Verification"));
        }

        yield deleteVerificationRequest(email, verificationToken, secret, provider);

        var _profile = (yield getUserByEmail(email)) || {
          email
        };

        var _account = {
          id: provider.id,
          type: 'email',
          providerAccountId: email
        };

        try {
          var _signInCallbackResponse = yield callbacks.signIn(_profile, _account, {
            email
          });

          if (_signInCallbackResponse === false) {
            return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=AccessDenied"));
          } else if (typeof _signInCallbackResponse === 'string') {
            return res.redirect(_signInCallbackResponse);
          }
        } catch (error) {
          if (error instanceof Error) {
            return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=").concat(encodeURIComponent(error.message)));
          }

          _logger.default.warn('SIGNIN_CALLBACK_REJECT_REDIRECT');

          return res.redirect(error);
        }

        var {
          user: _user,
          session: _session,
          isNewUser: _isNewUser
        } = yield (0, _callbackHandler.default)(sessionToken, _profile, _account, req.options);

        if (useJwtSession) {
          var _user$id2;

          var _defaultJwtPayload = {
            name: _user.name,
            email: _user.email,
            picture: _user.image,
            sub: (_user$id2 = _user.id) === null || _user$id2 === void 0 ? void 0 : _user$id2.toString()
          };

          var _jwtPayload = yield callbacks.jwt(_defaultJwtPayload, _user, _account, _profile, _isNewUser);

          var _newEncodedJwt = yield jwt.encode(_objectSpread(_objectSpread({}, jwt), {}, {
            token: _jwtPayload
          }));

          var _cookieExpires = new Date();

          _cookieExpires.setTime(_cookieExpires.getTime() + sessionMaxAge * 1000);

          cookie.set(res, cookies.sessionToken.name, _newEncodedJwt, _objectSpread({
            expires: _cookieExpires.toISOString()
          }, cookies.sessionToken.options));
        } else {
          cookie.set(res, cookies.sessionToken.name, _session.sessionToken, _objectSpread({
            expires: _session.expires || null
          }, cookies.sessionToken.options));
        }

        yield (0, _dispatchEvent.default)(events.signIn, {
          user: _user,
          account: _account,
          isNewUser: _isNewUser
        });

        if (_isNewUser && pages.newUser) {
          return res.redirect("".concat(pages.newUser).concat(pages.newUser.includes('?') ? '&' : '?', "callbackUrl=").concat(encodeURIComponent(callbackUrl)));
        }

        return res.redirect(callbackUrl || baseUrl);
      } catch (error) {
        if (error.name === 'CreateUserError') {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=EmailCreateAccount"));
        }

        _logger.default.error('CALLBACK_EMAIL_ERROR', error);

        return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Callback"));
      }
    } else if (provider.type === 'credentials' && req.method === 'POST') {
      if (!useJwtSession) {
        _logger.default.error('CALLBACK_CREDENTIALS_JWT_ERROR', 'Signin in with credentials is only supported if JSON Web Tokens are enabled');

        return res.status(500).redirect("".concat(baseUrl).concat(basePath, "/error?error=Configuration"));
      }

      if (!provider.authorize) {
        _logger.default.error('CALLBACK_CREDENTIALS_HANDLER_ERROR', 'Must define an authorize() handler to use credentials authentication provider');

        return res.status(500).redirect("".concat(baseUrl).concat(basePath, "/error?error=Configuration"));
      }

      var credentials = req.body;
      var userObjectReturnedFromAuthorizeHandler;

      try {
        userObjectReturnedFromAuthorizeHandler = yield provider.authorize(credentials);

        if (!userObjectReturnedFromAuthorizeHandler) {
          return res.status(401).redirect("".concat(baseUrl).concat(basePath, "/error?error=CredentialsSignin&provider=").concat(encodeURIComponent(provider.id)));
        }
      } catch (error) {
        if (error instanceof Error) {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=").concat(encodeURIComponent(error.message)));
        }

        return res.redirect(error);
      }

      var _user2 = userObjectReturnedFromAuthorizeHandler;
      var _account2 = {
        id: provider.id,
        type: 'credentials'
      };

      try {
        var _signInCallbackResponse2 = yield callbacks.signIn(_user2, _account2, credentials);

        if (_signInCallbackResponse2 === false) {
          return res.status(403).redirect("".concat(baseUrl).concat(basePath, "/error?error=AccessDenied"));
        }
      } catch (error) {
        if (error instanceof Error) {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=").concat(encodeURIComponent(error.message)));
        }

        return res.redirect(error);
      }

      var _defaultJwtPayload2 = {
        name: _user2.name,
        email: _user2.email,
        picture: _user2.image
      };

      var _jwtPayload2 = yield callbacks.jwt(_defaultJwtPayload2, _user2, _account2, userObjectReturnedFromAuthorizeHandler, false);

      var _newEncodedJwt2 = yield jwt.encode(_objectSpread(_objectSpread({}, jwt), {}, {
        token: _jwtPayload2
      }));

      var _cookieExpires2 = new Date();

      _cookieExpires2.setTime(_cookieExpires2.getTime() + sessionMaxAge * 1000);

      cookie.set(res, cookies.sessionToken.name, _newEncodedJwt2, _objectSpread({
        expires: _cookieExpires2.toISOString()
      }, cookies.sessionToken.options));
      yield (0, _dispatchEvent.default)(events.signIn, {
        user: _user2,
        account: _account2
      });
      return res.redirect(callbackUrl || baseUrl);
    }

    return res.status(500).end("Error: Callback for provider type ".concat(provider.type, " not supported"));
  });
  return _callback.apply(this, arguments);
}