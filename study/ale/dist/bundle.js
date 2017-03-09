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
/***/ (function(module, exports) {

var game = {
    _direction: 'left',
    init: function () {
        var _this = this;
        this._game = new Phaser.Game(385, 210, Phaser.AUTO, '', {
            preload: _this.preload.bind(this),
            create: _this.create.bind(this),
            update: _this.update.bind(this)    
        })
    },
    preload: function () {
        this._game.load.image('bg', 'assets/bg.png');
        this._game.load.spritesheet('wsm', 'assets/wsm.png', 65, 80, 6);
    },
    create: function () {

        this._game.world.setBounds(10, 10, 375 * 10, 200);

        this._game.add.sprite(0,0, 'bg');
        this._player = this._game.add.sprite(70, 90, 'wsm');
        this._player.animations.add('normal', [0,1], 2, true);
        this._player.animations.add('fight_left', [2, 3], 20,false);
        this._player.animations.add('fight_right', [4, 5], 20,false);
        this._player.animations.play('normal');

        this._game.physics.arcade.enable(this._player);
        this._player.body.gravity.y = 200;
        this._player.body.collideWorldBounds = true;


        this._cursors = this._game.input.keyboard.createCursorKeys();
        this._fightButton = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    },
    update: function () {
        this._player.body.velocity.x = 0;
        this._player.animations.play('normal');

        if(this._cursors.left.isDown){
            this._player.body.velocity.x = -200;
            this._direction = 'left';
        } else if(this._cursors.right.isDown){
            this._player.body.velocity.x = 200;
            this._direction = 'right';
        }else if(this._cursors.up.isDown ){
            this._player.body.velocity.y = -100;
        }else if(this._cursors.down.isDown){
            this._player.body.velocity.y = 0;
        } else if(this._fightButton.isDown){
            this._player.animations.play('fight_' + this._direction);
        }
    }
}

game.init();

/***/ })
/******/ ]);