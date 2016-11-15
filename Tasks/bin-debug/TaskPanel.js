var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this.panelContainer = new egret.DisplayObjectContainer();
        this.panelContainer.x = 0;
        this.panelContainer.y = y * 3 / 4;
        this.panelContainer.width = x;
        this.panelContainer.height = 172;
        this.addChild(this.panelContainer);
        this.backgroundPicture = new egret.Shape();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) { };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map