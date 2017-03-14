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

        this.haha = boss.init(this._game);
        this._player = player.init(this._game);

        this._skill = skill.init(this._game);
        throws.init(this._game);

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

            skill.update(this._fightButton, player._direction, this._reverse,  {x: this._player.body.x, y: this._player.body.y});
            player.control(this._cursors, this._fightButton, this._skill, this._reverse);

            throws.update(this.haha, this._player, this._skill);


            this._game.physics.arcade.collide(this._player, this.haha);
            this._game.physics.arcade.collide(this._skill, this.haha, function () {
                _self._reverse = true;
            });

        }else{
            throws.allKill();
            this.stateText.text = 'GAME OVER!';
            this.stateText.visibility = true;

            this._game.input.onTap.addOnce(this.restart,_self);
        }

    },
    restart: function () {
        player.restart();
        console.log(this.stateText);
        this.stateText.visible = false;
    },
}

game.init();