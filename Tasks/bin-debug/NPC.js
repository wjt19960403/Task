var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(Id, Name, x, y, openPanel) {
        _super.call(this);
        this.npcId = Id;
        this.npcName = Name;
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
    };
    p.onChange = function (task) {
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map