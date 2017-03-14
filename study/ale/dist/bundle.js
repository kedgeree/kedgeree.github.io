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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boss_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skill_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__throws_js__ = __webpack_require__(4);





// var boss = require('./boss.js');
// var player = require('./player.js');
// var skill = require('./skill.js');
// var throws = require('./throws.js');

var game = {
    init: function () {
        var _this = this;
        this._game = new Phaser.Game(385, 210, Phaser.AUTO, '', {
            preload: _this.preload.bind(this),
            create: _this.create.bind(this),
            update: _this.update.bind(this),
        })
    },
    preload: function () {
        this._game.load.image('bg', 'assets/bg.png');
        this._game.load.spritesheet('wsm', 'assets/wsm.png', 65, 80, 8);
        this._game.load.spritesheet('skill', 'assets/skill.png', 85, 65);
        this._game.load.image('haha', 'assets/haha.png');
        this._game.load.image('throw', 'assets/throw.png');
    },
    create: function () {

        this._game.world.setBounds(10, 10, 375, 200);
        this._game.add.sprite(0,0, 'bg');

        this.haha = __WEBPACK_IMPORTED_MODULE_0__boss_js__["a" /* default */].init(this._game);
        this._player = __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].init(this._game);

        this._skill = __WEBPACK_IMPORTED_MODULE_2__skill_js__["a" /* default */].init(this._game);
        this._throws = __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */].init(this._game);

        this.stateText = this._game.add.text(this._game.world.centerX, this._game.world.centerY,' ', { font: '40px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visibility = false;

        this._cursors = this._game.input.keyboard.createCursorKeys();
        this._fightButton = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    },
    update: function () {
        var _self = this;
        if(this._player.alive){
            __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].normal();

            __WEBPACK_IMPORTED_MODULE_2__skill_js__["a" /* default */].update(this._fightButton, this._reverse, {x: this._player.body.x, y: this._player.body.y});
            __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].control(this._cursors, this._fightButton);

            if(this._game.time.now > __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */]._throwTime){
                __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */].update({x: this.haha.body.x, y: this.haha.body.y}, this._player);
            }


            this._game.physics.arcade.collide(this._player, this.haha);
            this._game.physics.arcade.collide(this._skill, this.haha, function () {
                _self._reverse = true;
            });
            this._game.physics.arcade.overlap(this._throws, this._player, this._throwOnPlayer, null, this);

        }

    },
    _throwOnPlayer: function (player, t) {
        this._throws.callAll('kill');
        this._player.kill();
        this.stateText.text = 'GAME OVER!';
        this.stateText.visibility = true;
    },
}

game.init();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var boss = {
    init: function (game) {
        this._game = game;
        this._boss = this._game.add.sprite(330, 60, 'haha');

        this._game.physics.enable(this._boss, Phaser.Physics.ARCADE);
        this._boss.body.immovable = true;

        return this._boss;
    }
}
/* harmony default export */ __webpack_exports__["a"] = boss;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var player = {
    _direction: 'right',
  init: function (game) {
      this._game = game;
      this._player = this._game.add.sprite(70, 90, 'wsm');
      this._initAnimation();

      this._game.physics.arcade.enable(this._player);
      this._player.body.gravity.y = 200;
      this._player.body.collideWorldBounds = true;


      return this._player;
  },
  _initAnimation: function () {
      this._player.animations.add('normal', [0,1], 2, true);
      this._player.animations.add('fight_left', [2, 3], 20,false);
      this._player.animations.add('fight_right', [4, 5], 20,false);
      this._player.animations.add('down', [6, 7], 20, false);
      this._player.animations.play('normal');
  },
    normal: function () {
        this._player.body.velocity.x = 0;
        this._player.animations.play('normal');
    },
    control: function (cursors , fightButton) {
        if(cursors.left.isDown){
            this._player.body.velocity.x = -200;
            this._direction = 'left';
        } else if(cursors.right.isDown){
            this._player.body.velocity.x = 200;
            this._direction = 'right';
        }else if(cursors.up.isDown && this._player.y == 130){
            this._player.body.velocity.y = -200;
        }else if(cursors.down.isDown){
            this._player.body.velocity.y = 200;
            if(this._player.y >= 120){
                this._player.animations.play('down');
            }
        } else if(fightButton.isDown){
            this._player.animations.play('fight_' + this._direction);
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = player;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var skill = {
    _weaponDistacne: 0,
    init: function (game) {
        this._game = game;
        this._skill = this._game.add.sprite(-85, -65, 'skill');
        this._skill.animations.add('skill_start', [0,1,2,3], 4, false);
        this._game.physics.arcade.enable(this._skill);
        this._skill.body.bounce.x = 1;

        return this._skill;
    },
    reset: function () {
        this._skill.body.velocity.x = 0;
        this._skill.animations.stop();
        this._skill.reset(-85, -65);
    },
    update: function (fightButton, reverse, playerPos) {
        if(this._weaponDistacne < 40){
            if(reverse){
                this._weaponDistacne -= 1;
            }else{
                this._weaponDistacne += 1;
            }

        }else{
            this.reset();
        }

        if(fightButton.isDown){
            this._weaponDistacne = 0;
            this.start(reverse, playerPos);
        }
    },
    start: function (reverse, playerPos) {
        this._skill.reset(playerPos.x, playerPos.y);
        this._skill.animations.play('skill_start');
        if(this.reverse){
            this._skill.body.velocity.x = -200;
        }else{
            this._skill.body.velocity.x = 200;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = skill;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var throws = {
    _throwTime: 0,
    init: function (game) {
        this._game = game;


        this._throws = this._game.add.group();
        this._throws.enableBody = true;
        this._throws.physicsBodyType = Phaser.Physics.ARCADE;
        this._throws.createMultiple(2, 'throw');
        this._throws.setAll('outOfBoundsKill', true);
        this._throws.setAll('checkWorldBounds', true);

        return this._throws;
    },
    update: function (bossPos, player) {
        var t = this._throws.getFirstExists(false);
        if(t){
            t.reset(bossPos.x , bossPos.y);
            this._game.physics.arcade.moveToObject(t,player, 100);
            this._throwTime = this._game.time.now + 2000;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = throws;

/***/ })
/******/ ]);