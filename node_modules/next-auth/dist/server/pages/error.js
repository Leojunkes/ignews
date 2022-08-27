"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = error;

var _preact = require("preact");

function error(_ref) {
  var {
    baseUrl,
    basePath,
    error = 'default',
    res
  } = _ref;
  var signinPageUrl = "".concat(baseUrl).concat(basePath, "/signin");
  var errors = {
    default: {
      statusCode: 200,
      heading: 'Error',
      message: (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "site",
        href: baseUrl
      }, baseUrl.replace(/^https?:\/\//, '')))
    },
    configuration: {
      statusCode: 500,
      heading: 'Server error',
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "There is a problem with the server configuration."), (0, _preact.h)("p", null, "Check the server logs for more information."))
    },
    accessdenied: {
      statusCode: 403,
      heading: 'Access Denied',
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "You do not have permission to sign in."), (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "button",
        href: signinPageUrl
      }, "Sign in")))
    },
    verification: {
      statusCode: 403,
      heading: 'Unable to sign in',
      message: (0, _preact.h)("div", null, (0, _preact.h)("p", null, "The sign in link is no longer valid."), (0, _preact.h)("p", null, "It may have been used already or it may have expired.")),
      signin: (0, _preact.h)("p", null, (0, _preact.h)("a", {
        className: "button",
        href: signinPageUrl
      }, "Sign in"))
    }
  };
  var {
    statusCode,
    heading,
    message,
    signin
  } = errors[error.toLowerCase()];
  res.status(statusCode);
  return (0, _preact.h)("div", {
    className: "error"
  }, (0, _preact.h)("h1", null, heading), (0, _preact.h)("div", {
    className: "message"
  }, message), signin);
}