var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this.taskList = {};
        this.isOpen = false;
        this.panelContainer = new egret.DisplayObjectContainer();
        this.panelContainer.x = 0;
        this.panelContainer.y = y * 3 / 4;
        this.panelContainer.width = x;
        this.panelContainer.height = 172;
        this.addChild(this.panelContainer);
        this.backgroundPicture = new egret.Shape();
        this.backgroundPicture.graphics.beginFill(0x000000, 0.5);
        this.backgroundPicture.graphics.drawRect(0, 0, x, 100);
        this.backgroundPicture.graphics.endFill();
        this.panelContainer.addChild(this.backgroundPicture);
        this.textField = new egret.TextField();
        this.textField.x = 50;
        this.textField.y = 20;
        this.textField.text = "";
        this.panelContainer.addChild(this.textField);
        this.button = new egret.Shape();
        this.button.graphics.beginFill(0x000000, 0.5);
        this.button.graphics.drawRect(x - 200, 20, 150, 50);
        this.button.graphics.endFill();
        this.panelContainer.addChild(this.button);
        this.panelContainer.x = x;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.updateTask = function (task) {
        this.taskList[task.id] = task;
        this.textField.text = this.taskList[task.id].name + task.status.toString();
    };
    p.showPanel = function () {
        this.isOpen = !this.isOpen;
        egret.Tween.get(this.panelContainer).to({ x: this.isOpen ? this.panelContainer.x - this.panelContainer.width : this.panelContainer.x + this.panelContainer.width }, 500);
    };
    p.onButtonClick = function () {
        this.showPanel();
        return;
        switch (this.taskList["01"].status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept(this.taskList["01"].id);
                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish(this.taskList["01"].id);
                break;
            default:
                break;
        }
    };
    p.onChange = function (task) {
        this.updateTask(task);
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map