cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0
    },

    // use this for initialization
    onLoad: function () {

    },
    
    getRoleDis: function () {
        var rolePosition = this.game.role.getPosition();
        var dist = cc.pDistance(this.node.position, rolePosition);
        return dist;
    },
    
    onPick: function () {
        this.node.destroy();
        this.game.gainScore();
        this.game.spawnNewStar();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.getRoleDis() < this.pickRadius){
            this.onPick();
            return;
        }

    },
});
