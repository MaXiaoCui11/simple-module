/**
 * simple-module v3.0.2
 * http://mycolorway.github.io/simple-module
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/simple-module/license.html
 *
 * Date: 2016-04-5
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleModule = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var EventEmitter, SimpleModule, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

EventEmitter = (typeof window !== "undefined" ? window['EventEmitter2'] : typeof global !== "undefined" ? global['EventEmitter2'] : null);

_ = (typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null);

SimpleModule = (function(superClass) {
  extend(SimpleModule, superClass);

  SimpleModule.extend = function(obj) {
    var key, ref, val;
    if (!(obj && typeof obj === 'object')) {
      throw new Error('SimpleModule.extend: param should be an object');
    }
    for (key in obj) {
      val = obj[key];
      if (key !== 'included' && key !== 'extended') {
        this[key] = val;
      }
    }
    if ((ref = obj.extended) != null) {
      ref.call(this);
    }
    return this;
  };

  SimpleModule.include = function(obj) {
    var key, ref, val;
    if (!(obj && typeof obj === 'object')) {
      throw new Error('SimpleModule.include: param should be an object');
    }
    for (key in obj) {
      val = obj[key];
      if (key !== 'included' && key !== 'extended') {
        this.prototype[key] = val;
      }
    }
    if ((ref = obj.included) != null) {
      ref.call(this);
    }
    return this;
  };

  SimpleModule.plugins = {};

  SimpleModule.plugin = function(name, cls) {
    if (!(name && typeof name === 'string')) {
      throw new Error('SimpleModule.plugin: first param should be a string');
    }
    if (typeof cls !== 'function') {
      throw new Error('SimpleModule.plugin: second param should be a class');
    }
    this.plugins[name] = cls;
    return this;
  };

  SimpleModule.opts = {
    plugins: []
  };

  SimpleModule.prototype.plugins = {};

  function SimpleModule(opts) {
    SimpleModule.__super__.constructor.call(this);
    this.opts = _.extend({}, SimpleModule.opts, opts);
    this.opts.plugins.forEach((function(_this) {
      return function(name) {
        return _this.plugins[name] = new SimpleModule.plugins[name](_this);
      };
    })(this));
  }

  SimpleModule.prototype.off = function(name, listener) {
    if (_.isFunction(listener)) {
      return SimpleModule.__super__.off.call(this, name, listener);
    } else {
      return this.removeAllListeners(name);
    }
  };

  SimpleModule.prototype.one = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.once.apply(this, args);
  };

  SimpleModule.prototype.trigger = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.emit.apply(this, args);
  };

  SimpleModule.prototype.triggerAsync = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.emitAsync.apply(this, args);
  };

  return SimpleModule;

})(EventEmitter);

module.exports = SimpleModule;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});