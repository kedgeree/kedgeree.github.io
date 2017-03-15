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
    _getTapPos: function () {
      if(this._game.input.activePointer.isDown){
          return Math.floor(this._game.input.x / (this._game.width / 2));
      }
      return null;
    },
    _onSwipe: function () {
        console.log(Phaser.Point.distance(this._game.input.activePointer.position, this._game.input.activePointer.positionDown) );
        return (Phaser.Point.distance(this._game.input.activePointer.position, this._game.input.activePointer.positionDown) > 50
        && this._game.input.activePointer.duration > 100 && this._game.input.activePointer.duration < 250);
    },
    control: function (cursors , fightButton, skill, skillReverse) {
        this._skillReverse = skillReverse;
        if(cursors.left.isDown || this._getTapPos() == 0){
            this._player.body.velocity.x = -200;
            this._direction = 'left';
        }
        if(cursors.right.isDown || this._getTapPos() == 1){
            this._player.body.velocity.x = 200;
            this._direction = 'right';
        }
        if((cursors.up.isDown || this._onSwipe()) && this._player.y >= 130){
            this._player.body.velocity.y = -200;
        }
        if(cursors.down.isDown){
            this._player.body.velocity.y = 200;
            if(this._player.y >= 120){
                this._player.animations.play('down');
                this._player.body.setSize(70, 57, 0 , 16);
            }
        }
        if(fightButton.isDown){
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
export default player;