import player from './player.js';
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
        player._decreaseLive();
    },
    _skillMonster: function (skill, m) {
        m.kill();
        skill.kill();
    },
    _heartsOnPlayer: function (pl, h) {
        h.kill();
        player._increaseLive();
    },
    restart: function () {
        this._throwss.callAll('revive');
        this._monsters.callAll('revive');
        this._hearts.callAll('revive');
    }
}
export  default throws;