"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = csrfTokenHandler;

var _crypto = require("crypto");

var cookie = _interopRequireWildcard(require("./cookie"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function csrfTokenHandler(req, res, cookies, secret) {
  var {
    csrfToken: csrfTokenFromRequest
  } = req.body;
  var csrfTokenFromCookie;
  var csrfTokenVerified = false;

  if (req.cookies[cookies.csrfToken.name]) {
    var [csrfTokenValue, csrfTokenHash] = req.cookies[cookies.csrfToken.name].split('|');

    if (csrfTokenHash === (0, _crypto.createHash)('sha256').update("".concat(csrfTokenValue).concat(secret)).digest('hex')) {
      csrfTokenFromCookie = csrfTokenValue;

      if (req.method === 'POST' && csrfTokenFromCookie === csrfTokenFromRequest) {
        csrfTokenVerified = true;
      }
    }
  }

  if (!csrfTokenFromCookie) {
    csrfTokenFromCookie = (0, _crypto.randomBytes)(32).toString('hex');
    var newCsrfTokenCookie = "".concat(csrfTokenFromCookie, "|").concat((0, _crypto.createHash)('sha256').update("".concat(csrfTokenFromCookie).concat(secret)).digest('hex'));
    cookie.set(res, cookies.csrfToken.name, newCsrfTokenCookie, cookies.csrfToken.options);
  }

  return {
    csrfToken: csrfTokenFromCookie,
    csrfTokenVerified
  };
}