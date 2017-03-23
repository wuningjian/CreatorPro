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
        serverName: {
            default: null,
            type: cc.Label
        },
        serverTag: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    init: function (info) {
        this.serverName.string = 'server' + info;
        this.getComponent(cc.Button).clickEvents[0].customEventData = info;
    },

    clickBtnCb: function (target, inputParam) {
        cc.log("clickBtnCb: " + inputParam);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
