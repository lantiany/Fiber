/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/Component/index.js":
/*!**************************************!*\
  !*** ./src/react/Component/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reconciliation */ "./src/react/reconciliation/index.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(partialState) {
      (0,_reconciliation__WEBPACK_IMPORTED_MODULE_0__.scheduleUpdate)(this, partialState);
    }
  }]);

  return Component;
}();



/***/ }),

/***/ "./src/react/CreateElement/index.js":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    // true false null ???????????? react ????????????????????? html ???
    if (child !== true && child !== false && child !== null) {
      if (child instanceof Object) {
        // ???????????????????????? ???????????????????????? <span>aaa</span> ?????????babel??????????????? vDOM???
        result.push(child);
      } else {
        // ??????????????????????????????????????? vDOM ?????????
        result.push(createElement('text', {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    // ?????????????????????????????? children ????????? props ???
    props: Object.assign({
      children: childElements
    }, props) // children: childElements

  };
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.js":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDOMElement)
/* harmony export */ });
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === 'text') {
    // ????????????????????? createTextElement
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // ????????????????????? createElement
    newElement = document.createElement(virtualDOM.type);
    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__["default"])(newElement, virtualDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.js":
/*!********************************!*\
  !*** ./src/react/DOM/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": () => (/* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "updateNodeElement": () => (/* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.js");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.js");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.js":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateNodeElement)
/* harmony export */ });
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var newProps = virtualDOM.props || {};
  var oldProps = oldVirtualDOM.props || {};
  /**
   * ????????????????????????
   * ???????????????????????????????????????????????????
   * ????????????????????????????????? p ?????????????????? span ?????? div ????????????
   * ?????????????????? replaceChild ????????? text ??????????????????????????????
   */

  if (virtualDOM.type === 'text') {
    if (newProps.textContent !== oldProps.textContent) {
      // ????????????????????????????????? ??? ??????????????????????????? ?????????
      if (virtualDOM.parent.type !== oldVirtualDOM.parent.type) {
        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
      } else {
        // ?????????????????????????????? replace
        virtualDOM.parent.stateNode.replaceChild(document.createTextNode(newProps.textContent), oldVirtualDOM.stateNode);
      }
    }

    return;
  }

  Object.keys(newProps).forEach(function (propName) {
    // ??????????????? props ???????????????
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // ??????????????????????????? onClick => click
      if (propName.slice(0, 2) === 'on') {
        // ?????? ???????????? 'click'
        var eventName = propName.toLowerCase().slice(2); // ???????????????????????????

        newElement.addEventListener(eventName, newPropsValue); // addEventListener ????????????????????????
        // ???????????????????????????????????????????????????????????????????????????

        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        // ???????????????????????????????????? value ?????? checked
        // ?????? ele.value = xx ???????????????
        newElement[propName] = newPropsValue;
      } else if (propName !== 'children') {
        /**
         * children ?????? props ????????????children ???????????????????????????
         * ?????????????????? native ??????????????????????????????????????????
         */
        // ?????????????????? className ?????????????????? class
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue);
        } else {
          // ????????????????????? setAttribute ????????????
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });
  /**
   * ??????????????????????????????
   * ??????????????? virtualDOM???????????????????????????
   * ???????????????????????? newProps ????????????oldProps ?????????
   * ????????????????????????????????????????????????????????????
   * - ???????????????????????????????????? removeEventListener ?????????
   * - ???????????????????????????'??????'???removeAttribute ?????????
   */
  // ??????????????????????????????

  Object.keys(oldProps).forEach(function (propName) {
    var newPropsValue = newProps[propName];
    var oldPropsValue = oldProps[propName];

    if (!newPropsValue) {
      // ??????????????????
      if (propName.slice(0, 2) === 'on') {
        // ?????????????????????????????????????????????
        var eventName = propName.toLowerCase().slice(2);
        newElement.removeEventListener(eventName, oldPropsValue);
      } else if (propName !== 'children') {
        // ????????????????????? children ?????????
        newElement.removeAttribute(propName);
      }
    }
  });
}

/***/ }),

/***/ "./src/react/Misc/Arrayed/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/Arrayed/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (arg) {
  return Array.isArray(arg) ? arg : [arg];
});

/***/ }),

/***/ "./src/react/Misc/CreateReactInstance/index.js":
/*!*****************************************************!*\
  !*** ./src/react/Misc/CreateReactInstance/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createReactInstance = function createReactInstance(fiber) {
  var instance = null;

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props);
  } else {
    instance = fiber.type;
  }

  return instance;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReactInstance);

/***/ }),

/***/ "./src/react/Misc/CreateStateNode/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateStateNode/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM */ "./src/react/DOM/index.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/react/Misc/index.js");



var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    return (0,_DOM__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  } else {
    return (0,_index__WEBPACK_IMPORTED_MODULE_1__.createReactInstance)(fiber);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.js":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    push: function push(item) {
      return taskQueue.push(item);
    },
    pop: function pop() {
      return taskQueue.shift();
    },
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    }
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/GetRoot/index.js":
/*!*****************************************!*\
  !*** ./src/react/Misc/GetRoot/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var getRoot = function getRoot(instance) {
  var fiber = instance.__fiber;

  while (fiber.parent) {
    fiber = fiber.parent;
  }

  return fiber;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRoot);

/***/ }),

/***/ "./src/react/Misc/GetTag/index.js":
/*!****************************************!*\
  !*** ./src/react/Misc/GetTag/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Component */ "./src/react/Component/index.js");


var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  } else if (Object.getPrototypeOf(vdom.type) === _Component__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    return 'class_component';
  } else {
    return 'function_component';
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.js":
/*!*********************************!*\
  !*** ./src/react/Misc/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTaskQueue": () => (/* reexport safe */ _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrayed": () => (/* reexport safe */ _Arrayed__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "createStateNode": () => (/* reexport safe */ _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "getTag": () => (/* reexport safe */ _GetTag__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "createReactInstance": () => (/* reexport safe */ _CreateReactInstance__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "getRoot": () => (/* reexport safe */ _GetRoot__WEBPACK_IMPORTED_MODULE_5__["default"])
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue */ "./src/react/Misc/CreateTaskQueue/index.js");
/* harmony import */ var _Arrayed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arrayed */ "./src/react/Misc/Arrayed/index.js");
/* harmony import */ var _CreateStateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateStateNode */ "./src/react/Misc/CreateStateNode/index.js");
/* harmony import */ var _GetTag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GetTag */ "./src/react/Misc/GetTag/index.js");
/* harmony import */ var _CreateReactInstance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CreateReactInstance */ "./src/react/Misc/CreateReactInstance/index.js");
/* harmony import */ var _GetRoot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GetRoot */ "./src/react/Misc/GetRoot/index.js");







/***/ }),

/***/ "./src/react/index.js":
/*!****************************!*\
  !*** ./src/react/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement */ "./src/react/CreateElement/index.js");
/* harmony import */ var _reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component */ "./src/react/Component/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  createElement: _CreateElement__WEBPACK_IMPORTED_MODULE_0__["default"],
  render: _reconciliation__WEBPACK_IMPORTED_MODULE_1__.render,
  Component: _Component__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/react/reconciliation/index.js":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "scheduleUpdate": () => (/* binding */ scheduleUpdate)
/* harmony export */ });
/* harmony import */ var _Misc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc */ "./src/react/Misc/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DOM */ "./src/react/DOM/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * ????????????????????????????????????????????? fiber ??????
 * ????????????????????????????????? fiber ???????????????????????????????????????fiber???effects?????????
 */

var taskQueue = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
var subTask = null;
var pendingCommit = null;

var commitAllWork = function commitAllWork(fiber) {
  /**
   * ??????????????????????????????????????? effects ???
   * ?????????????????????????????????
   * ???????????? fiber ?????????????????? parent???sibling????????????
   * ????????????????????????????????????????????????????????????????????????????????????
   */
  fiber.effects.forEach(function (child) {
    if (child.tag === 'class_component') {
      // ??????????????? fiber ?????????????????????????????????????????????????????????
      child.stateNode.__fiber = child;
    }

    if (child.effectTag === 'delete') {
      child.parent.stateNode.removeChild(child.stateNode);
    } else if (child.effectTag === 'update') {
      if (child.type === child.alternate.type) {
        // ??????????????????
        (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.updateNodeElement)(child.stateNode, child, child.alternate);
      } else {
        // ??????????????????, ?????????????????????????????????????????????
        child.parent.stateNode.replaceChild(child.stateNode, child.alternate.stateNode);
      }
    } else if (child.effectTag === 'placement') {
      var _fiber = child;
      var parentFiber = child.parent;
      /**
       * ????????????child ??????????????????????????????????????????A
       * ????????????????????? <A/> ???????????????????????? A ????????? html ??????(host_component)
       * ????????????????????????????????????????????????
       */

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (_fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(child.stateNode);
      }
    }
  });
  /**
   * ???????????? fiber
   */

  fiber.stateNode.__rootFiberContainer = fiber;
  console.log(fiber);
};

var getFirstTask = function getFirstTask() {
  // ????????????
  var task = taskQueue.pop();

  if (task.from === 'class_component') {
    // task.instance.__fiber
    var root = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getRoot)(task.instance);
    console.log(root);
    task.instance.__fiber.partialState = task.partialState;
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: 'host_root',
      effects: [],
      child: null,
      alternate: root
    };
  } // ???????????????????????? fiber ??????


  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  };
};
/**
 * fiber ????????????????????????
 * - ???????????????????????????
 * - ???????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????
 *
 */


var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children ???????????????????????????
   * ???????????????????????????????????????
   */
  var arrayedChildren = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.arrayed)(children);
  var index = 0;
  var numberOfElements = arrayedChildren.length;
  var newFiber = null;
  var prevFiber = null;
  var element = null;
  var alternate = null;
  /**
   * element ??? alternate ????????????????????????
   * ?????? fiber ?????? alternate??????????????? fiber ?????????
   */

  if (fiber.alternate && fiber.alternate.child) {
    // fiber ??? child ?????????????????????
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements || alternate) {
    element = arrayedChildren[index];

    if (!element && alternate) {
      alternate.effectTag = 'delete';
      fiber.effects.push(alternate);
    } else if (element && alternate) {
      // ??????
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'update',
        stateNode: null,
        parent: fiber,
        alternate: alternate
      };

      if (element.type === alternate.type) {
        // ???????????????????????????????????????
        // ??? alternate.stateNode
        newFiber.stateNode = alternate.stateNode;
      } else {
        // ??????????????????????????????????????????????????????????????????
        newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
      }
    } else if (element && !alternate) {
      // ????????????
      newFiber = {
        type: element.type,
        props: element.props,
        tag: (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
        effects: [],
        effectTag: 'placement',
        stateNode: null,
        parent: fiber
      };
      newFiber.stateNode = (0,_Misc__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);
    } // ??? fiber ????????????????????????????????????????????????????????????????????????????????????????????????????????????


    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;
    index++;
  }
};

var executeTask = function executeTask(fiber) {
  /**
   * ???????????? fiber ??????
   */
  if (fiber.tag === 'class_component') {
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = _objectSpread(_objectSpread({}, fiber.stateNode.state), fiber.state.__fiber.partialState);
    }

    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }
  /**
   * ?????????????????????????????????
   * ????????????????????????????????????????????????????????????
   */


  if (fiber.child) {
    return fiber.child;
  }

  var currentExecutingFiber = fiber;

  while (currentExecutingFiber.parent) {
    /**
     * ???????????????????????????????????????
     * ????????????????????? fiber ???????????????????????????????????? effects ?????????
     * ?????????????????????????????????????????? effects ???????????????????????? fiber
     */
    currentExecutingFiber.parent.effects = currentExecutingFiber.parent.effects.concat(currentExecutingFiber.effects.concat([currentExecutingFiber]));
    /**
     * ????????????????????????????????????
     * ????????????????????????
     */

    if (currentExecutingFiber.sibling) {
      return currentExecutingFiber.sibling;
    } // ???????????????????????????????????????????????????


    currentExecutingFiber = currentExecutingFiber.parent;
  }

  pendingCommit = currentExecutingFiber;
};

var workLoop = function workLoop(deadline) {
  /**
   * ???????????????????????????????????????
   */
  if (!subTask) {
    subTask = getFirstTask();
  }
  /**
   * ????????????????????????????????????
   * ?????? executeTask ??????
   */


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};

var performTask = function performTask(deadline) {
  // ????????????
  workLoop(deadline); // ??????????????????????????????????????????????????????????????????
  // ???????????????????????????????????????????????????

  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};

var render = function render(element, dom) {
  /**
   * 1?????????????????????????????????
   * 2??????????????????????????????????????????
   *
   * ??????????????? vdom ?????? fiber ??????
   */
  taskQueue.push({
    dom: dom,
    props: {
      children: element
    }
  });
  requestIdleCallback(performTask);
};
var scheduleUpdate = function scheduleUpdate(instance, partialState) {
  taskQueue.push({
    from: 'class_component',
    instance: instance,
    partialState: partialState
  });
  requestIdleCallback(performTask);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react */ "./src/react/index.js");
/* harmony import */ var _react_reconciliation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./react/reconciliation */ "./src/react/reconciliation/index.js");
/* harmony import */ var _react_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./react/Component */ "./src/react/Component/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var root = document.getElementById('root');
var jsx = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
  style: "color: red"
}, "\u2665")));
var jsx2 = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Hello React Fiber"), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Fiber 111"))); // render(jsx, root)

var Greeting = /*#__PURE__*/function (_Component) {
  _inherits(Greeting, _Component);

  var _super = _createSuper(Greeting);

  function Greeting(props) {
    var _this;

    _classCallCheck(this, Greeting);

    _this = _super.call(this, props);
    _this.state = {
      name: 'zs'
    };
    return _this;
  }

  _createClass(Greeting, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, this.props.title, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, " ", this.state.name), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return _this2.setState({
            name: 'ls'
          });
        }
      }, "\u70B9\u6211\u4FEE\u6539\u72B6\u6001"));
    }
  }]);

  return Greeting;
}(_react_Component__WEBPACK_IMPORTED_MODULE_2__["default"]);

(0,_react_reconciliation__WEBPACK_IMPORTED_MODULE_1__.render)( /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(Greeting, {
  title: "\u5965\u529B\u7ED9"
}), root);

function FunctionComponent(props) {
  return /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, props.title, ", FunctionComponent");
} // render(<FunctionComponent title="Hello"/>, root)
// render(jsx, root)
// setTimeout(() => {
//     render(jsx2, root)
// }, 2000)
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map