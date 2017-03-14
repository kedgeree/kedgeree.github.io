import boss from './boss.js';
import  player from './player.js';
import skill from './skill.js';
import throws from './throws.js';

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
    },
    create: function () {

        this._game.world.setBounds(10, 10, 375, 200);
        this._game.add.sprite(10,10, 'bg');

        this.haha = boss.init(this._game);
        this._player = player.init(this._game);

        this._skill = skill.init(this._game);
        this._throws = throws.init(this._game);

        this.stateText = this._game.add.text(this._game.world.centerX, this._game.world.centerY,' ', { font: '40px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visibility = false;

        this._cursors = this._game.input.keyboard.createCursorKeys();
        this._fightButton = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    },
    update: function () {
        var _self = this;
        if(this._player.alive){
            player.normal();

            skill.update(this._fightButton, this._reverse, {x: this._player.body.x, y: this._player.body.y});
            player.control(this._cursors, this._fightButton);

            if(this._game.time.now > throws._throwTime){
                throws.update({x: this.haha.body.x, y: this.haha.body.y}, this._player);
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