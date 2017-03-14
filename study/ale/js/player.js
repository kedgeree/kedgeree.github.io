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
export default player;