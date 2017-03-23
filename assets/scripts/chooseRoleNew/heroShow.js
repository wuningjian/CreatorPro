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

        btn_list: {
            default: null,
            type: cc.Node
        },

        spriteFrameList: {
            default: [],
            type: cc.SpriteFrame
        },

        infoFrameList: {
            default: [],
            type: cc.SpriteFrame
        },

        mask: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

        this.changeHero(null, 0);

    },

    changeHero: function (target, heroIndex) {
        //判断输入heroIndex是否合法
        if(heroIndex>=0 && heroIndex<this.spriteFrameList.length){
            //英雄动效展示
            this.node.getComponent(cc.Sprite).spriteFrame = this.spriteFrameList[heroIndex];
            this.node.opacity = 120;
            this.node.scale = 1.5;
            this.node.runAction(cc.spawn(cc.fadeIn(0.2), cc.sequence(cc.scaleTo(0.2, 0.9), cc.scaleTo(0.05, 1))));

            //介绍展示
            this.mask.height = 100;
            var heroInfoNode = this.mask.getChildByName("heroInfo");
            cc.log(heroInfoNode);
            heroInfoNode.getComponent(cc.Sprite).spriteFrame = this.infoFrameList[heroIndex];
            heroInfoNode.opacity = 20;
            heroInfoNode.runAction(cc.fadeIn(0.3));

            //按钮处理
            for(var i = 0; i < this.infoFrameList.length; i++){
                if(i == heroIndex){
                    var targetBtnNode = this.btn_list.getChildByName('roleIcon' + i);
                    targetBtnNode.getComponent(cc.Button).interactable = false;
                    this.btn_list.getChildByName('iconFrame').setPosition(targetBtnNode.x, targetBtnNode.y);
                }else{
                    this.btn_list.getChildByName('roleIcon' + i).getComponent(cc.Button).interactable = true;
                }
            }
            
        }else{
             //不合法heroIndex
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.mask.height > 0){
            this.mask.height -= 2;
        }


    },
});
