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
            default: [],
            type: cc.Node
        },

        rolePageView: {
            default: null,
            type: cc.PageView
        },

        btnSelectedMark: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // 按钮点击回调，param 0-战士 1-法师 2-道士
    roleBtnCallback: function (target, param) {
        this.rolePageView.scrollToPage(param, 0.1);
    },

    // pageView翻页回调 
    pageChangeCallback: function (target, param) {
        var index = this.rolePageView.getCurrentPageIndex();
        cc.log("page index: " + index);
        // 这里有问题！！！有时候index返回来的是 01 而不是 1 或者是 0 ，导致下面数组索引就会出错
        this.btnSelectedMark.setPosition(this.btn_list[index].x, this.btnSelectedMark.y);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
