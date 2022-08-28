module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "2WjF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stripe; });
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("usZV");
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("kiQV");
var _package_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("kiQV", 1);


const stripe = new stripe__WEBPACK_IMPORTED_MODULE_0___default.a(process.env.STRIPE_API_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: 'Ignews',
    version: _package_json__WEBPACK_IMPORTED_MODULE_1__[/* version */ "a"]
  }
});

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("QeBL");


/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "FctI":
/***/ (function(module, exports) {

module.exports = require("next-auth/client");

/***/ }),

/***/ "QeBL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ Home; });
__webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return /* binding */ getStaticProps; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: ./src/pages/home.module.scss
var home_module = __webpack_require__("pYeR");
var home_module_default = /*#__PURE__*/__webpack_require__.n(home_module);

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: external "next-auth/client"
var client_ = __webpack_require__("FctI");

// EXTERNAL MODULE: ./src/components/SubscribeButton/styles.module.scss
var styles_module = __webpack_require__("TRtK");
var styles_module_default = /*#__PURE__*/__webpack_require__.n(styles_module);

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./src/services/api.ts

const api = external_axios_default.a.create({
  baseURL: 'http://localhost:3000/api'
});
// EXTERNAL MODULE: external "@stripe/stripe-js"
var stripe_js_ = __webpack_require__("RkzC");

// CONCATENATED MODULE: ./src/services/stripe-js.ts

async function getStripeJs() {
  const stripeJs = await Object(stripe_js_["loadStripe"])(process.env.PUBLIC_STRIPE_KEY);
  return stripeJs;
}
// CONCATENATED MODULE: ./src/components/SubscribeButton/index.tsx





function SubscribeButton({
  priceId
}) {
  const [session] = Object(client_["useSession"])();

  async function handleSubscribe() {
    if (!session) {
      Object(client_["signIn"])('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const {
        sessionId
      } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({
        sessionId
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
    onClick: handleSubscribe,
    className: styles_module_default.a.subscribeButton,
    type: "button",
    children: "Subscribe Now"
  });
}
// EXTERNAL MODULE: ./src/services/stripe.ts
var services_stripe = __webpack_require__("2WjF");

// CONCATENATED MODULE: ./src/pages/index.tsx







function Home({
  product
}) {
  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(head_default.a, {
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("title", {
        children: "Home | Ig.News"
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("main", {
      className: home_module_default.a.contentContainer,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("section", {
        className: home_module_default.a.hero,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: "\uD83D\uDC4F Hey,welcome"
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("h1", {
          children: ["News about the ", /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
            children: "React"
          }), "world."]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
          children: ["Get access to all the publications ", /*#__PURE__*/Object(jsx_runtime_["jsx"])("br", {}), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
            children: ["for ", product.amount, " month"]
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(SubscribeButton, {
          priceId: product.priceId
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: "/images/avatar.svg",
        alt: ""
      })]
    })]
  });
}
const getStaticProps = async () => {
  const price = await services_stripe["a" /* stripe */].prices.retrieve('price_1IaAraC2DsI1dPYgrqw5jOn3', {});
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24 horas

  };
};

/***/ }),

/***/ "RkzC":
/***/ (function(module, exports) {

module.exports = require("@stripe/stripe-js");

/***/ }),

/***/ "TRtK":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"subscribeButton": "styles_subscribeButton__1uQAs"
};


/***/ }),

/***/ "kiQV":
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":\"0.1.0\"}");

/***/ }),

/***/ "pYeR":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"contentContainer": "home_contentContainer__21EWl",
	"hero": "home_hero__3Za5I"
};


/***/ }),

/***/ "usZV":
/***/ (function(module, exports) {

module.exports = require("stripe");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });