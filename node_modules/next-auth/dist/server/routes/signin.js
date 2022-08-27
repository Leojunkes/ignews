"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signin;

var _oauth = _interopRequireDefault(require("../lib/signin/oauth"));

var _email = _interopRequireDefault(require("../lib/signin/email"));

var _logger = _interopRequireDefault(require("../../lib/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function signin(_x, _x2) {
  return _signin.apply(this, arguments);
}

function _signin() {
  _signin = _asyncToGenerator(function* (req, res) {
    var {
      provider,
      baseUrl,
      basePath,
      adapter,
      callbacks
    } = req.options;

    if (!provider.type) {
      return res.status(500).end("Error: Type not specified for ".concat(provider.name));
    }

    if (provider.type === 'oauth' && req.method === 'POST') {
      try {
        var authorizationUrl = yield (0, _oauth.default)(req);
        return res.redirect(authorizationUrl);
      } catch (error) {
        _logger.default.error('SIGNIN_OAUTH_ERROR', error);

        return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=OAuthSignin"));
      }
    } else if (provider.type === 'email' && req.method === 'POST') {
      var _req$body$email$toLow, _req$body$email;

      if (!adapter) {
        _logger.default.error('EMAIL_REQUIRES_ADAPTER_ERROR');

        return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=Configuration"));
      }

      var {
        getUserByEmail
      } = yield adapter.getAdapter(req.options);
      var email = (_req$body$email$toLow = (_req$body$email = req.body.email) === null || _req$body$email === void 0 ? void 0 : _req$body$email.toLowerCase()) !== null && _req$body$email$toLow !== void 0 ? _req$body$email$toLow : null;
      var profile = (yield getUserByEmail(email)) || {
        email
      };
      var account = {
        id: provider.id,
        type: 'email',
        providerAccountId: email
      };

      try {
        var signInCallbackResponse = yield callbacks.signIn(profile, account, {
          email,
          verificationRequest: true
        });

        if (signInCallbackResponse === false) {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=AccessDenied"));
        } else if (typeof signInCallbackResponse === 'string') {
          return res.redirect(signInCallbackResponse);
        }
      } catch (error) {
        if (error instanceof Error) {
          return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=").concat(encodeURIComponent(error)));
        }

        _logger.default.warn('SIGNIN_CALLBACK_REJECT_REDIRECT');

        return res.redirect(error);
      }

      try {
        yield (0, _email.default)(email, provider, req.options);
      } catch (error) {
        _logger.default.error('SIGNIN_EMAIL_ERROR', error);

        return res.redirect("".concat(baseUrl).concat(basePath, "/error?error=EmailSignin"));
      }

      return res.redirect("".concat(baseUrl).concat(basePath, "/verify-request?provider=").concat(encodeURIComponent(provider.id), "&type=").concat(encodeURIComponent(provider.type)));
    }

    return res.redirect("".concat(baseUrl).concat(basePath, "/signin"));
  });
  return _signin.apply(this, arguments);
}