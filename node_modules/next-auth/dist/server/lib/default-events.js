"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.signOut = signOut;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.linkAccount = linkAccount;
exports.session = session;
exports.error = error;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function signIn(_x) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = _asyncToGenerator(function* (message) {});
  return _signIn.apply(this, arguments);
}

function signOut(_x2) {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = _asyncToGenerator(function* (message) {});
  return _signOut.apply(this, arguments);
}

function createUser(_x3) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(function* (message) {});
  return _createUser.apply(this, arguments);
}

function updateUser(_x4) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(function* (message) {});
  return _updateUser.apply(this, arguments);
}

function linkAccount(_x5) {
  return _linkAccount.apply(this, arguments);
}

function _linkAccount() {
  _linkAccount = _asyncToGenerator(function* (message) {});
  return _linkAccount.apply(this, arguments);
}

function session(_x6) {
  return _session.apply(this, arguments);
}

function _session() {
  _session = _asyncToGenerator(function* (message) {});
  return _session.apply(this, arguments);
}

function error(_x7) {
  return _error.apply(this, arguments);
}

function _error() {
  _error = _asyncToGenerator(function* (message) {});
  return _error.apply(this, arguments);
}