"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = callbackHandler;

var _errors = require("../../lib/errors");

var _dispatchEvent = _interopRequireDefault(require("../lib/dispatch-event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function callbackHandler(_x, _x2, _x3, _x4) {
  return _callbackHandler.apply(this, arguments);
}

function _callbackHandler() {
  _callbackHandler = _asyncToGenerator(function* (sessionToken, profile, providerAccount, options) {
    if (!profile) throw new Error('Missing profile');
    if (!(providerAccount !== null && providerAccount !== void 0 && providerAccount.id) || !providerAccount.type) throw new Error('Missing or invalid provider account');
    if (!['email', 'oauth'].includes(providerAccount.type)) throw new Error('Provider not supported');
    var {
      adapter,
      jwt,
      events,
      session: {
        jwt: useJwtSession
      }
    } = options;

    if (!adapter) {
      return {
        user: profile,
        account: providerAccount,
        session: {}
      };
    }

    var {
      createUser,
      updateUser,
      getUser,
      getUserByProviderAccountId,
      getUserByEmail,
      linkAccount,
      createSession,
      getSession,
      deleteSession
    } = yield adapter.getAdapter(options);
    var session = null;
    var user = null;
    var isSignedIn = null;
    var isNewUser = false;

    if (sessionToken) {
      var _session2;

      if (useJwtSession) {
        try {
          var _session;

          session = yield jwt.decode(_objectSpread(_objectSpread({}, jwt), {}, {
            token: sessionToken
          }));

          if ((_session = session) !== null && _session !== void 0 && _session.sub) {
            user = yield getUser(session.sub);
            isSignedIn = !!user;
          }
        } catch (_unused) {}
      }

      session = yield getSession(sessionToken);

      if ((_session2 = session) !== null && _session2 !== void 0 && _session2.userId) {
        user = yield getUser(session.userId);
        isSignedIn = !!user;
      }
    }

    if (providerAccount.type === 'email') {
      var userByEmail = profile.email ? yield getUserByEmail(profile.email) : null;

      if (userByEmail) {
        if (isSignedIn) {
          if (user.id !== userByEmail.id && !useJwtSession) {
            yield deleteSession(sessionToken);
          }
        }

        var currentDate = new Date();
        user = yield updateUser(_objectSpread(_objectSpread({}, userByEmail), {}, {
          emailVerified: currentDate
        }));
        yield (0, _dispatchEvent.default)(events.updateUser, user);
      } else {
        var _currentDate = new Date();

        user = yield createUser(_objectSpread(_objectSpread({}, profile), {}, {
          emailVerified: _currentDate
        }));
        yield (0, _dispatchEvent.default)(events.createUser, user);
        isNewUser = true;
      }

      session = useJwtSession ? {} : yield createSession(user);
      return {
        session,
        user,
        isNewUser
      };
    } else if (providerAccount.type === 'oauth') {
      var userByProviderAccountId = yield getUserByProviderAccountId(providerAccount.provider, providerAccount.id);

      if (userByProviderAccountId) {
        if (isSignedIn) {
          if ("".concat(userByProviderAccountId.id) === "".concat(user.id)) {
            return {
              session,
              user,
              isNewUser
            };
          }

          throw new _errors.AccountNotLinkedError();
        }

        session = useJwtSession ? {} : yield createSession(userByProviderAccountId);
        return {
          session,
          user: userByProviderAccountId,
          isNewUser
        };
      } else {
        if (isSignedIn) {
          yield linkAccount(user.id, providerAccount.provider, providerAccount.type, providerAccount.id, providerAccount.refreshToken, providerAccount.accessToken, providerAccount.accessTokenExpires);
          yield (0, _dispatchEvent.default)(events.linkAccount, {
            user,
            providerAccount: providerAccount
          });
          return {
            session,
            user,
            isNewUser
          };
        }

        var _userByEmail = profile.email ? yield getUserByEmail(profile.email) : null;

        if (_userByEmail) {
          throw new _errors.AccountNotLinkedError();
        }

        user = yield createUser(profile);
        yield (0, _dispatchEvent.default)(events.createUser, user);
        yield linkAccount(user.id, providerAccount.provider, providerAccount.type, providerAccount.id, providerAccount.refreshToken, providerAccount.accessToken, providerAccount.accessTokenExpires);
        yield (0, _dispatchEvent.default)(events.linkAccount, {
          user,
          providerAccount: providerAccount
        });
        session = useJwtSession ? {} : yield createSession(user);
        isNewUser = true;
        return {
          session,
          user,
          isNewUser
        };
      }
    }
  });
  return _callbackHandler.apply(this, arguments);
}