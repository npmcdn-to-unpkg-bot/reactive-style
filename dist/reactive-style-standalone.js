(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Style"] = factory(require("React"));
	else
		root["Style"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
	                                                                                                                                                                                                                                                                   * Copyright 2016-present, Joshua Robinson
	                                                                                                                                                                                                                                                                   * All rights reserved.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license.
	                                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                                   */

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactLibAdler = __webpack_require__(1);

	var _reactLibAdler2 = _interopRequireDefault(_reactLibAdler);

	var _reactLibEscapeTextContentForBrowser = __webpack_require__(2);

	var _reactLibEscapeTextContentForBrowser2 = _interopRequireDefault(_reactLibEscapeTextContentForBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __DEV__ = ("production") !== 'production';

	var Style = function Style(props) {

	  // Support functional and JSX syntax
	  var children = void 0;
	  if (props instanceof Array) {
	    // Style([`.foo { color: red; }`, <div className="foo" />]);
	    children = props;
	  } else {
	    // <Style> `.foo { color: red; }` <div className="foo" /> </Style>
	    children = props.children;
	  }

	  // If nothing to operate on, is empty; exit
	  if (!children) return _react2.default.createElement('style', { type: 'text/css' });

	  var styleString = void 0; // Filter styleString out
	  var rootChild = void 0; // Filter rootChild out
	  if (children instanceof Array) {
	    styleString = children.filter(function (child) {
	      return !isComponent(child);
	    });
	    rootChild = children.filter(function (child) {
	      return isComponent(child);
	    });

	    if (__DEV__) {
	      if (rootChild.length > 1) {
	        throw new Error('Adjacent JSX elements must be wrapped in an enclosing tag (' + rootChild.length + ' root elements detected): ' + stringify(rootChild));
	      }

	      if (styleString.length > 1) {
	        throw new Error('Multiple style objects as direct descedents of a ' + 'Style component are not supported (' + styleString.length + ' style objects detected): \n\n' + stringify(styleString));
	      }
	    }

	    // Remove from array; there should be only 1 of each
	    rootChild = rootChild[0];
	    styleString = styleString[0];

	    if (__DEV__) {
	      if (isVoidElement(rootChild.type)) {
	        throw new Error('Self-closing void elements like ' + rootChild.type + ' must be wrapped ' + 'in an enclosing tag. Reactive Style must be able to nest a style element ' + 'inside of the root element and void element content models never allow' + 'it to have contents under any circumstances.');
	      }
	    }

	    // Must be only child; determine if only child a style object
	  } else if (!isComponent(children)) {
	      styleString = children;
	      rootChild = null; // Implies no scoping and global styling
	    } else {
	        rootChild = children;
	      }

	  // Based on filter results do something
	  if (!styleString && rootChild) {
	    // Passthrough; no style actions
	    return (0, _react.cloneElement)(rootChild, _extends({}, rootChild.props), [_react2.default.createElement('style', { type: 'text/css', key: '_scoped-' })].concat(rootChild.props.children));
	  } else if (styleString && !rootChild) {
	    // Global styling with no scoping
	    var processedStyleString = processStyleString(styleString);

	    return _react2.default.createElement('style', { type: 'text/css', dangerouslySetInnerHTML: {
	        __html: processedStyleString
	      } });
	  } else {
	    //if (styleString && rootChild) Typical scenario style tree of elements

	    // Add uniqueness to component scoping hash by aggregating the component tree
	    // into an array and JSON.stringify'ing it; most components are unique at the
	    // leaf level where unique data specific to that branch exists (like the
	    // text in a list). To generate as much uniqueness as possible, prop/values
	    // are collected from the entire tree; self-references are excluded (these
	    // would break JSON stringify). Additionally users can add a "salt" to an
	    // object to add additional uniqueness.
	    var styleStringPepper = stringify(rootChild);

	    var scopedClassName = scoped(styleString + styleStringPepper);

	    // Collect all root selectors so we can transform any root selector
	    // in the styleString to a union selector (.e.g., .root => ._scoped-123.root)
	    var rootSelectors = [];
	    if (rootChild.props.id) rootSelectors.push('#' + rootChild.props.id);
	    if (rootChild.props.className) {
	      var classNames = rootChild.props.className.trim().replace(/  +/g, ' ') // Replace multiple whitespaces with single
	      .split(' ').map(function (thisClassName) {
	        return '.' + thisClassName;
	      });
	      rootSelectors = rootSelectors.concat(classNames);
	    }
	    if (!rootSelectors.length) {
	      rootSelectors.push(rootChild.type);
	    }

	    var _processedStyleString = processStyleString(styleString, '.' + scopedClassName, rootSelectors);

	    var styleEl = _react2.default.createElement('style', { type: 'text/css', key: scopedClassName,
	      dangerouslySetInnerHTML: { __html: _processedStyleString } });

	    // New className that includes scope
	    var newClassName = void 0;
	    if (rootChild.props.className) {
	      newClassName = rootChild.props.className + ' ' + scopedClassName;
	    } else {
	      newClassName = scopedClassName;
	    }

	    // To avoid destructuring add className second time; will override the
	    // className declared through ...rootChild.props;
	    return (0, _react.cloneElement)(rootChild, _extends({}, rootChild.props, { className: newClassName }), [styleEl].concat(rootChild.props.children));
	  }
	};

	/**
	* Scopes a selector with a given scoping class name as a union or contains selector
	*
	*    > proccessStyleString( '.foo { color: red; } .bar { color: green; }', '_scoped-1234, ['.root', '.foo']  )
	*    ".scoped-1234.foo { color: red; } .scoped-1234 .bar { color: green; }"
	*
	* @param {string} styleString String of style rules
	* @param {string} scopedClassName Class name used to create a unique scope
	* @param {array} rootSelectors Array of selectors on the root element; ids and classNames
	* @return {!string} Scoped style rule string
	*/
	var processStyleString = function processStyleString(styleString, scopedClassName, rootSelectors) {
	  // TODO: Look into using memoizeStringOnly from fbjs/lib for escaped strings;
	  // can avoid much of the computation as long as scoped doesn't come into play
	  // which would be unique

	  // TODO: If dev lint and provide feedback
	  // if linting fails we need to error out because
	  // the style string will not be parsed correctly
	  return styleString.replace(/\s*\/\/(?![^\(]*\)).*/g, '') // Strip javascript style comments
	  .replace(/\s\s+/g, ' ') // Convert multiple to single whitespace
	  .split('}') // Start breaking down statements
	  .map(function (fragment) {
	    var isDeclarationBodyPattern = /.*:.*;/g;
	    var isAtRulePattern = /\s*@/g;
	    var isKeyframeOffsetPattern = /\s*(([0-9][0-9]?|100)\s*%)|\s*(to|from)\s*$/g;
	    // const isContent
	    // Split fragment into selector and declarationBody; escape declaration body
	    return fragment.split('{').map(function (statement) {
	      // Avoid processing whitespace
	      if (!statement.trim().length) {
	        return;
	      }

	      // Skip escaping selectors statements since that would break them;
	      // note in docs that selector statements are not escaped and should
	      // not be generated from user provided strings
	      if (statement.match(isDeclarationBodyPattern)) {
	        return (0, _reactLibEscapeTextContentForBrowser2.default)(statement // Have to deal with special case of CSS property "content", breaks without quotes
	        .replace(/lsquo|rsquo/g, '') // Prevent manipulation
	        .replace(/content\s*:\s*['"](.*)['"]\s*;/, 'content: lsquo;$1rsquo;;') // "Entify" content property
	        .replace(/['"]/g, '') // Remove single and double quotes
	        ).replace(/lsquo;|rsquo;/g, "'") // De-"entify" content property
	        .replace(/;/g, ';\n'); // Add formatting;
	      } else {
	          // Statement is a selector
	          var selector = statement;

	          if (scopedClassName) {
	            // Prefix the scope to the selector if it is not an at-rule
	            if (!selector.match(isAtRulePattern) && !selector.match(isKeyframeOffsetPattern)) {
	              return scopeSelector(scopedClassName, selector, rootSelectors);
	            } else {
	              // Is at-rule or keyframe offset and should not be scoped
	              return selector;
	            }
	          } else {
	            // No scope; do nothing to the selector
	            return selector;
	          }
	        }

	      // Pretty print in dev
	    }).join('{\n');
	  }).join('}\n');
	};

	/**
	 * Scopes a selector with a given scoping className as a union or contains selector
	 *
	 *    > scopeSelector( '_scoped-1827481', '.root', ['.root', '.foo']  )
	 *    ".scoped-1827481.root"
	 *
	 * @param {string} scopedClassName Class name used to scope selectors
	 * @param {string} selector Selector to scope
	 * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
	 * @return {!string} Union or contains selector scoped with the scoping className
	 */
	var scopeSelector = function scopeSelector(scopedClassName, selector, rootSelectors) {
	  var scopedSelector = '';

	  // Matches comma-delimiters in multi-selectors (".fooClass, .barClass {...}" => "," );
	  // ignores commas-delimiters inside of brackets and parenthesis ([attr=value], :not()..)
	  var groupOfSelectorsPattern = /,(?![^\(|\[]*\)|\])/g;

	  var selectors = selector.split(groupOfSelectorsPattern);

	  var containsSelector = void 0; // [data-scoped="54321"] .someClass
	  var unionSelector = void 0; // [data-scoped="54321"].someClass (account for root)
	  for (var i = 0; i < selectors.length; i++) {
	    if (rootSelectors.length && rootSelectors.some(function (rootSelector) {
	      return selector.match(rootSelector);
	    })) {
	      unionSelector = selectors[i];

	      // Can't just add them together because of selector combinator complexity
	      // like '.rootClassName.someClass.otherClass > *' or :not('.rootClassName'),
	      // replace must be used

	      // Escape valid CSS special characters that are also RegExp special characters
	      var escapedRootSelectors = rootSelectors.map(function (rootSelector) {
	        return rootSelector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	      });

	      unionSelector = unionSelector.replace(new RegExp('(' + // Start capture group
	      escapedRootSelectors.join('|') + // Match any one root selector
	      ')' // End capture group
	      ), '$1' + scopedClassName // Combine any one root selector match with scoping class
	      );

	      //'.bar.foo'.replace(/(.bar|.too)/, '$1' + '._scoped-1')

	      // Do both union and contains selectors because of case <div><div></div></div>
	      // or <div className="foo"><div className="foo"></div></div>
	      containsSelector = scopedClassName + ' ' + selectors[i];

	      scopedSelector += unionSelector + ', ' + containsSelector;
	    } else {
	      containsSelector = scopedClassName + ' ' + selectors[i];
	      scopedSelector += containsSelector;
	    }
	  }

	  return scopedSelector;
	};

	/**
	 * Creates a className used as a CSS scope by generating a checksum from a styleString
	 *
	 *    > scoped( 'footer { color: red; }' )
	 *    "_scoped-182938591"
	 *
	 * @param {string} String of style rules
	 * @return {!string} A scoping class name
	 */
	var scoped = function scoped(styleString) {
	  return '_scoped-' + (0, _reactLibAdler2.default)(styleString);
	};

	/**
	 * Checks if object is a React component
	 *
	 *    > isComponent( "this is a string not a component" )
	 *    "false"
	 *
	 * @param {*} object Object to inspect for ReactDOMComponent properties
	 * @return {!bool} bool True or false
	 */
	var isComponent = function isComponent(object) {
	  var bool = void 0;
	  if (object instanceof Array && object.length) {
	    bool = object.some(function (item) {
	      return item.hasOwnProperty('_owner');
	    });
	  } else {
	    bool = object.hasOwnProperty('_owner');
	  }
	  return bool;
	};

	/**
	* Flattens a component tree into an array; removes all circular references and
	* JSON stringifies. Adds uniqueness to checksums using data from
	* the component tree
	*
	*    > stringifyComponent( ReactDOMComponent )
	*    "[{...ReactDOMComponent}, {...ReactDOMComponent}, ...]"
	*
	* @param {ReactDOMComponent} component
	* @return {!string} Flattened JSON stringified component tree with no circular references
	*/

	var stringify = function stringify(component) {
	  var toFlatten = [component];
	  var toDereference = [];

	  while (toFlatten.length) {
	    var thisComponent = toFlatten.splice(0, 1)[0];
	    if (thisComponent.props && thisComponent.props.children) {
	      toFlatten = toFlatten.concat(thisComponent.props.children);
	    }

	    toDereference.push(thisComponent);
	  }

	  return JSON.stringify(toDereference.map(function (item) {
	    if (isComponent(item)) {
	      var newComponent = { props: {} };
	      var blacklistedKeys = ['_owner', 'props', 'children'];

	      var _loop = function _loop(key) {
	        if (!item.hasOwnProperty(key) || blacklistedKeys.some(function (blacklistedKey) {
	          return blacklistedKey === key;
	        })) {
	          return 'continue';
	        }

	        newComponent[key] = item[key];
	      };

	      for (var key in item) {
	        var _ret = _loop(key);

	        if (_ret === 'continue') continue;
	      }

	      var _loop2 = function _loop2(_key) {
	        if (!item['props'].hasOwnProperty(_key) || blacklistedKeys.some(function (blacklistedKey) {
	          return blacklistedKey === _key;
	        })) {
	          return 'continue';
	        }
	        newComponent['props'][_key] = item['props'][_key];
	      };

	      for (var _key in item['props']) {
	        var _ret2 = _loop2(_key);

	        if (_ret2 === 'continue') continue;
	      }

	      return newComponent;
	    } else {
	      return item;
	    }
	  }));
	};

	/**
	 * Checks if a tag type is a self-closing void element
	 *
	 *    > isVoidElement( "img" )
	 *    "true"
	 *
	 * @param {*} string Element type to check
	 * @return {!bool} bool True or false
	 */
	var isVoidElement = function isVoidElement(type) {
	  return ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'].some(function (voidType) {
	    return type === voidType;
	  });
	};

	module.exports = Style;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule adler32
	 */

	'use strict';

	var MOD = 65521;

	// adler32 is not cryptographically strong, and is only used to sanity check that
	// markup generated on the server matches the markup generated on the client.
	// This implementation (a modified version of the SheetJS version) has been optimized
	// for our use case, at the expense of conforming to the adler32 specification
	// for non-ascii inputs.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  var i = 0;
	  var l = data.length;
	  var m = l & ~0x3;
	  while (i < m) {
	    var n = Math.min(i + 4096, m);
	    for (; i < n; i += 4) {
	      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
	    }
	    a %= MOD;
	    b %= MOD;
	  }
	  for (; i < l; i++) {
	    b += a += data.charCodeAt(i);
	  }
	  a %= MOD;
	  b %= MOD;
	  return a | b << 16;
	}

	module.exports = adler32;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule escapeTextContentForBrowser
	 */

	'use strict';

	var ESCAPE_LOOKUP = {
	  '&': '&amp;',
	  '>': '&gt;',
	  '<': '&lt;',
	  '"': '&quot;',
	  '\'': '&#x27;'
	};

	var ESCAPE_REGEX = /[&><"']/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextContentForBrowser;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;