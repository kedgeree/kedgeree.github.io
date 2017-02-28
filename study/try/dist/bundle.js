/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var platforms = {
    _resKey: 'ground',
    init: function (game) {
        this.game = game;
        this.p = game.add.group();
        this.p.enableBody = true;
        this._createGround();
        var posArr = [{x: 400, y: 400}, {x: -150, y: 250}];
        this._createLedges(posArr);

        return this.p;
    },
    _createGround(){
        var ground  = this.p.create(0, this.game.world.height - 64, this._resKey);
        ground.scale.setTo(2, 2);
        ground.body.immovable  = true;
    },
    _createLedges(posArr){
        posArr.forEach((pos) =>{
            console.log(pos);
            var l = this.p.create(pos.x, pos.y, this._resKey);
            l.body.immovable  = true;
        })
    },
};

/* harmony default export */ __webpack_exports__["a"] = platforms;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var player = {
    init: function (game) {
        this._game = game;
        this._player = game.add.sprite(32, game.world.height - 150, 'dude');
        this._cursors = this._game.input.keyboard.createCursorKeys();

        game.physics.arcade.enable(this._player);

        this._player.body.bounce.y = 0.2;
        this._player.body.gravity.y = 400;
        this._player.body.collideWorldBounds = true;


        this._addAnimations();
        // this._control();

        return this._player;
    },

    _addAnimations(){
        this._player.animations.add('left', [0, 1, 2, 3], 20 , true);
        this._player.animations.add('right', [5, 6, 7, 8], 20 , true);
    },
    _control: function (hit) {
        this._player.body.velocity.x = 0;

        if(this._cursors.left.isDown){
            this._player.body.velocity.x = -200;
            this._player.animations.play('left');
        }
        else if(this._cursors.right.isDown){
            this._player.body.velocity.x = 200;
            this._player.animations.play('right');
        } else{
            this._player.animations.stop();
            this._player.frame = 4;
        }

        if(this._cursors.up.isDown && hit){
            this._player.body.velocity.y = -500;
        }else if(this._cursors.down.isDown){
            this._player.body.velocity.y = 0;
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = player;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platforms_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stars_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scoreText_js__ = __webpack_require__(4);




var game = {
    init: function () {
        var _this = this;
        this._game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
            preload: _this.preload.bind(_this),
            create: _this.create.bind(_this),
            update: _this.update.bind(_this)
        });
    },
    preload: function () {
        this._game.load.image('sky', 'assets/sky.png');
        this._game.load.image('ground', 'assets/platform.png');
        this._game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this._game.load.image('star', 'assets/star.png');
    },

    create: function () {
        this._game.physics.startSystem(Phaser.Physics.ARCADE);
        this._game.add.sprite(0, 0,'sky');
        this._platform = __WEBPACK_IMPORTED_MODULE_0__platforms_js__["a" /* default */].init(this._game);
        this._player = __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].init(this._game);
        this._stars = __WEBPACK_IMPORTED_MODULE_2__stars_js__["a" /* default */].init(this._game);
        __WEBPACK_IMPORTED_MODULE_3__scoreText_js__["a" /* default */].init(this._game);
    },
    update:function () {
        var hitPlatform = this._game.physics.arcade.collide(this._player, this._platform);
        this._game.physics.arcade.collide(this._stars, this._platform);
        this._game.physics.arcade.overlap(this._player, this._stars, __WEBPACK_IMPORTED_MODULE_2__stars_js__["a" /* default */].collect, null, this);
        __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */]._control(hitPlatform);
    }
};

game.init();





/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scoreText_js__ = __webpack_require__(4);

var stars = {
    init: function (game) {
        this._game = game;
        this._stars = game.add.group();
        this._stars.enableBody = true;
        this._create();
        return this._stars;
    },
    _create: function () {

        for(var i = 0; i < 12; i++){
            var star = this._stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 200;
            star.body.bounce.y = 0.1;
        }
    },
    collect(player, star){
        star.kill();
        __WEBPACK_IMPORTED_MODULE_0__scoreText_js__["a" /* default */].addScore(10);
    }
}
/* harmony default export */ __webpack_exports__["a"] = stars;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var scoreText = {
    _score: 0,
    addScore: function (n) {
        this._score += n;
        this._update();
    },
    _update: function () {
        this._scoreText.text = 'Score: ' + this._score;
    },
    init: function (game) {
        this._scoreText = game.add.text(16,16, 'Score: 0', {fontSize: '24px', fill: '#000'});
    }
};
/* harmony default export */ __webpack_exports__["a"] = scoreText;

/***/ })
/******/ ]);