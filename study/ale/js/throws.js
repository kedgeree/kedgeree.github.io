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
export  default throws;