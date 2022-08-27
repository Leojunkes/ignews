"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _jose = _interopRequireDefault(require("jose"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_SIGNATURE_ALGORITHM = 'HS512';
var DEFAULT_ENCRYPTION_ALGORITHM = 'A256GCM';
var DEFAULT_ENCRYPTION_ENABLED = false;
var DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;

function encode() {
  return _encode.apply(this, arguments);
}

function _encode() {
  _encode = _asyncToGenerator(function* () {
    var {
      token = {},
      maxAge = DEFAULT_MAX_AGE,
      secret,
      signingKey,
      signingOptions = {
        expiresIn: "".concat(maxAge, "s")
      },
      encryptionKey,
      encryptionOptions = {
        alg: 'dir',
        enc: DEFAULT_ENCRYPTION_ALGORITHM,
        zip: 'DEF'
      },
      encryption = DEFAULT_ENCRYPTION_ENABLED
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _signingKey = signingKey ? _jose.default.JWK.asKey(JSON.parse(signingKey)) : getDerivedSigningKey(secret);

    var signedToken = _jose.default.JWT.sign(token, _signingKey, signingOptions);

    if (encryption) {
      var _encryptionKey = encryptionKey ? _jose.default.JWK.asKey(JSON.parse(encryptionKey)) : getDerivedEncryptionKey(secret);

      return _jose.default.JWE.encrypt(signedToken, _encryptionKey, encryptionOptions);
    }

    return signedToken;
  });
  return _encode.apply(this, arguments);
}

function decode() {
  return _decode.apply(this, arguments);
}

function _decode() {
  _decode = _asyncToGenerator(function* () {
    var {
      secret,
      token,
      maxAge = DEFAULT_MAX_AGE,
      signingKey,
      verificationKey = signingKey,
      verificationOptions = {
        maxTokenAge: "".concat(maxAge, "s"),
        algorithms: [DEFAULT_SIGNATURE_ALGORITHM]
      },
      encryptionKey,
      decryptionKey = encryptionKey,
      decryptionOptions = {
        algorithms: [DEFAULT_ENCRYPTION_ALGORITHM]
      },
      encryption = DEFAULT_ENCRYPTION_ENABLED
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!token) return null;
    var tokenToVerify = token;

    if (encryption) {
      var _encryptionKey = decryptionKey ? _jose.default.JWK.asKey(JSON.parse(decryptionKey)) : getDerivedEncryptionKey(secret);

      var decryptedToken = _jose.default.JWE.decrypt(token, _encryptionKey, decryptionOptions);

      tokenToVerify = decryptedToken.toString('utf8');
    }

    var _signingKey = verificationKey ? _jose.default.JWK.asKey(JSON.parse(verificationKey)) : getDerivedSigningKey(secret);

    return _jose.default.JWT.verify(tokenToVerify, _signingKey, verificationOptions);
  });
  return _decode.apply(this, arguments);
}

function getToken(_x) {
  return _getToken.apply(this, arguments);
}

function _getToken() {
  _getToken = _asyncToGenerator(function* (params) {
    var _req$headers$authoriz;

    var {
      req,
      secureCookie = !(!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.startsWith('http://')),
      cookieName = secureCookie ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      raw = false
    } = params;
    if (!req) throw new Error('Must pass `req` to JWT getToken()');
    var token = req.cookies[cookieName];

    if (!token && ((_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[0]) === 'Bearer') {
      var urlEncodedToken = req.headers.authorization.split(' ')[1];
      token = decodeURIComponent(urlEncodedToken);
    }

    if (raw) {
      return token;
    }

    try {
      return decode(_objectSpread({
        token
      }, params));
    } catch (_unused) {
      return null;
    }
  });
  return _getToken.apply(this, arguments);
}

var DERIVED_SIGNING_KEY_WARNING = false;
var DERIVED_ENCRYPTION_KEY_WARNING = false;

function hkdf(secret, _ref) {
  var {
    byteLength,
    encryptionInfo,
    digest = 'sha256'
  } = _ref;

  if (_crypto.default.hkdfSync) {
    return Buffer.from(_crypto.default.hkdfSync(digest, secret, Buffer.alloc(0), encryptionInfo, byteLength));
  }

  return require('futoin-hkdf')(secret, byteLength, {
    info: encryptionInfo,
    hash: digest
  });
}

function getDerivedSigningKey(secret) {
  if (!DERIVED_SIGNING_KEY_WARNING) {
    _logger.default.warn('JWT_AUTO_GENERATED_SIGNING_KEY');

    DERIVED_SIGNING_KEY_WARNING = true;
  }

  var buffer = hkdf(secret, {
    byteLength: 64,
    encryptionInfo: 'NextAuth.js Generated Signing Key'
  });

  var key = _jose.default.JWK.asKey(buffer, {
    alg: DEFAULT_SIGNATURE_ALGORITHM,
    use: 'sig',
    kid: 'nextauth-auto-generated-signing-key'
  });

  return key;
}

function getDerivedEncryptionKey(secret) {
  if (!DERIVED_ENCRYPTION_KEY_WARNING) {
    _logger.default.warn('JWT_AUTO_GENERATED_ENCRYPTION_KEY');

    DERIVED_ENCRYPTION_KEY_WARNING = true;
  }

  var buffer = hkdf(secret, {
    byteLength: 32,
    encryptionInfo: 'NextAuth.js Generated Encryption Key'
  });

  var key = _jose.default.JWK.asKey(buffer, {
    alg: DEFAULT_ENCRYPTION_ALGORITHM,
    use: 'enc',
    kid: 'nextauth-auto-generated-encryption-key'
  });

  return key;
}

var _default = {
  encode,
  decode,
  getToken
};
exports.default = _default;