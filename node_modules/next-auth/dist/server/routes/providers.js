"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = providers;

function providers(req, res) {
  var {
    providers
  } = req.options;
  var result = providers.reduce((acc, _ref) => {
    var {
      id,
      name,
      type,
      signinUrl,
      callbackUrl
    } = _ref;
    acc[id] = {
      id,
      name,
      type,
      signinUrl,
      callbackUrl
    };
    return acc;
  }, {});
  res.json(result);
}