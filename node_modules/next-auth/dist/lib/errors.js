"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthCallbackError = exports.AccountNotLinkedError = exports.CreateUserError = exports.UnknownError = void 0;

class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownError';
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message
      }
    };
  }

}

exports.UnknownError = UnknownError;

class CreateUserError extends UnknownError {
  constructor(message) {
    super(message);
    this.name = 'CreateUserError';
  }

}

exports.CreateUserError = CreateUserError;

class AccountNotLinkedError extends UnknownError {
  constructor(message) {
    super(message);
    this.name = 'AccountNotLinkedError';
  }

}

exports.AccountNotLinkedError = AccountNotLinkedError;

class OAuthCallbackError extends UnknownError {
  constructor(message) {
    super(message);
    this.name = 'OAuthCallbackError';
  }

}

exports.OAuthCallbackError = OAuthCallbackError;