/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var nodeFactory = function nodeFactory() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var params = arguments[1];

  var node = document.createElement(type);

  appendClasses(node, params);
  appendAttrs(node, params);
  insertTextContent(node, params);

  return node;
};

function appendClasses(node, _ref) {
  var classList = _ref.classList;

  if (classList && classList.forEach) {
    classList.forEach(function (className) {
      return node.classList.add(className);
    });
  }
}

function appendAttrs(node, _ref2) {
  var attrs = _ref2.attrs;

  if (attrs) {
    var attrNames = Object.keys(attrs);
    attrNames.forEach(function (attrName) {
      return node.setAttribute(attrName, attrs[attrName]);
    });
  }
}

function insertTextContent(node, _ref3) {
  var _ref3$textContent = _ref3.textContent,
      textContent = _ref3$textContent === undefined ? "" : _ref3$textContent;

  node.textContent = textContent;
}

exports.default = nodeFactory;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pubsub = function () {

  var topics = {};

  return {
    subscribe: function subscribe(topic, listener) {
      if (!topics[topic]) topics[topic] = { queue: [] };

      var index = topics[topic].queue.push(listener) - 1;
      // function to delete topic
      return {
        remove: function remove() {
          delete topics[topic].queue[index];
        }
      };
    },

    publish: function publish(topic, info) {
      // no theme or no listeners
      if (!topics[topic] || !topics[topic].queue.length) return;

      var items = topics[topic].queue;
      items.forEach(function (item) {
        item(info || {});
      });
    }
  };
}();

exports.default = pubsub;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _state = __webpack_require__(14);

var _state2 = _interopRequireDefault(_state);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INITIAL_STATE_NAME = 'Состояние модели';
var STOP_STATE_NAME = 'Обучение остановлено';

var Model = function () {
  function Model(data) {
    _classCallCheck(this, Model);

    this.id = data.id;
    this.name = data.name;
    this.breakTime = data.breakTime;
    this.steps = data.steps;

    this.states = data.states.map(function (state) {
      return new _state2.default(state);
    });
    this.initialState = data.initialState;
    this.currentState = this.getState(this.initialState);

    this.timeout = null;
    this.subInput = null;
    this.subStop = null;
    this.startState = new _state2.default({ id: 0, name: INITIAL_STATE_NAME, img: 'img/start.png', last: true });
    this.stopState = new _state2.default({ id: -1, name: STOP_STATE_NAME, img: 'img/stop.png', last: true });
  }

  _createClass(Model, [{
    key: 'getState',
    value: function getState(id) {
      return this.states.find(function (state) {
        return state.id == id;
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      this.currentState = this.getState(this.initialState);
      _pubsub2.default.publish('new_state', this.currentState);
      var intervals = Promise.resolve(); // init promise chain
      for (var i = 0; i < this.steps; i++) {
        intervals = intervals.then(function () {
          return _this.makeBreak();
        }).then(function () {
          return _this.handleEvent();
        }).then(function (state) {
          _this.handleNewState(state);
        });
      }
      intervals.catch(function (state) {
        return _this.handleNewState(state);
      });
      return intervals;
    }
  }, {
    key: 'makeBreak',
    value: function makeBreak() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.subStop = _pubsub2.default.subscribe('model_stop', function () {
          reject(_this2.stopState);
        });
        setTimeout(function () {
          _this2.clearSubs();
          resolve();
        }, _this2.breakTime);
      });
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent() {
      var _this3 = this;

      var event = this.currentState.event;
      var eventStartTime = Date.now();
      return new Promise(function (resolve, reject) {
        // send data about new event to other modules
        _pubsub2.default.publish('event', event);

        // listen to user action
        // and if user input correct go to next state
        _this3.subInput = _pubsub2.default.subscribe('user_input', function (data) {
          var timeSpent = Date.now() - eventStartTime;
          var nextStateId = _this3.currentState.handleInput(data, timeSpent);
          var nextState = _this3.getState(nextStateId);
          if (nextState) {
            nextState.last ? reject(nextState) : resolve(nextState);
          }
        });

        _this3.subStop = _pubsub2.default.subscribe('model_stop', function () {
          reject(_this3.stopState);
        });

        // handle inactive
        var inactiveTime = _this3.currentState.getInactiveTime();
        _this3.timeout = setTimeout(function () {
          var nextStateId = _this3.currentState.getInactiveAction().nextState;
          var nextState = _this3.getState(nextStateId);
          nextState.last ? reject(nextState) : resolve(nextState);
        }, inactiveTime);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      _pubsub2.default.publish('model_stop');
    }
  }, {
    key: 'handleNewState',
    value: function handleNewState(state) {
      this.currentState = state;
      clearTimeout(this.timeout);
      this.clearSubs();
      _pubsub2.default.publish('new_state', state);
    }
  }, {
    key: 'clearSubs',
    value: function clearSubs() {
      if (this.subInput) {
        this.subInput.remove();
      }
      if (this.subStop) {
        this.subStop.remove();
      }
    }
  }]);

  return Model;
}();

exports.default = Model;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _state = __webpack_require__(15);

var _state2 = _interopRequireDefault(_state);

var _tools = __webpack_require__(16);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _exports = {};

// Scene metadata
var $modelName = document.querySelector('.model-name');
_exports.init = function (model, response) {
  $modelName.textContent = model.name;
  _state2.default.set(model.startState);
  _tools2.default.init(response.tools);
  return this;
};

// Manage content visibility
var $content = document.querySelector('.content');
_exports.showContent = function () {
  setContentDisplay('flex');
  return this;
};
_exports.hideContent = function () {
  setContentDisplay('none');
  return this;
};
function setContentDisplay(display) {
  $content.style.display = display;
}

// Manage buttons state
_exports.enableButtons = function () {
  for (var _len = arguments.length, buttons = Array(_len), _key = 0; _key < _len; _key++) {
    buttons[_key] = arguments[_key];
  }

  setButtonsState(buttons, false);
  return this;
};
_exports.disableButtons = function () {
  for (var _len2 = arguments.length, buttons = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    buttons[_key2] = arguments[_key2];
  }

  setButtonsState(buttons, true);
  return this;
};
function setButtonsState(buttons, value) {
  buttons.forEach(function (button) {
    return button.disabled = value;
  });
}

// Delegate public methods to components
_exports.getToolsData = function () {
  return _tools2.default.getToolsData();
};

_exports.setState = function (stateData) {
  return _state2.default.set(stateData);
};

_exports.showEvent = function (eventData) {
  return _state2.default.showEvent(eventData);
};

_exports.hideEvent = function () {
  return _state2.default.hideEvent();
};

exports.default = _exports;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function ajax() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var xhr = new XMLHttpRequest();
  xhr.open(options.method || 'GET', path, true);
  if (options.headers) {
    setXHRHeaders(xhr, options.headers);
  }
  xhr.send(options.data);

  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
  });
}

function setXHRHeaders(xhr, headers) {
  for (var header in headers) {
    xhr.setRequestHeader(header, headers[headers]);
  }
}

exports.default = ajax;

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Action = function () {
  function Action(data) {
    _classCallCheck(this, Action);

    this.minTime = data.minTime;
    this.maxTime = data.maxTime;
    this.nextState = data.nextState;
    if (data.inactive) {
      this.inactive = true;
      this.tools = [];
    } else {
      this.inactive = false;
      this.tools = this.initTools(data.tools);
    }
  }

  /**
   * @param [{ id: Number, value: Number/Boolean }, {...}]
   * @param Number
   * @return Boolean
   */


  _createClass(Action, [{
    key: 'isSuitable',
    value: function isSuitable(data, time) {
      return this.rightTime(time) && this.rightData(data);
    }
  }, {
    key: 'rightData',
    value: function rightData() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return this.tools.every(function (tool) {
        // Если среди полученных итемов нет, того который есть в данном экшене
        var checkTool = data.find(function (obj) {
          return obj.id == tool.id;
        });
        if (!checkTool) {
          return false;
        }

        if (tool.type === 'switch') {
          return checkTool.value === tool.boolValue;
        }

        if (tool.type === 'range') {
          return _this.includesValue(checkTool.value, [tool.minValue, tool.maxValue]);
        }

        return false;
      });
    }
  }, {
    key: 'includesValue',
    value: function includesValue(value, borders) {
      if (typeof value !== 'number') throw new TypeError('Value should be integer');
      return value >= borders[0] && value <= borders[1];
    }
  }, {
    key: 'rightTime',
    value: function rightTime(time) {
      if (typeof time !== 'number') throw new TypeError('Time should be integer (ms)');
      return time >= this.minTime && time <= this.maxTime;
    }
  }, {
    key: 'initTools',
    value: function initTools(tools) {
      return tools.map(function (tool) {
        return {
          id: tool.id,
          type: tool.type,
          minValue: tool.ActionTool.minValue,
          maxValue: tool.ActionTool.maxValue,
          boolValue: tool.ActionTool.boolValue
        };
      });
    }
  }]);

  return Action;
}();

exports.default = Action;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function Event(data) {
  _classCallCheck(this, Event);

  this.id = data.id;
  this.name = data.name;
  this.description = data.description;
};

exports.default = Event;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event = __webpack_require__(13);

var _event2 = _interopRequireDefault(_event);

var _action = __webpack_require__(12);

var _action2 = _interopRequireDefault(_action);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State(data) {
    _classCallCheck(this, State);

    this.id = data.id;
    this.name = data.name;
    this.img = data.img;
    this.params = data.params;

    if (data.last) {
      this.last = true;
      this.event = null;
      this.actions = null;
    } else {
      this.event = new _event2.default(data.event);
      this.actions = data.actions.map(function (action) {
        return new _action2.default(action);
      });
      this.last = false;
    }
  }

  _createClass(State, [{
    key: 'getInactiveTime',
    value: function getInactiveTime() {
      var times = this.getAllActionTimes();
      return Math.max.apply(Math, _toConsumableArray(times));
    }
  }, {
    key: 'getInactiveAction',
    value: function getInactiveAction() {
      return this.actions.find(function (action) {
        return action.inactive === true;
      });
    }
  }, {
    key: 'getAllActionTimes',
    value: function getAllActionTimes() {
      return this.actions.map(function (action) {
        return action.maxTime || 0;
      });
    }
  }, {
    key: 'handleInput',
    value: function handleInput(data, time) {
      var suitedActions = this.actions.filter(function (action) {
        return action.isSuitable(data, time);
      });
      if (suitedActions.length > 0) {
        return suitedActions[0].nextState;
      }
      return null;
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

var _timer = __webpack_require__(18);

var _timer2 = _interopRequireDefault(_timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $name = document.querySelector('.model-state-name');
var $img = document.querySelector('.model-state-img');
var $params = document.querySelector('.model-params-values');

var $event = document.querySelector('.model-event');
var $eventHeader = $event.querySelector('.model-event-name span');
var $eventBody = $event.querySelector('.model-event-info');

var $timerContainer = document.querySelector('.model-timer');
$timerContainer.appendChild(_timer2.default.node);

function set(_ref) {
  var name = _ref.name,
      img = _ref.img,
      params = _ref.params;

  $name.textContent = name;
  $img.setAttribute('src', img);
  setParameters(params);
}

function setParameters() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var frag = document.createDocumentFragment();
  params.forEach(function (param) {
    return frag.appendChild(createParameteNode(param.name, param.value));
  });

  $params.innerHTML = "";
  $params.appendChild(frag);
}

function createParameteNode(key, value) {
  var div = (0, _nodeFactory2.default)('div', { classList: ['parameter'] });

  var keySpan = (0, _nodeFactory2.default)('span', { textContent: key });
  div.appendChild(keySpan);

  var valueSpan = (0, _nodeFactory2.default)('span', { textContent: value });
  div.appendChild(valueSpan);

  return div;
}

/** Sets event data to UI */
function showEvent(event) {
  $eventHeader.textContent = event.name;
  $eventBody.textContent = event.description;
  $event.classList.remove('is-hidden', 'slide-top');
  showTimer();
}
function hideEvent() {
  $event.classList.add('is-hidden', 'slide-top');
  hideTimer();
}

function showTimer() {
  $timerContainer.classList.remove('is-hidden');
  _timer2.default.start();
}
function hideTimer() {
  $timerContainer.classList.add('is-hidden');
  _timer2.default.stop();
}

exports.default = {
  set: set,
  showEvent: showEvent,
  hideEvent: hideEvent
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toolTypes = {
  RANGE: 'range',
  SWITCH: 'switch'
};
var $tools = document.querySelector('.tools-list');

function init(tools) {
  var fragment = document.createDocumentFragment();

  tools.forEach(function (tool) {
    // create tool wrapper
    var div = (0, _nodeFactory2.default)('div', { classList: ['tool'] });

    var label = (0, _nodeFactory2.default)('label', {
      classList: ['tool-name'],
      attrs: { "for": tool.name },
      textContent: tool.name
    });
    div.appendChild(label);

    var toolNode = createToolNode(tool);
    div.appendChild(toolNode);

    fragment.appendChild(div);
  });

  $tools.innerHTML = "";
  $tools.appendChild(fragment);
}

function createToolNode(tool) {
  switch (tool.type) {
    case toolTypes.RANGE:
      return createRangeTool(tool);
    case toolTypes.SWITCH:
      return createSwitchTool(tool);
    default:
      return 'Неизвестный прибор';
  }
}

function createRangeTool(tool) {
  var divInput = (0, _nodeFactory2.default)('div', { classList: ['range'] });

  var spanMin = (0, _nodeFactory2.default)('span', { textContent: tool.min });
  divInput.appendChild(spanMin);

  var input = (0, _nodeFactory2.default)('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'range',
      'name': tool.name,
      'type': 'range',
      'min': tool.min,
      'max': tool.max
    }
  });
  divInput.appendChild(input);

  var spanMax = (0, _nodeFactory2.default)('span', { textContent: tool.max });
  divInput.appendChild(spanMax);

  var divCurrent = (0, _nodeFactory2.default)('div', { classList: ['range-current-value'] });
  var spanCurrent = (0, _nodeFactory2.default)('span', { textContent: input.value });
  divCurrent.appendChild(spanCurrent);

  input.addEventListener('input', function (evt) {
    spanCurrent.textContent = evt.target.value;
  });

  var fragment = document.createDocumentFragment();
  fragment.appendChild(divInput);
  fragment.appendChild(divCurrent);

  return fragment;
}

function createSwitchTool(tool) {
  var label = (0, _nodeFactory2.default)('label', { classList: ['switch'] });

  var input = (0, _nodeFactory2.default)('input', {
    attrs: {
      'data-id': tool.id,
      'data-type': 'switch',
      'type': 'checkbox'
    }
  });
  label.appendChild(input);

  var div = (0, _nodeFactory2.default)('div', { classList: ['slider'] });
  label.appendChild(div);

  return label;
}

function getToolsData() {
  var toolsData = [];
  var inputs = $tools.querySelectorAll('input[data-id]');
  inputs.forEach(function (input) {
    var _input$dataset = input.dataset,
        id = _input$dataset.id,
        type = _input$dataset.type;

    var value = void 0;
    switch (type) {
      case toolTypes.RANGE:
        value = parseInt(input.value);break;
      case toolTypes.SWITCH:
        value = input.checked;break;
      default:
        throw new Error('\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u043F\u0440\u0438\u0431\u043E\u0440\u0430. ID: ' + id);
    }
    toolsData.push({ id: id, value: value });
  });
  return toolsData;
}

exports.default = {
  init: init,
  getToolsData: getToolsData
};

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFactory = __webpack_require__(0);

var _nodeFactory2 = _interopRequireDefault(_nodeFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function msToContent(ms) {
  var seconds = Math.round(ms / 1000);
  var mins = Math.floor(seconds / 60);
  var secondsLeft = seconds - mins * 60;

  return mins + ':' + (secondsLeft >= 10 ? '' : '0') + secondsLeft;
}

var timer = {
  startTime: null,
  interval: null,
  node: (0, _nodeFactory2.default)('span', { classList: ['timer'], textContent: '0:00' }),
  start: function start() {
    var _this = this;

    this.startTime = Date.now();
    this.interval = setInterval(function () {
      var elapsed = Date.now() - _this.startTime;
      _this.node.textContent = msToContent(elapsed);
    }, 1000);
  },
  stop: function stop() {
    if (!this.startTime) {
      return;
    }
    this.startTime = null;
    clearInterval(this.interval);
    this.node.textContent = '0:00';
  }
};

exports.default = timer;

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

var _ajax = __webpack_require__(5);

var _ajax2 = _interopRequireDefault(_ajax);

var _scene = __webpack_require__(4);

var _scene2 = _interopRequireDefault(_scene);

var _model = __webpack_require__(3);

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load model with given id
 */
function loadModel(id) {
  return (0, _ajax2.default)('/models/' + id).then(function (response) {
    return JSON.parse(response);
  });
}

/**
 * UI button's handlers
 */
var $select = document.querySelector("#model-select");
var $loadButton = document.querySelector('#load-model-btn');
var model = null;
$loadButton.addEventListener('click', function () {
  if (model) {
    model.stop();
  }
  var modelId = $select.value;
  loadModel(modelId).then(function (response) {
    model = new _model2.default(response);
    _scene2.default.init(model, response).showContent().enableButtons($startButton).disableButtons($stopButton, $runButton);
  }).catch(function (err) {
    console.error(err);
  });
});
//
var $startButton = document.querySelector('#start-btn');
$startButton.addEventListener('click', function () {
  model.start();
  _scene2.default.disableButtons($startButton);
  _scene2.default.enableButtons($stopButton, $runButton);
});

var $stopButton = document.querySelector('#stop-btn');
$stopButton.addEventListener('click', function () {
  model.stop();
  _scene2.default.enableButtons($startButton);
  _scene2.default.disableButtons($stopButton, $runButton);
});

var $runButton = document.querySelector('#run-btn');
$runButton.addEventListener('click', function () {
  var toolsData = _scene2.default.getToolsData();
  _pubsub2.default.publish('user_input', toolsData);
});

/**
 * Handle custom events here (user input, programm messages etc.)
 */
_pubsub2.default.subscribe('new_state', function (state) {
  _scene2.default.hideEvent();
  _scene2.default.setState(state);
});
_pubsub2.default.subscribe('event', function (event) {
  return _scene2.default.showEvent(event);
});

// /**
// * Timer (currently for dev mode only)
// */
// import timer from '../utils/timer';
// document.querySelector('.header').appendChild(timer.node);
// pubsub.subscribe('new_state', state => timer.stop());
// pubsub.subscribe('event', event => timer.start());

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjg3MzMyZGFiOTA2ZmRmOWQ5MDIiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvbm9kZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvcHVic3ViLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL3NjZW5lLmpzIiwid2VicGFjazovLy8uL3V0aWxzL2FqYXguanMiLCJ3ZWJwYWNrOi8vLy4uL3Nhc3MvbGVhcm5pbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9tb2RlbF9jb21wb25lbnRzL2V2ZW50LmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGVhcm5pbmcvc2NlbmVfY29tcG9uZW50cy9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwid2VicGFjazovLy8uL3V0aWxzL3RpbWVyLmpzIiwid2VicGFjazovLy8uL2xlYXJuaW5nL2luZGV4LmpzIl0sIm5hbWVzIjpbIm5vZGVGYWN0b3J5IiwidHlwZSIsInBhcmFtcyIsIm5vZGUiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDbGFzc2VzIiwiYXBwZW5kQXR0cnMiLCJpbnNlcnRUZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImZvckVhY2giLCJhZGQiLCJjbGFzc05hbWUiLCJhdHRycyIsImF0dHJOYW1lcyIsIk9iamVjdCIsImtleXMiLCJzZXRBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwicHVic3ViIiwidG9waWNzIiwic3Vic2NyaWJlIiwidG9waWMiLCJsaXN0ZW5lciIsInF1ZXVlIiwiaW5kZXgiLCJwdXNoIiwicmVtb3ZlIiwicHVibGlzaCIsImluZm8iLCJsZW5ndGgiLCJpdGVtcyIsIml0ZW0iLCJJTklUSUFMX1NUQVRFX05BTUUiLCJTVE9QX1NUQVRFX05BTUUiLCJNb2RlbCIsImRhdGEiLCJpZCIsIm5hbWUiLCJicmVha1RpbWUiLCJzdGVwcyIsInN0YXRlcyIsIm1hcCIsInN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY3VycmVudFN0YXRlIiwiZ2V0U3RhdGUiLCJ0aW1lb3V0Iiwic3ViSW5wdXQiLCJzdWJTdG9wIiwic3RhcnRTdGF0ZSIsImltZyIsImxhc3QiLCJzdG9wU3RhdGUiLCJmaW5kIiwiaW50ZXJ2YWxzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGhlbiIsIm1ha2VCcmVhayIsImhhbmRsZUV2ZW50IiwiaGFuZGxlTmV3U3RhdGUiLCJjYXRjaCIsInJlamVjdCIsInNldFRpbWVvdXQiLCJjbGVhclN1YnMiLCJldmVudCIsImV2ZW50U3RhcnRUaW1lIiwiRGF0ZSIsIm5vdyIsInRpbWVTcGVudCIsIm5leHRTdGF0ZUlkIiwiaGFuZGxlSW5wdXQiLCJuZXh0U3RhdGUiLCJpbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZVRpbWUiLCJnZXRJbmFjdGl2ZUFjdGlvbiIsImNsZWFyVGltZW91dCIsImV4cG9ydHMiLCIkbW9kZWxOYW1lIiwicXVlcnlTZWxlY3RvciIsImluaXQiLCJtb2RlbCIsInJlc3BvbnNlIiwic2V0IiwidG9vbHMiLCIkY29udGVudCIsInNob3dDb250ZW50Iiwic2V0Q29udGVudERpc3BsYXkiLCJoaWRlQ29udGVudCIsImRpc3BsYXkiLCJzdHlsZSIsImVuYWJsZUJ1dHRvbnMiLCJidXR0b25zIiwic2V0QnV0dG9uc1N0YXRlIiwiZGlzYWJsZUJ1dHRvbnMiLCJ2YWx1ZSIsImJ1dHRvbiIsImRpc2FibGVkIiwiZ2V0VG9vbHNEYXRhIiwic2V0U3RhdGUiLCJzdGF0ZURhdGEiLCJzaG93RXZlbnQiLCJldmVudERhdGEiLCJoaWRlRXZlbnQiLCJhamF4IiwicGF0aCIsIm9wdGlvbnMiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0WEhSSGVhZGVycyIsInNlbmQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic3RhdHVzVGV4dCIsImhlYWRlciIsInNldFJlcXVlc3RIZWFkZXIiLCJBY3Rpb24iLCJtaW5UaW1lIiwibWF4VGltZSIsImluYWN0aXZlIiwiaW5pdFRvb2xzIiwidGltZSIsInJpZ2h0VGltZSIsInJpZ2h0RGF0YSIsImV2ZXJ5IiwiY2hlY2tUb29sIiwib2JqIiwidG9vbCIsImJvb2xWYWx1ZSIsImluY2x1ZGVzVmFsdWUiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiYm9yZGVycyIsIlR5cGVFcnJvciIsIkFjdGlvblRvb2wiLCJFdmVudCIsImRlc2NyaXB0aW9uIiwiU3RhdGUiLCJhY3Rpb25zIiwiYWN0aW9uIiwidGltZXMiLCJnZXRBbGxBY3Rpb25UaW1lcyIsIk1hdGgiLCJtYXgiLCJzdWl0ZWRBY3Rpb25zIiwiZmlsdGVyIiwiaXNTdWl0YWJsZSIsIiRuYW1lIiwiJGltZyIsIiRwYXJhbXMiLCIkZXZlbnQiLCIkZXZlbnRIZWFkZXIiLCIkZXZlbnRCb2R5IiwiJHRpbWVyQ29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJzZXRQYXJhbWV0ZXJzIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVQYXJhbWV0ZU5vZGUiLCJwYXJhbSIsImlubmVySFRNTCIsImtleSIsImRpdiIsImtleVNwYW4iLCJ2YWx1ZVNwYW4iLCJzaG93VGltZXIiLCJoaWRlVGltZXIiLCJzdGFydCIsInN0b3AiLCJ0b29sVHlwZXMiLCJSQU5HRSIsIlNXSVRDSCIsIiR0b29scyIsImZyYWdtZW50IiwibGFiZWwiLCJ0b29sTm9kZSIsImNyZWF0ZVRvb2xOb2RlIiwiY3JlYXRlUmFuZ2VUb29sIiwiY3JlYXRlU3dpdGNoVG9vbCIsImRpdklucHV0Iiwic3Bhbk1pbiIsIm1pbiIsImlucHV0Iiwic3Bhbk1heCIsImRpdkN1cnJlbnQiLCJzcGFuQ3VycmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJ0YXJnZXQiLCJ0b29sc0RhdGEiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGF0YXNldCIsInBhcnNlSW50IiwiY2hlY2tlZCIsIkVycm9yIiwibXNUb0NvbnRlbnQiLCJtcyIsInNlY29uZHMiLCJyb3VuZCIsIm1pbnMiLCJmbG9vciIsInNlY29uZHNMZWZ0IiwidGltZXIiLCJzdGFydFRpbWUiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwiZWxhcHNlZCIsImNsZWFySW50ZXJ2YWwiLCJsb2FkTW9kZWwiLCJKU09OIiwicGFyc2UiLCIkc2VsZWN0IiwiJGxvYWRCdXR0b24iLCJtb2RlbElkIiwiJHN0YXJ0QnV0dG9uIiwiJHN0b3BCdXR0b24iLCIkcnVuQnV0dG9uIiwiY29uc29sZSIsImVycm9yIiwiZXJyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsR0FBK0I7QUFBQSxNQUF0QkMsSUFBc0IsdUVBQWYsS0FBZTtBQUFBLE1BQVJDLE1BQVE7O0FBQ2pELE1BQU1DLE9BQU9DLFNBQVNDLGFBQVQsQ0FB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QXJCO0FBQ0E2SSxhQUFhN0IsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsWUFBTTtBQUMzQzlHLFFBQU0yRixLQUFOO0FBQ0Esa0JBQU05RSxjQUFOLENBQXFCOEgsWUFBckI7QUFDQSxrQkFBTWpJLGFBQU4sQ0FBb0JrSSxXQUFwQixFQUFpQ0MsVUFBakM7QUFDRCxDQUpEOztBQU1BLElBQU1ELGNBQWM1TixTQUFTOEUsYUFBVCxDQUF1QixXQUF2QixDQUFwQjtBQUNBOEksWUFBWTlCLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFlBQU07QUFDMUM5RyxRQUFNNEYsSUFBTjtBQUNBLGtCQUFNbEYsYUFBTixDQUFvQmlJLFlBQXBCO0FBQ0Esa0JBQU05SCxjQUFOLENBQXFCK0gsV0FBckIsRUFBa0NDLFVBQWxDO0FBQ0QsQ0FKRDs7QUFNQSxJQUFNQSxhQUFhN04sU0FBUzhFLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBbkI7QUFDQStJLFdBQVcvQixnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxZQUFNO0FBQ3pDLE1BQU1HLFlBQVksZ0JBQU1oRyxZQUFOLEVBQWxCO0FBQ0EsbUJBQU94RSxPQUFQLENBQWUsWUFBZixFQUE2QndLLFNBQTdCO0FBQ0QsQ0FIRDs7QUFLQTs7O0FBR0EsaUJBQU8vSyxTQUFQLENBQWlCLFdBQWpCLEVBQThCLGlCQUFTO0FBQ3JDLGtCQUFNb0YsU0FBTjtBQUNBLGtCQUFNSixRQUFOLENBQWUxRCxLQUFmO0FBQ0QsQ0FIRDtBQUlBLGlCQUFPdEIsU0FBUCxDQUFpQixPQUFqQixFQUEwQjtBQUFBLFNBQVMsZ0JBQU1rRixTQUFOLENBQWdCcEMsS0FBaEIsQ0FBVDtBQUFBLENBQTFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEIiwiZmlsZSI6ImxlYXJuaW5nLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyODczMzJkYWI5MDZmZGY5ZDkwMiIsImNvbnN0IG5vZGVGYWN0b3J5ID0gZnVuY3Rpb24odHlwZSA9ICdkaXYnLCBwYXJhbXMpIHtcclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcclxuXHJcbiAgYXBwZW5kQ2xhc3Nlcyhub2RlLCBwYXJhbXMpO1xyXG4gIGFwcGVuZEF0dHJzKG5vZGUsIHBhcmFtcyk7XHJcbiAgaW5zZXJ0VGV4dENvbnRlbnQobm9kZSwgcGFyYW1zKTtcclxuXHJcbiAgcmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENsYXNzZXMobm9kZSwgeyBjbGFzc0xpc3QgfSkge1xyXG4gIGlmIChjbGFzc0xpc3QgJiYgY2xhc3NMaXN0LmZvckVhY2gpIHtcclxuICAgIGNsYXNzTGlzdC5mb3JFYWNoKGNsYXNzTmFtZSA9PiBub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRBdHRycyhub2RlLCB7IGF0dHJzIH0pIHtcclxuICBpZiAoYXR0cnMpIHtcclxuICAgIGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJzKTtcclxuICAgIGF0dHJOYW1lcy5mb3JFYWNoKGF0dHJOYW1lID0+IG5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFRleHRDb250ZW50KG5vZGUsIHsgdGV4dENvbnRlbnQgPSBcIlwiIH0pIHtcclxuICBub2RlLnRleHRDb250ZW50ID0gdGV4dENvbnRlbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5vZGVGYWN0b3J5O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9ub2RlRmFjdG9yeS5qcyIsImNvbnN0IHB1YnN1YiA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgY29uc3QgdG9waWNzID0ge307XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uKHRvcGljLCBsaXN0ZW5lcikge1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10pIHRvcGljc1t0b3BpY10gPSB7IHF1ZXVlOiBbXSB9O1xyXG5cclxuICAgICAgY29uc3QgaW5kZXggPSB0b3BpY3NbdG9waWNdLnF1ZXVlLnB1c2gobGlzdGVuZXIpIC0gMTtcclxuICAgICAgLy8gZnVuY3Rpb24gdG8gZGVsZXRlIHRvcGljXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRlbGV0ZSB0b3BpY3NbdG9waWNdLnF1ZXVlW2luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHB1Ymxpc2g6IGZ1bmN0aW9uKHRvcGljLCBpbmZvKSB7XHJcbiAgICAgIC8vIG5vIHRoZW1lIG9yIG5vIGxpc3RlbmVyc1xyXG4gICAgICBpZiAoIXRvcGljc1t0b3BpY10gfHwgIXRvcGljc1t0b3BpY10ucXVldWUubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IHRvcGljc1t0b3BpY10ucXVldWU7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbShpbmZvIHx8IHt9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YnN1YjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvcHVic3ViLmpzIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vbW9kZWxfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCBwdWJzdWIgZnJvbSAnLi4vdXRpbHMvcHVic3ViJztcclxuXHJcbmNvbnN0IElOSVRJQUxfU1RBVEVfTkFNRSA9ICfQodC+0YHRgtC+0Y/QvdC40LUg0LzQvtC00LXQu9C4JztcclxuY29uc3QgU1RPUF9TVEFURV9OQU1FID0gJ9Ce0LHRg9GH0LXQvdC40LUg0L7RgdGC0LDQvdC+0LLQu9C10L3Qvic7XHJcblxyXG5jbGFzcyBNb2RlbCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgdGhpcy5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICB0aGlzLmJyZWFrVGltZSA9IGRhdGEuYnJlYWtUaW1lO1xyXG4gICAgdGhpcy5zdGVwcyA9IGRhdGEuc3RlcHM7XHJcblxyXG4gICAgdGhpcy5zdGF0ZXMgPSBkYXRhLnN0YXRlcy5tYXAoc3RhdGUgPT4gbmV3IFN0YXRlKHN0YXRlKSk7XHJcbiAgICB0aGlzLmluaXRpYWxTdGF0ZSA9IGRhdGEuaW5pdGlhbFN0YXRlO1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcclxuXHJcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5zdWJJbnB1dCA9IG51bGw7XHJcbiAgICB0aGlzLnN1YlN0b3AgPSBudWxsO1xyXG4gICAgdGhpcy5zdGFydFN0YXRlID0gbmV3IFN0YXRlKHsgaWQ6IDAsIG5hbWU6IElOSVRJQUxfU1RBVEVfTkFNRSwgaW1nOiAnaW1nL3N0YXJ0LnBuZycsIGxhc3Q6IHRydWUgfSk7XHJcbiAgICB0aGlzLnN0b3BTdGF0ZSA9IG5ldyBTdGF0ZSh7IGlkOiAtMSwgbmFtZTogU1RPUF9TVEFURV9OQU1FLCBpbWc6ICdpbWcvc3RvcC5wbmcnLCBsYXN0OiB0cnVlIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdGUoaWQpIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5maW5kKHN0YXRlID0+IHN0YXRlLmlkID09IGlkKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKHRoaXMuaW5pdGlhbFN0YXRlKTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCB0aGlzLmN1cnJlbnRTdGF0ZSk7XHJcbiAgICBsZXQgaW50ZXJ2YWxzID0gUHJvbWlzZS5yZXNvbHZlKCk7IC8vIGluaXQgcHJvbWlzZSBjaGFpblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0ZXBzOyBpKyspIHtcclxuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLm1ha2VCcmVhaygpIH0pXHJcbiAgICAgICAudGhlbigoKSA9PiB7IHJldHVybiB0aGlzLmhhbmRsZUV2ZW50KCkgfSlcclxuICAgICAgIC50aGVuKHN0YXRlID0+IHsgdGhpcy5oYW5kbGVOZXdTdGF0ZShzdGF0ZSkgfSlcclxuICAgIH1cclxuICAgIGludGVydmFscy5jYXRjaChzdGF0ZSA9PiB0aGlzLmhhbmRsZU5ld1N0YXRlKHN0YXRlKSk7XHJcbiAgICByZXR1cm4gaW50ZXJ2YWxzO1xyXG4gIH1cclxuXHJcbiAgbWFrZUJyZWFrKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdWJTdG9wID0gcHVic3ViLnN1YnNjcmliZSgnbW9kZWxfc3RvcCcsICgpID0+IHsgcmVqZWN0KHRoaXMuc3RvcFN0YXRlKTsgfSlcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgICAgICByZXNvbHZlKClcclxuICAgICAgfSwgdGhpcy5icmVha1RpbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVFdmVudCgpIHtcclxuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5jdXJyZW50U3RhdGUuZXZlbnQ7XHJcbiAgICBjb25zdCBldmVudFN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBzZW5kIGRhdGEgYWJvdXQgbmV3IGV2ZW50IHRvIG90aGVyIG1vZHVsZXNcclxuICAgICAgcHVic3ViLnB1Ymxpc2goJ2V2ZW50JywgZXZlbnQpO1xyXG5cclxuICAgICAgLy8gbGlzdGVuIHRvIHVzZXIgYWN0aW9uXHJcbiAgICAgIC8vIGFuZCBpZiB1c2VyIGlucHV0IGNvcnJlY3QgZ28gdG8gbmV4dCBzdGF0ZVxyXG4gICAgICB0aGlzLnN1YklucHV0ID0gcHVic3ViLnN1YnNjcmliZSgndXNlcl9pbnB1dCcsIGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRpbWVTcGVudCA9IERhdGUubm93KCkgLSBldmVudFN0YXJ0VGltZTtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmhhbmRsZUlucHV0KGRhdGEsIHRpbWVTcGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZShuZXh0U3RhdGVJZCk7XHJcbiAgICAgICAgaWYgKCBuZXh0U3RhdGUgKSB7XHJcbiAgICAgICAgICBuZXh0U3RhdGUubGFzdCA/IHJlamVjdChuZXh0U3RhdGUpIDogcmVzb2x2ZShuZXh0U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnN1YlN0b3AgPSBwdWJzdWIuc3Vic2NyaWJlKCdtb2RlbF9zdG9wJywgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdCh0aGlzLnN0b3BTdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gaGFuZGxlIGluYWN0aXZlXHJcbiAgICAgIGNvbnN0IGluYWN0aXZlVGltZSA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlVGltZSgpO1xyXG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXh0U3RhdGVJZCA9IHRoaXMuY3VycmVudFN0YXRlLmdldEluYWN0aXZlQWN0aW9uKCkubmV4dFN0YXRlO1xyXG4gICAgICAgIGNvbnN0IG5leHRTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUobmV4dFN0YXRlSWQpO1xyXG4gICAgICAgIG5leHRTdGF0ZS5sYXN0ID8gcmVqZWN0KG5leHRTdGF0ZSkgOiByZXNvbHZlKG5leHRTdGF0ZSk7XHJcbiAgICAgIH0sIGluYWN0aXZlVGltZSk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCdtb2RlbF9zdG9wJyk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVOZXdTdGF0ZShzdGF0ZSkge1xyXG4gICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gICAgdGhpcy5jbGVhclN1YnMoKTtcclxuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXdfc3RhdGUnLCBzdGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjbGVhclN1YnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdWJJbnB1dCkge1xyXG4gICAgICB0aGlzLnN1YklucHV0LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc3ViU3RvcCkge1xyXG4gICAgICB0aGlzLnN1YlN0b3AucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9kZWw7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsLmpzIiwiaW1wb3J0IHN0YXRlIGZyb20gJy4vc2NlbmVfY29tcG9uZW50cy9zdGF0ZSc7XHJcbmltcG9ydCB0b29scyBmcm9tICcuL3NjZW5lX2NvbXBvbmVudHMvdG9vbHMnO1xyXG5cclxuY29uc3QgZXhwb3J0cyA9IHt9O1xyXG5cclxuLy8gU2NlbmUgbWV0YWRhdGFcclxuY29uc3QgJG1vZGVsTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1uYW1lJyk7XHJcbmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKG1vZGVsLCByZXNwb25zZSkge1xyXG4gICRtb2RlbE5hbWUudGV4dENvbnRlbnQgPSBtb2RlbC5uYW1lO1xyXG4gIHN0YXRlLnNldChtb2RlbC5zdGFydFN0YXRlKTtcclxuICB0b29scy5pbml0KHJlc3BvbnNlLnRvb2xzKTtcclxuICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuLy8gTWFuYWdlIGNvbnRlbnQgdmlzaWJpbGl0eVxyXG5jb25zdCAkY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcbmV4cG9ydHMuc2hvd0NvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnZmxleCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmV4cG9ydHMuaGlkZUNvbnRlbnQgPSBmdW5jdGlvbigpIHtcclxuICBzZXRDb250ZW50RGlzcGxheSgnbm9uZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59XHJcbmZ1bmN0aW9uIHNldENvbnRlbnREaXNwbGF5KGRpc3BsYXkpIHtcclxuICAkY29udGVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxufVxyXG5cclxuLy8gTWFuYWdlIGJ1dHRvbnMgc3RhdGVcclxuZXhwb3J0cy5lbmFibGVCdXR0b25zID0gZnVuY3Rpb24oLi4uYnV0dG9ucykge1xyXG4gIHNldEJ1dHRvbnNTdGF0ZShidXR0b25zLCBmYWxzZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZXhwb3J0cy5kaXNhYmxlQnV0dG9ucyA9IGZ1bmN0aW9uKC4uLmJ1dHRvbnMpIHtcclxuICBzZXRCdXR0b25zU3RhdGUoYnV0dG9ucywgdHJ1ZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn1cclxuZnVuY3Rpb24gc2V0QnV0dG9uc1N0YXRlKGJ1dHRvbnMsIHZhbHVlKSB7XHJcbiAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uZGlzYWJsZWQgPSB2YWx1ZSk7XHJcbn1cclxuXHJcbi8vIERlbGVnYXRlIHB1YmxpYyBtZXRob2RzIHRvIGNvbXBvbmVudHNcclxuZXhwb3J0cy5nZXRUb29sc0RhdGEgPSAoKSA9PlxyXG4gIHRvb2xzLmdldFRvb2xzRGF0YSgpO1xyXG5cclxuZXhwb3J0cy5zZXRTdGF0ZSA9IHN0YXRlRGF0YSA9PlxyXG4gIHN0YXRlLnNldChzdGF0ZURhdGEpO1xyXG5cclxuZXhwb3J0cy5zaG93RXZlbnQgPSBldmVudERhdGEgPT5cclxuICBzdGF0ZS5zaG93RXZlbnQoZXZlbnREYXRhKTtcclxuXHJcbmV4cG9ydHMuaGlkZUV2ZW50ID0gKCkgPT5cclxuICBzdGF0ZS5oaWRlRXZlbnQoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cG9ydHM7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL3NjZW5lLmpzIiwiZnVuY3Rpb24gYWpheChwYXRoID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHhoci5vcGVuKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLCBwYXRoLCB0cnVlKTtcclxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7IHNldFhIUkhlYWRlcnMoeGhyLCBvcHRpb25zLmhlYWRlcnMpOyB9XHJcbiAgeGhyLnNlbmQob3B0aW9ucy5kYXRhKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgIGlmKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldFhIUkhlYWRlcnMoeGhyLCBoZWFkZXJzKSB7XHJcbiAgZm9yIChsZXQgaGVhZGVyIGluIGhlYWRlcnMpIHtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgaGVhZGVyc1toZWFkZXJzXSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhamF4O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlscy9hamF4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zYXNzL2xlYXJuaW5nLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgQWN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLm1pblRpbWUgPSBkYXRhLm1pblRpbWU7XHJcbiAgICB0aGlzLm1heFRpbWUgPSBkYXRhLm1heFRpbWU7XHJcbiAgICB0aGlzLm5leHRTdGF0ZSA9IGRhdGEubmV4dFN0YXRlO1xyXG4gICAgaWYgKGRhdGEuaW5hY3RpdmUpIHtcclxuICAgICAgdGhpcy5pbmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudG9vbHMgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29scyA9IHRoaXMuaW5pdFRvb2xzKGRhdGEudG9vbHMpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBbeyBpZDogTnVtYmVyLCB2YWx1ZTogTnVtYmVyL0Jvb2xlYW4gfSwgey4uLn1dXHJcbiAgICogQHBhcmFtIE51bWJlclxyXG4gICAqIEByZXR1cm4gQm9vbGVhblxyXG4gICAqL1xyXG4gIGlzU3VpdGFibGUoZGF0YSwgdGltZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucmlnaHRUaW1lKHRpbWUpICYmIHRoaXMucmlnaHREYXRhKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmlnaHREYXRhKGRhdGEgPSBbXSkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9vbHMuZXZlcnkodG9vbCA9PiB7XHJcbiAgICAgIC8vINCV0YHQu9C4INGB0YDQtdC00Lgg0L/QvtC70YPRh9C10L3QvdGL0YUg0LjRgtC10LzQvtCyINC90LXRgiwg0YLQvtCz0L4g0LrQvtGC0L7RgNGL0Lkg0LXRgdGC0Ywg0LIg0LTQsNC90L3QvtC8INGN0LrRiNC10L3QtVxyXG4gICAgICBjb25zdCBjaGVja1Rvb2wgPSBkYXRhLmZpbmQob2JqID0+IG9iai5pZCA9PSB0b29sLmlkKTtcclxuICAgICAgaWYgKCFjaGVja1Rvb2wpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICBpZiAodG9vbC50eXBlID09PSAnc3dpdGNoJykgeyByZXR1cm4gY2hlY2tUb29sLnZhbHVlID09PSB0b29sLmJvb2xWYWx1ZTsgfVxyXG5cclxuICAgICAgaWYgKHRvb2wudHlwZSA9PT0gJ3JhbmdlJykgeyByZXR1cm4gdGhpcy5pbmNsdWRlc1ZhbHVlKGNoZWNrVG9vbC52YWx1ZSwgWyB0b29sLm1pblZhbHVlLCB0b29sLm1heFZhbHVlIF0pIH1cclxuXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW5jbHVkZXNWYWx1ZSh2YWx1ZSwgYm9yZGVycykge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZhbHVlIHNob3VsZCBiZSBpbnRlZ2VyJyk7XHJcbiAgICByZXR1cm4gKHZhbHVlID49IGJvcmRlcnNbMF0pICYmICh2YWx1ZSA8PSBib3JkZXJzWzFdKTtcclxuICB9XHJcblxyXG4gIHJpZ2h0VGltZSh0aW1lKSB7XHJcbiAgICBpZiAodHlwZW9mIHRpbWUgIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaW1lIHNob3VsZCBiZSBpbnRlZ2VyIChtcyknKTtcclxuICAgIHJldHVybiAodGltZSA+PSB0aGlzLm1pblRpbWUpICYmICh0aW1lIDw9IHRoaXMubWF4VGltZSk7XHJcbiAgfVxyXG5cclxuICBpbml0VG9vbHModG9vbHMpIHtcclxuICAgIHJldHVybiB0b29scy5tYXAodG9vbCA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaWQ6IHRvb2wuaWQsXHJcbiAgICAgICAgdHlwZTogdG9vbC50eXBlLFxyXG4gICAgICAgIG1pblZhbHVlOiB0b29sLkFjdGlvblRvb2wubWluVmFsdWUsXHJcbiAgICAgICAgbWF4VmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5tYXhWYWx1ZSxcclxuICAgICAgICBib29sVmFsdWU6IHRvb2wuQWN0aW9uVG9vbC5ib29sVmFsdWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY3Rpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xlYXJuaW5nL21vZGVsX2NvbXBvbmVudHMvYWN0aW9uLmpzIiwiY2xhc3MgRXZlbnQge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9ldmVudC5qcyIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JyA7XHJcbmltcG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb24nO1xyXG5cclxuY2xhc3MgU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5pbWcgPSBkYXRhLmltZztcclxuICAgIHRoaXMucGFyYW1zID0gZGF0YS5wYXJhbXM7XHJcblxyXG4gICAgaWYoZGF0YS5sYXN0KSB7XHJcbiAgICAgIHRoaXMubGFzdCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXZlbnQgPSBudWxsO1xyXG4gICAgICB0aGlzLmFjdGlvbnMgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudChkYXRhLmV2ZW50KTtcclxuICAgICAgdGhpcy5hY3Rpb25zID0gZGF0YS5hY3Rpb25zLm1hcChhY3Rpb24gPT4gbmV3IEFjdGlvbihhY3Rpb24pKTtcclxuICAgICAgdGhpcy5sYXN0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZVRpbWUoKSB7XHJcbiAgICBjb25zdCB0aW1lcyA9IHRoaXMuZ2V0QWxsQWN0aW9uVGltZXMoKTtcclxuICAgIHJldHVybiBNYXRoLm1heCguLi50aW1lcyk7XHJcbiAgfVxyXG5cclxuICBnZXRJbmFjdGl2ZUFjdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmluYWN0aXZlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbEFjdGlvblRpbWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5tYXhUaW1lIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlSW5wdXQoZGF0YSwgdGltZSkge1xyXG4gICAgY29uc3Qgc3VpdGVkQWN0aW9ucyA9IHRoaXMuYWN0aW9ucy5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pc1N1aXRhYmxlKGRhdGEsIHRpbWUpKTtcclxuICAgIGlmIChzdWl0ZWRBY3Rpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIHN1aXRlZEFjdGlvbnNbMF0ubmV4dFN0YXRlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGVhcm5pbmcvbW9kZWxfY29tcG9uZW50cy9zdGF0ZS5qcyIsImltcG9ydCBub2RlRmFjdG9yeSBmcm9tICcuLi8uLi91dGlscy9ub2RlRmFjdG9yeSc7XHJcbmltcG9ydCB0aW1lciBmcm9tICcuLi8uLi91dGlscy90aW1lcic7XHJcblxyXG5jb25zdCAkbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC1zdGF0ZS1uYW1lJyk7XHJcbmNvbnN0ICRpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtc3RhdGUtaW1nJyk7XHJcbmNvbnN0ICRwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtcGFyYW1zLXZhbHVlcycpO1xyXG5cclxuY29uc3QgJGV2ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50Jyk7XHJcbmNvbnN0ICRldmVudEhlYWRlciA9ICRldmVudC5xdWVyeVNlbGVjdG9yKCcubW9kZWwtZXZlbnQtbmFtZSBzcGFuJyk7XHJcbmNvbnN0ICRldmVudEJvZHkgPSAkZXZlbnQucXVlcnlTZWxlY3RvcignLm1vZGVsLWV2ZW50LWluZm8nKTtcclxuXHJcbmNvbnN0ICR0aW1lckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RlbC10aW1lcicpO1xyXG4kdGltZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGltZXIubm9kZSk7XHJcblxyXG5mdW5jdGlvbiBzZXQoeyBuYW1lLCBpbWcsIHBhcmFtcyB9KSB7XHJcbiAgJG5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICRpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWcpO1xyXG4gIHNldFBhcmFtZXRlcnMocGFyYW1zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMgPSBbXSkge1xyXG4gIGNvbnN0IGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4gZnJhZy5hcHBlbmRDaGlsZChjcmVhdGVQYXJhbWV0ZU5vZGUocGFyYW0ubmFtZSwgcGFyYW0udmFsdWUpKSk7XHJcblxyXG4gICRwYXJhbXMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkcGFyYW1zLmFwcGVuZENoaWxkKGZyYWcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQYXJhbWV0ZU5vZGUoa2V5LCB2YWx1ZSkge1xyXG4gIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWydwYXJhbWV0ZXInXSB9KTtcclxuXHJcbiAgY29uc3Qga2V5U3BhbiA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDoga2V5IH0pO1xyXG4gIGRpdi5hcHBlbmRDaGlsZChrZXlTcGFuKTtcclxuXHJcbiAgY29uc3QgdmFsdWVTcGFuID0gbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IHRleHRDb250ZW50OiB2YWx1ZSB9KTtcclxuICBkaXYuYXBwZW5kQ2hpbGQodmFsdWVTcGFuKTtcclxuXHJcbiAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuXHJcbi8qKiBTZXRzIGV2ZW50IGRhdGEgdG8gVUkgKi9cclxuZnVuY3Rpb24gc2hvd0V2ZW50KGV2ZW50KSB7XHJcbiAgJGV2ZW50SGVhZGVyLnRleHRDb250ZW50ID0gZXZlbnQubmFtZTtcclxuICAkZXZlbnRCb2R5LnRleHRDb250ZW50ID0gZXZlbnQuZGVzY3JpcHRpb247XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBzaG93VGltZXIoKTtcclxufVxyXG5mdW5jdGlvbiBoaWRlRXZlbnQoKSB7XHJcbiAgJGV2ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicsICdzbGlkZS10b3AnKTtcclxuICBoaWRlVGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1RpbWVyKCkge1xyXG4gICR0aW1lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcclxuICB0aW1lci5zdGFydCgpO1xyXG59XHJcbmZ1bmN0aW9uIGhpZGVUaW1lcigpIHtcclxuICAkdGltZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XHJcbiAgdGltZXIuc3RvcCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0LFxyXG4gIHNob3dFdmVudCxcclxuICBoaWRlRXZlbnRcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3N0YXRlLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL25vZGVGYWN0b3J5JztcclxuXHJcbmNvbnN0IHRvb2xUeXBlcyA9IHtcclxuICBSQU5HRTogJ3JhbmdlJyxcclxuICBTV0lUQ0g6ICdzd2l0Y2gnXHJcbn1cclxuY29uc3QgJHRvb2xzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvb2xzLWxpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGluaXQodG9vbHMpIHtcclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcbiAgdG9vbHMuZm9yRWFjaCh0b29sID0+IHtcclxuICAgIC8vIGNyZWF0ZSB0b29sIHdyYXBwZXJcclxuICAgIGNvbnN0IGRpdiA9IG5vZGVGYWN0b3J5KCdkaXYnLCB7IGNsYXNzTGlzdDogWyd0b29sJ10gfSk7XHJcblxyXG4gICAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7XHJcbiAgICAgIGNsYXNzTGlzdDogWyd0b29sLW5hbWUnXSxcclxuICAgICAgYXR0cnM6IHsgXCJmb3JcIjogdG9vbC5uYW1lIH0sXHJcbiAgICAgIHRleHRDb250ZW50OiB0b29sLm5hbWVcclxuICAgIH0pO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuXHJcbiAgICBjb25zdCB0b29sTm9kZSA9IGNyZWF0ZVRvb2xOb2RlKHRvb2wpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHRvb2xOb2RlKTtcclxuXHJcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH0pO1xyXG5cclxuICAkdG9vbHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAkdG9vbHMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVUb29sTm9kZSh0b29sKSB7XHJcbiAgc3dpdGNoKHRvb2wudHlwZSkge1xyXG4gICAgY2FzZSB0b29sVHlwZXMuUkFOR0U6ICAgcmV0dXJuIGNyZWF0ZVJhbmdlVG9vbCh0b29sKTtcclxuICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogIHJldHVybiBjcmVhdGVTd2l0Y2hUb29sKHRvb2wpO1xyXG4gICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmV0dXJuICfQndC10LjQt9Cy0LXRgdGC0L3Ri9C5INC/0YDQuNCx0L7RgCc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVRvb2wodG9vbCkge1xyXG4gIGNvbnN0IGRpdklucHV0ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlJ10gfSk7XHJcblxyXG4gIGNvbnN0IHNwYW5NaW4gPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWluIH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NaW4pXHJcblxyXG4gIGNvbnN0IGlucHV0ID0gbm9kZUZhY3RvcnkoJ2lucHV0Jywge1xyXG4gICAgYXR0cnM6IHtcclxuICAgICAgJ2RhdGEtaWQnOiB0b29sLmlkLFxyXG4gICAgICAnZGF0YS10eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ25hbWUnOiB0b29sLm5hbWUsXHJcbiAgICAgICd0eXBlJzogJ3JhbmdlJyxcclxuICAgICAgJ21pbic6IHRvb2wubWluLFxyXG4gICAgICAnbWF4JzogdG9vbC5tYXhcclxuICAgIH1cclxuICB9KTtcclxuICBkaXZJbnB1dC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcblxyXG4gIGNvbnN0IHNwYW5NYXggPSBub2RlRmFjdG9yeSgnc3BhbicsIHsgdGV4dENvbnRlbnQ6IHRvb2wubWF4IH0pO1xyXG4gIGRpdklucHV0LmFwcGVuZENoaWxkKHNwYW5NYXgpO1xyXG5cclxuICBjb25zdCBkaXZDdXJyZW50ID0gbm9kZUZhY3RvcnkoJ2RpdicsIHsgY2xhc3NMaXN0OiBbJ3JhbmdlLWN1cnJlbnQtdmFsdWUnXSB9KTtcclxuICBjb25zdCBzcGFuQ3VycmVudCA9IG5vZGVGYWN0b3J5KCdzcGFuJywgeyB0ZXh0Q29udGVudDogaW5wdXQudmFsdWUgfSk7XHJcbiAgZGl2Q3VycmVudC5hcHBlbmRDaGlsZChzcGFuQ3VycmVudCk7XHJcblxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2dCkgPT4ge1xyXG4gICAgc3BhbkN1cnJlbnQudGV4dENvbnRlbnQgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBmcmFnbWVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XHJcbiAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZGl2Q3VycmVudCk7XHJcblxyXG4gIHJldHVybiBmcmFnbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3dpdGNoVG9vbCh0b29sKSB7XHJcbiAgY29uc3QgbGFiZWwgPSBub2RlRmFjdG9yeSgnbGFiZWwnLCB7IGNsYXNzTGlzdDogWydzd2l0Y2gnXSB9KTtcclxuXHJcbiAgY29uc3QgaW5wdXQgPSBub2RlRmFjdG9yeSgnaW5wdXQnLCB7XHJcbiAgICBhdHRyczoge1xyXG4gICAgICAnZGF0YS1pZCc6IHRvb2wuaWQsXHJcbiAgICAgICdkYXRhLXR5cGUnOiAnc3dpdGNoJyxcclxuICAgICAgJ3R5cGUnOiAnY2hlY2tib3gnXHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cclxuICBjb25zdCBkaXYgPSBub2RlRmFjdG9yeSgnZGl2JywgeyBjbGFzc0xpc3Q6IFsnc2xpZGVyJ10gfSk7XHJcbiAgbGFiZWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgcmV0dXJuIGxhYmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUb29sc0RhdGEoKSB7XHJcbiAgY29uc3QgdG9vbHNEYXRhID0gW107XHJcbiAgY29uc3QgaW5wdXRzID0gJHRvb2xzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W2RhdGEtaWRdJyk7XHJcbiAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgY29uc3QgeyBpZCwgdHlwZSB9ID0gaW5wdXQuZGF0YXNldDtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIHN3aXRjaCh0eXBlKSB7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlJBTkdFOiB2YWx1ZSA9IHBhcnNlSW50KGlucHV0LnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgdG9vbFR5cGVzLlNXSVRDSDogdmFsdWUgPSBpbnB1dC5jaGVja2VkOyBicmVhaztcclxuICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGDQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YLQuNC/INC/0YDQuNCx0L7RgNCwLiBJRDogJHtpZH1gKTtcclxuICAgIH1cclxuICAgIHRvb2xzRGF0YS5wdXNoKHsgaWQsIHZhbHVlIH0pO1xyXG4gIH0pO1xyXG4gIHJldHVybiB0b29sc0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBpbml0LFxyXG4gIGdldFRvb2xzRGF0YVxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9zY2VuZV9jb21wb25lbnRzL3Rvb2xzLmpzIiwiaW1wb3J0IG5vZGVGYWN0b3J5IGZyb20gJy4vbm9kZUZhY3RvcnknO1xyXG5cclxuZnVuY3Rpb24gbXNUb0NvbnRlbnQobXMpIHtcclxuICBjb25zdCBzZWNvbmRzID0gTWF0aC5yb3VuZChtcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgY29uc3Qgc2Vjb25kc0xlZnQgPSBzZWNvbmRzIC0gKG1pbnMgKiA2MCk7XHJcblxyXG4gIHJldHVybiBgJHttaW5zfToke3NlY29uZHNMZWZ0ID49IDEwID8gJycgOiAnMCd9JHtzZWNvbmRzTGVmdH1gO1xyXG59XHJcblxyXG5jb25zdCB0aW1lciA9IHtcclxuICBzdGFydFRpbWU6IG51bGwsXHJcbiAgaW50ZXJ2YWw6IG51bGwsXHJcbiAgbm9kZTogbm9kZUZhY3RvcnkoJ3NwYW4nLCB7IGNsYXNzTGlzdDogWyd0aW1lciddLCB0ZXh0Q29udGVudDogJzA6MDAnIH0pLFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFRpbWU7XHJcbiAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IG1zVG9Db250ZW50KGVsYXBzZWQpO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgfSxcclxuICBzdG9wOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICghdGhpcy5zdGFydFRpbWUpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG51bGw7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gJzA6MDAnO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGltZXI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3V0aWxzL3RpbWVyLmpzIiwiaW1wb3J0ICcuLi8uLi9zYXNzL2xlYXJuaW5nLnNjc3MnO1xyXG5cclxuaW1wb3J0IHB1YnN1YiBmcm9tICcuLi91dGlscy9wdWJzdWInO1xyXG5pbXBvcnQgYWpheCBmcm9tICcuLi91dGlscy9hamF4JztcclxuaW1wb3J0IHNjZW5lIGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSAnLi9tb2RlbCc7XHJcblxyXG4vKipcclxuICogTG9hZCBtb2RlbCB3aXRoIGdpdmVuIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBsb2FkTW9kZWwoaWQpIHtcclxuICByZXR1cm4gYWpheChgL21vZGVscy8ke2lkfWApLnRoZW4ocmVzcG9uc2UgPT4gSlNPTi5wYXJzZShyZXNwb25zZSkpO1xyXG59XHJcblxyXG4vKipcclxuICogVUkgYnV0dG9uJ3MgaGFuZGxlcnNcclxuICovXHJcbmNvbnN0ICRzZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGVsLXNlbGVjdFwiKTtcclxuY29uc3QgJGxvYWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZC1tb2RlbC1idG4nKTtcclxubGV0IG1vZGVsID0gbnVsbDtcclxuJGxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaWYgKCBtb2RlbCApIHsgbW9kZWwuc3RvcCgpOyB9XHJcbiAgY29uc3QgbW9kZWxJZCA9ICRzZWxlY3QudmFsdWU7XHJcbiAgbG9hZE1vZGVsKG1vZGVsSWQpXHJcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIG1vZGVsID0gbmV3IE1vZGVsKHJlc3BvbnNlKTtcclxuICAgICAgc2NlbmUuaW5pdChtb2RlbCwgcmVzcG9uc2UpXHJcbiAgICAgICAgLnNob3dDb250ZW50KClcclxuICAgICAgICAuZW5hYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pXHJcbiAgICAgICAgLmRpc2FibGVCdXR0b25zKCRzdG9wQnV0dG9uLCAkcnVuQnV0dG9uKTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IHsgY29uc29sZS5lcnJvcihlcnIpIH0pO1xyXG59KTtcclxuLy9cclxuY29uc3QgJHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0LWJ0bicpO1xyXG4kc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgbW9kZWwuc3RhcnQoKTtcclxuICBzY2VuZS5kaXNhYmxlQnV0dG9ucygkc3RhcnRCdXR0b24pO1xyXG4gIHNjZW5lLmVuYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRzdG9wQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0b3AtYnRuJyk7XHJcbiRzdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIG1vZGVsLnN0b3AoKTtcclxuICBzY2VuZS5lbmFibGVCdXR0b25zKCRzdGFydEJ1dHRvbik7XHJcbiAgc2NlbmUuZGlzYWJsZUJ1dHRvbnMoJHN0b3BCdXR0b24sICRydW5CdXR0b24pO1xyXG59KTtcclxuXHJcbmNvbnN0ICRydW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnVuLWJ0bicpO1xyXG4kcnVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbnN0IHRvb2xzRGF0YSA9IHNjZW5lLmdldFRvb2xzRGF0YSgpO1xyXG4gIHB1YnN1Yi5wdWJsaXNoKCd1c2VyX2lucHV0JywgdG9vbHNEYXRhKTtcclxufSk7XHJcblxyXG4vKipcclxuICogSGFuZGxlIGN1c3RvbSBldmVudHMgaGVyZSAodXNlciBpbnB1dCwgcHJvZ3JhbW0gbWVzc2FnZXMgZXRjLilcclxuICovXHJcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ld19zdGF0ZScsIHN0YXRlID0+IHtcclxuICBzY2VuZS5oaWRlRXZlbnQoKTtcclxuICBzY2VuZS5zZXRTdGF0ZShzdGF0ZSk7XHJcbn0pO1xyXG5wdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHNjZW5lLnNob3dFdmVudChldmVudCkpO1xyXG5cclxuLy8gLyoqXHJcbi8vICogVGltZXIgKGN1cnJlbnRseSBmb3IgZGV2IG1vZGUgb25seSlcclxuLy8gKi9cclxuLy8gaW1wb3J0IHRpbWVyIGZyb20gJy4uL3V0aWxzL3RpbWVyJztcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpLmFwcGVuZENoaWxkKHRpbWVyLm5vZGUpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCduZXdfc3RhdGUnLCBzdGF0ZSA9PiB0aW1lci5zdG9wKCkpO1xyXG4vLyBwdWJzdWIuc3Vic2NyaWJlKCdldmVudCcsIGV2ZW50ID0+IHRpbWVyLnN0YXJ0KCkpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9sZWFybmluZy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=