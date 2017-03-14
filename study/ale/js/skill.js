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
export  default  skill;