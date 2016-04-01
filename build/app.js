require("source-map-support").install();
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	__webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var server = _app2.default.listen(3000, function () {
	    var port = server.address().port;
	
	    console.log('Listening on %s', port);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _express = __webpack_require__(2);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(3);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _urls = __webpack_require__(7);
	
	var _urls2 = _interopRequireDefault(_urls);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = (0, _express2.default)();
	
	app.use((0, _logger2.default)());
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
	
	app.use('/api', _urls2.default);
	app.use('/', function (req, res) {
	   res.sendFile('index.html', {
	      root: _path2.default.join(__dirname, 'public')
	   });
	});
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    var logger = (0, _morgan2.default)('dev');
	    return logger;
	};
	
	var _morgan = __webpack_require__(6);

	var _morgan2 = _interopRequireDefault(_morgan);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(2);
	
	var _user = __webpack_require__(8);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _soundcloudSong = __webpack_require__(18);
	
	var _soundcloudSong2 = _interopRequireDefault(_soundcloudSong);
	
	var _soundcloud = __webpack_require__(19);
	
	var _soundcloud2 = _interopRequireDefault(_soundcloud);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var router = (0, _express.Router)();
	router.get('/', function (req, res) {
	
	    return _soundcloudSong2.default.orderBy('favoritings_count', 'DESC').fetchAll().then(function (songs) {
	        return res.json(songs);
	    });
	});
	
	exports.default = router;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _base = __webpack_require__(9);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _bcrypt = __webpack_require__(16);
	
	var _bcrypt2 = _interopRequireDefault(_bcrypt);
	
	var _bluebird = __webpack_require__(17);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bcrypt = _bluebird2.default.promisifyAll(_bcrypt2.default);
	
	var User = _base2.default.Model.extend({
	    tableName: 'users',
	    hidden: ['passwordDigest'],
	    virtuals: {
	        fullname: function fullname() {
	            return this.get('firstName') + ' ' + this.get('lastName');
	        }
	    }
	}, {
	    login: _bluebird2.default.method(function (email, password) {
	        if (!email && !password) {
	            throw new Error('Email and password are required to login');
	        }
	        var cleanEmail = email.toLowerCase().trim();
	        return new this({ email: cleanEmail }).fetch({ require: true }).tap(function (user) {
	            return bcrypt.compareAsync(user.get('passwordDigest'), password).then(function (res) {
	                if (!res) throw new Error('Invalid password');
	            });
	        });
	    }),
	    newUser: function newUser() {
	        return new this();
	    }
	});
	/*
	User.on('creating', function(model, attrs){
	    bcrypt.genSalt(10).then(salt => {
	       return bcrypt.hash(attrs.password, salt);
	    }).then(hash => {
	        model.set('email', attrs.email.toLowerCase().trim());
	        model.set('passwordDigest', hash);
	        return true;
	    });
	});
	*/
	
	exports.default = _base2.default.model('User', User);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _bookshelf = __webpack_require__(10);
	
	var _bookshelf2 = _interopRequireDefault(_bookshelf);
	
	var _nodeUuid = __webpack_require__(15);
	
	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_bookshelf2.default.Model = _bookshelf2.default.Model.extend({
	    hasTimestamps: true,
	
	    defaults: function defaults() {
	        return {
	            uuid: _nodeUuid2.default.v4()
	        };
	    }
	}, {
	    getById: function getById(id) {
	        return new this({ id: id }).fetch();
	    },
	    orderBy: function orderBy(column, order) {
	        return this.query(function (qb) {
	            qb.orderBy(column, order);
	        });
	    }
	});
	
	exports.default = _bookshelf2.default;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _bookshelf = __webpack_require__(11);
	
	var _bookshelf2 = _interopRequireDefault(_bookshelf);
	
	var _knex = __webpack_require__(12);
	
	var _knex2 = _interopRequireDefault(_knex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var bookshelf = (0, _bookshelf2.default)(_knex2.default);
	
	['virtuals', 'registry', 'visibility'].forEach(function (plugin) {
	    bookshelf.plugin(plugin);
	});
	
	exports.default = bookshelf;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("bookshelf");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _knex = __webpack_require__(13);
	
	var _knex2 = _interopRequireDefault(_knex);
	
	var _config = __webpack_require__(14);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pageConfig = _config2.default.dbConfig;
	
	exports.default = (0, _knex2.default)(pageConfig);

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("knex");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("config");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("node-uuid");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _base = __webpack_require__(9);
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SoundcloudSong = _base2.default.Model.extend({
	    hasTimestamps: false,
	    tableName: 'soundcloudSong'
	}, {});
	
	exports.default = SoundcloudSong;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function () {
	    var sc = new SoundCloud(_config2.default.soundcloud.clientId);
	    sc.setUser(RQID);
	
	    return sc;
	};
	
	var _requestPromise = __webpack_require__(20);
	
	var _requestPromise2 = _interopRequireDefault(_requestPromise);
	
	var _config = __webpack_require__(14);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _bluebird = __webpack_require__(17);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var baseUrl = 'https://api.soundcloud.com/';
	var usersUrl = baseUrl + 'users/';
	var RQID = 89985888;
	
	var baseGet = function baseGet(uri) {
	    return {
	        method: 'GET',
	        json: true,
	        uri: uri
	    };
	};
	
	function makeGet(url) {
	    return (0, _requestPromise2.default)(baseGet(url));
	}
	
	/*
	"kind",
	"id",
	"created_at",
	"user_id",
	"duration",
	"commentable",
	"state",
	"original_content_size",
	"last_modified",
	"sharing",
	"tag_list",
	"permalink",
	"streamable",
	"embeddable_by",
	"downloadable",
	"purchase_url",
	"label_id",
	"purchase_title",
	"genre",
	"title",
	"description",
	"label_name",
	"release",
	"track_type",
	"key_signature",
	"isrc",
	"video_url",
	"bpm",
	"release_year",
	"release_month",
	"release_day",
	"original_format",
	"license",
	"uri",
	"user",
	"permalink_url",
	"artwork_url",
	"waveform_url",
	"stream_url",
	"playback_count",
	"download_count",
	"favoritings_count",
	"comment_count",
	"attachments_uri"
	 */
	
	var SoundCloud = function () {
	    function SoundCloud(clientId) {
	        _classCallCheck(this, SoundCloud);
	
	        this.clientId = clientId;
	    }
	
	    _createClass(SoundCloud, [{
	        key: 'setUser',
	        value: function setUser(userId) {
	            this.userId = userId;
	            return this;
	        }
	    }, {
	        key: 'getUser',
	        value: function getUser(userId) {
	            var uri = '' + usersUrl + userId;
	            uri = this._appendToken(uri);
	            var opts = baseGet(uri);
	            return (0, _requestPromise2.default)(opts);
	        }
	    }, {
	        key: 'getLikes',
	        value: function getLikes() {
	            var userId = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	            if (!userId) {
	                if (!this.userId) throw 'stop!';
	
	                var url = '' + usersUrl + this.userId + '/favorites';
	                url = this._appendToken(url);
	                return makeGet(url);
	            }
	        }
	    }, {
	        key: 'makeLikesRequest',
	        value: function makeLikesRequest(likes, url) {
	            var _this = this;
	
	            console.log('sending request!');
	            return makeGet(url).then(function (data) {
	                data.collection.forEach(function (song) {
	                    likes.push(song);
	                });
	                if (data.next_href) {
	                    return _this.makeLikesRequest(likes, data.next_href);
	                } else {
	                    return true;
	                }
	            });
	        }
	    }, {
	        key: 'getAllLikes',
	        value: function getAllLikes() {
	
	            var url = '' + usersUrl + this.userId + '/favorites';
	            url = this._appendToken(url);
	
	            var p = _bluebird2.default.defer();
	
	            var likes = [];
	
	            this.makeLikesRequest(likes, url).then(function () {
	                p.resolve(likes);
	            });
	
	            return p.promise;
	        }
	    }, {
	        key: '_appendToken',
	        value: function _appendToken(url) {
	            return url + '?client_id=' + this.clientId + '&linked_partitioning=1';
	        }
	    }]);
	
	    return SoundCloud;
	}();

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map