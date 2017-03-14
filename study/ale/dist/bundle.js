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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var player = {
    _direction: 'right',
  init: function (game) {
      this._game = game;
      this._player = this._game.add.sprite(65, 80, 'wsm');
      this._initAnimation();

      this._game.physics.arcade.enable(this._player);
      this._player.body.setSize(60, 70, 2, 3);
      this._player.body.gravity.y = 200;
      this._player.body.collideWorldBounds = true;

      this._lives = game.add.group();
      for(var i = 0; i< 3; i++){
          this._lives.create(game.world.width - 60 + (20 * i), 30, 'heart_s')
      }


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
    control: function (cursors , fightButton, skill, skillReverse) {
        this._skillReverse = skillReverse;
        if(cursors.left.isDown){
            this._player.body.velocity.x = -200;
            this._direction = 'left';
        } else if(cursors.right.isDown){
            this._player.body.velocity.x = 200;
            this._direction = 'right';
        }else if(cursors.up.isDown && this._player.y >= 130){
            this._player.body.velocity.y = -200;
        }else if(cursors.down.isDown){
            this._player.body.velocity.y = 200;
            if(this._player.y >= 120){
                this._player.animations.play('down');
                this._player.body.setSize(70, 57, 0 , 16);
            }
        } else if(fightButton.isDown){
            this._player.animations.play('fight_' + this._direction);
        }
        this._game.physics.arcade.overlap(this._player, skill, this._skillOnPlayer, null, this);
    },
    _decreaseLive: function () {

        var live = this._lives.getFirstAlive();
        if(live){
            live.kill();
        }
        if (this._lives.countLiving() < 1){
            this._player.kill();
        }

    },
    _increaseLive: function () {
        var n = this._lives.countLiving();

        if ( n < 3){
            var live = this._lives.getAt(3 - n - 1);
            if(live){
                live.revive();
            }
        }
    },
    _skillOnPlayer: function (skill, p) {
        if(this._skillReverse){
           this._decreaseLive();
        }
    },
    restart: function () {
        this._player.revive();
        this._lives.callAll('revive');
    }
};
/* harmony default export */ __webpack_exports__["a"] = player;

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
var skill = {
    _weaponDistacne: 0,
    init: function (game) {
        this._game = game;
        this._skill = this._game.add.sprite(-85, -65, 'skill');
        this._skill.animations.add('skill_start', [0,1,2,3], 4, false);
        this._game.physics.arcade.enable(this._skill);
        this._skill.body.bounce.x = 1;
        this._skill.body.setSize(19, 32, 27, 16);

        return this._skill;
    },
    reset: function () {
        this._skill.body.velocity.x = 0;
        this._skill.animations.stop();
        this._skill.reset(-85, -65);
    },
    update: function (fightButton, direction, reverse, playerPos) {
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
            this.start(direction, playerPos);
        }


    },
    start: function (direction, playerPos) {
        this._skill.reset(playerPos.x, playerPos.y);
        this._skill.animations.play('skill_start');
        if(direction == 'left'){
            this._skill.body.velocity.x = -200;
        }else{
            this._skill.body.velocity.x = 200;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = skill;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player_js__ = __webpack_require__(0);

var throws = {
    _throwTime: 0,
    _monsterTime: 3333,
    _heartTime: 5491,
    init: function (game) {
        this._game = game;


        this._throwss = this._game.add.group();
        this._throwss.enableBody = true;
        this._throwss.physicsBodyType = Phaser.Physics.ARCADE;

        this._throwss.createMultiple(3, 'throw');
        this._throwss.setAll('outOfBoundsKill', true);
        this._throwss.setAll('checkWorldBounds', true);

        this._monsters = this._game.add.group();
        this._monsters.enableBody = true;
        this._monsters.physicsBodyType = Phaser.Physics.ARCADE;

        this._monsters.createMultiple(3, 'monster');
        this._monsters.setAll('outOfBoundsKill', true);
        this._monsters.setAll('checkWorldBounds', true);


        this._hearts = this._game.add.group();
        this._hearts.enableBody = true;
        this._hearts.physicsBodyType = Phaser.Physics.ARCADE;

        this._hearts.createMultiple(3, 'heart');
        this._hearts.setAll('outOfBoundsKill', true);
        this._hearts.setAll('checkWorldBounds', true);
        // return this._throwss;
    },
    update: function (boss, pl, skill) {

        if(this._game.time.now > this._throwTime){
            var t = this._throwss.getFirstExists(false);
            if(t){
                t.reset(boss.body.x , boss.body.y);
                this._game.physics.arcade.moveToObject(t,pl, 100);
                this._throwTime = this._game.time.now + 5177;


            }
        }
        if(this._game.time.now > this._monsterTime ){
            var m = this._monsters.getFirstExists(false);
            if(m){
                m.reset(boss.body.x , boss.body.y + boss.height - m.height);
                m.body.velocity.x = -100;
                this._monsterTime = this._game.time.now + 3333;
            }
        }
        if(this._game.time.now > this._heartTime ){
            var h = this._hearts.getFirstExists(false);
            if(h){
                h.reset(boss.body.x , boss.body.y);
                this._game.physics.arcade.moveToObject(h, pl, 100);
                this._heartTime = this._game.time.now + 9999;
            }
        }


        this._game.physics.arcade.overlap(this._throwss, pl, this._throwOnPlayer, null, this);
        this._game.physics.arcade.overlap(this._monsters, pl, this._throwOnPlayer, null, this);
        this._game.physics.arcade.overlap(this._hearts, pl, this._heartsOnPlayer, null, this);

        this._game.physics.arcade.collide(this._monsters, skill, this._skillMonster, null, this);
    },
    allKill: function () {
        this._throwss.callAll('kill');
        this._monsters.callAll('kill');
        this._hearts.callAll('kill');
    },
    _throwOnPlayer: function (pl, t) {
        t.kill();
        __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */]._decreaseLive();
    },
    _skillMonster: function (skill, m) {
        m.kill();
        skill.kill();
    },
    _heartsOnPlayer: function (pl, h) {
        h.kill();
        __WEBPACK_IMPORTED_MODULE_0__player_js__["a" /* default */]._increaseLive();
    },
    restart: function () {
        this._throwss.callAll('revive');
        this._monsters.callAll('revive');
        this._hearts.callAll('revive');
    }
}
/* harmony default export */ __webpack_exports__["a"] = throws;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boss_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__skill_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__throws_js__ = __webpack_require__(3);





var game = {
    init: function () {
        var _this = this;
        this._game = new Phaser.Game(385, 208, Phaser.AUTO, '', {
            preload: _this.preload.bind(this),
            create: _this.create.bind(this),
            update: _this.update.bind(this),
        })
    },
    preload: function () {
        this._game.load.image('bg', 'assets/bg1.png');
        this._game.load.spritesheet('wsm', 'assets/wsm.png', 65, 80, 8);
        this._game.load.spritesheet('skill', 'assets/skill.png', 85, 65);
        this._game.load.image('haha', 'assets/haha.png');
        this._game.load.image('throw', 'assets/throw.png');
        this._game.load.image('monster', 'assets/monster.png');
        this._game.load.image('heart', 'assets/heart.png');
        this._game.load.image('heart_s', 'assets/heart_s.png');

    },
    create: function () {
        this._game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this._game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this._game.scale.refresh();

        this._game.world.setBounds(10, 10, 375, 200);
        this._game.add.sprite(10,10, 'bg');

        this.haha = __WEBPACK_IMPORTED_MODULE_0__boss_js__["a" /* default */].init(this._game);
        this._player = __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].init(this._game);

        this._skill = __WEBPACK_IMPORTED_MODULE_2__skill_js__["a" /* default */].init(this._game);
        __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */].init(this._game);

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

            __WEBPACK_IMPORTED_MODULE_2__skill_js__["a" /* default */].update(this._fightButton, __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */]._direction, this._reverse,  {x: this._player.body.x, y: this._player.body.y});
            __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].control(this._cursors, this._fightButton, this._skill, this._reverse);

            __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */].update(this.haha, this._player, this._skill);


            this._game.physics.arcade.collide(this._player, this.haha);
            this._game.physics.arcade.collide(this._skill, this.haha, function () {
                _self._reverse = true;
            });

        }else{
            __WEBPACK_IMPORTED_MODULE_3__throws_js__["a" /* default */].allKill();
            this.stateText.text = 'GAME OVER!';
            this.stateText.visibility = true;

            this._game.input.onTap.addOnce(this.restart,_self);
        }

    },
    restart: function () {
        __WEBPACK_IMPORTED_MODULE_1__player_js__["a" /* default */].restart();
        console.log(this.stateText);
        this.stateText.visible = false;
    },
}

game.init();

/***/ })
/******/ ]);