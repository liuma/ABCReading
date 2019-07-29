'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Index = require('@/components/Index');

var _Index2 = _interopRequireDefault(_Index);

var _Login = require('@/components/Login');

var _Login2 = _interopRequireDefault(_Login);

var _Pay = require('@/components/Pay');

var _Pay2 = _interopRequireDefault(_Pay);

var _Suc = require('@/components/Suc');

var _Suc2 = _interopRequireDefault(_Suc);

var _Catalog = require('@/components/lesson/Catalog');

var _Catalog2 = _interopRequireDefault(_Catalog);

var _Transition = require('@/components/lesson/Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _Part = require('@/components/lesson/Part');

var _Part2 = _interopRequireDefault(_Part);

var _Part3 = require('@/components/lesson/Part1');

var _Part4 = _interopRequireDefault(_Part3);

var _Part5 = require('@/components/lesson/Part2');

var _Part6 = _interopRequireDefault(_Part5);

var _Part7 = require('@/components/lesson/Part3');

var _Part8 = _interopRequireDefault(_Part7);

var _Part9 = require('@/components/lesson/Part4');

var _Part10 = _interopRequireDefault(_Part9);

var _Part11 = require('@/components/lesson/Part5');

var _Part12 = _interopRequireDefault(_Part11);

var _Finish = require('@/components/lesson/Finish');

var _Finish2 = _interopRequireDefault(_Finish);

var _End = require('@/components/End');

var _End2 = _interopRequireDefault(_End);

var _Order = require('@/components/Order');

var _Order2 = _interopRequireDefault(_Order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'Index',
    component: _Index2.default
  }, {
    path: '/index',
    name: 'Index',
    component: _Index2.default
  }, {
    path: '/pay',
    name: 'Pay',
    component: _Pay2.default
  }, {
    path: '/partOne',
    name: 'PartOne',
    component: _Part4.default
  }, {
    path: '/partTwo',
    name: 'PartTwo',
    component: _Part6.default
  }, {
    path: '/partThree',
    name: 'PartThree',
    component: _Part8.default
  }, {
    path: '/partFour',
    name: 'PartFour',
    component: _Part10.default
  }, {
    path: '/partFive',
    name: 'PartFive',
    component: _Part12.default
  }, {
    path: '/suc',
    name: 'Suc',
    component: _Suc2.default
  }, {
    path: '/cata',
    name: 'Cata',
    component: _Catalog2.default
  }, {
    path: '/trans',
    name: 'Transition',
    component: _Transition2.default
  }, {
    path: '/part',
    name: 'Part',
    component: _Part2.default
  }, {
    path: '/finish',
    name: 'Finish',
    component: _Finish2.default
  }, {
    path: '/end',
    name: 'End',
    component: _End2.default
  }, {
    path: '/login',
    name: 'Login',
    component: _Login2.default
  }]
});
//# sourceMappingURL=index.js.map