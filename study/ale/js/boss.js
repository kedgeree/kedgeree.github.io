var boss = {
    init: function (game) {
        this._game = game;
        this._boss = this._game.add.sprite(330, 60, 'haha');

        this._game.physics.enable(this._boss, Phaser.Physics.ARCADE);
        this._boss.body.immovable = true;

        return this._boss;
    }
}
export  default  boss;