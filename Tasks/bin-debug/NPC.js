var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(Id, Name, x, y, openPanel) {
        _super.call(this);
        this.npcId = Id;
        this.npcName = Name;
        this.initNpcApperance(x, y);
        var onClick = function () {
            this.onNpcClick(openPanel);
        };
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.initNpcApperance = function (x, y) {
        this.npcApperance = createBitmapByName("npc_01_jpg");
        this.npcApperance.x = x;
        this.npcApperance.y = y;
        this.addChild(this.npcApperance);
        this.emoji = createBitmapByName("Task_Emoji_NewTask_png");
        this.emoji.x = x;
        this.emoji.y = y;
        this.emoji.scaleX = this.emoji.scaleY = 3;
        this.addChild(this.emoji);
        this.emoji.alpha = 0;
    };
    p.getNpcId = function () {
        return this.npcId;
    };
    p.onNPCClick = function (openPanel) {
        if (this.taskList[0] == null) {
            openPanel.updatePanel(this.npcName, "Hello.", null, null);
        }
        else if (this.taskList[0].status == TaskStatus.SUBMITTED)
            openPanel.updatePanel(this.npcName, "Hello.", null, null);
        else {
            this.judgeTask();
            openPanel.updatePanel(this.npcName, this.taskList[0].name.toString(), this.taskList[0].desc.toString(), this.taskList[0]);
        }
        openPanel.showPanel();
    };
    p.judgeTask = function () {
        if (this.npcId == this.taskList[0].toNpcId) {
            this.taskList[0].status = TaskStatus.CAN_SUBMIT;
            this.taskList[0].desc = "Oh, you find me.";
        }
    };
    p.getTask = function () {
        var _this = this;
        var rule = function (taskList) {
            var temp = [];
            for (var k in taskList) {
                var task = taskList[k];
                if (task.fromNpcId == _this.npcId && task.status == TaskStatus.ACCEPTABLE) {
                    temp.push(task);
                }
                if (task.toNpcId == _this.npcId && task.status == TaskStatus.DURING)
                    temp.push(task);
            }
            return temp;
        };
        this.taskList = TaskService.getInstance().getTaskByCustomRole(rule);
        this.checkEmoji();
    };
    p.checkEmoji = function () {
        if (this.taskList[0] == null) {
            this.emoji.alpha = 0;
            return;
        }
        if (this.taskList[0].fromNpcId == this.npcId) {
            switch (this.taskList[0].status) {
                case TaskStatus.UNACCEPTABLE:
                    this.emoji.alpha = 0;
                    break;
                case TaskStatus.ACCEPTABLE:
                    this.emoji.texture = RES.getRes("Task_Emoji_NewTask_png");
                    this.emoji.alpha = 1;
                    break;
                case TaskStatus.DURING:
                    this.emoji.texture = RES.getRes("Task_Emoji_DuringTask_png");
                    this.emoji.alpha = 1;
                    break;
                case TaskStatus.CAN_SUBMIT:
                    this.emoji.texture = RES.getRes("Task_Emoji_CanSubmitTask_png");
                    this.emoji.alpha = 1;
                    break;
                case TaskStatus.SUBMITTED:
                    this.emoji.alpha = 0;
                    break;
            }
        }
        else {
            switch (this.taskList[0].status) {
                case TaskStatus.UNACCEPTABLE:
                    this.emoji.alpha = 0;
                    break;
                case TaskStatus.ACCEPTABLE:
                    this.emoji.texture = RES.getRes("Task_Emoji_NewTask_png");
                    this.emoji.alpha = 0;
                    break;
                case TaskStatus.DURING:
                    this.emoji.texture = RES.getRes("Task_Emoji_CanSubmitTask_png");
                    this.emoji.alpha = 1;
                    break;
                case TaskStatus.CAN_SUBMIT:
                    this.emoji.texture = RES.getRes("Task_Emoji_CanSubmitTask_png");
                    this.emoji.alpha = 1;
                    break;
                case TaskStatus.SUBMITTED:
                    this.emoji.alpha = 0;
                    break;
            }
        }
    };
    p.onChange = function (task) {
        this.getTask();
        this.checkEmoji();
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map