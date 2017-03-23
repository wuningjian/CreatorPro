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
        
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        role: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        
        // 
        serverBtn: {
            default: null,
            type: cc.Prefab
        },

        serverList: {
            default: null,
            type: cc.ScrollView
        }
    },

    // use this for initialization
    onLoad: function () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        
        //计时的
        this.timer = 0;
        this.duration = 0;
        
        // 生成一个新的星星
        this.spawnNewStar();
        // 初始化计分
        this.score = 0;

        this.spawnServerBtn();  
    },

    spawnServerBtn: function () {
        var serverListNum = [1,2,3,4,5,6,7,8,9,10];

        var content = this.serverList.content;

        // var newServerBtn = cc.instantiate(this.serverBtn);
        // this.node.addChild(newServerBtn);
        // newServerBtn.setPosition(cc.p(100,100));
        // newServerBtn.getComponent("serverBtnJS").init(66);

        for(var i = 0; i < serverListNum.length; i++){
            var newServerBtn = cc.instantiate(this.serverBtn);
            newServerBtn.getComponent("serverBtnJS").init(serverListNum[i]);
            content.addChild(newServerBtn);
        }
        
        // ss.string = "first";

        // var temp = newServerBtn.getComponent(cc.Button);
        // temp.clickEvents[0].customEventData = 66;

    },
    
    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("star").game = this;
        this.duration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.role.getComponent('role').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    },
    
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },
    
    gameOver: function () {
        this.role.stopAllActions(); //停止 player 节点的跳跃动作
        cc.director.loadScene('game');
    },
 
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.timer > this.duration){
            //this.gameOver();
        }
        this.timer += dt;
    },
});
