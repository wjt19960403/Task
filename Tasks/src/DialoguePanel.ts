class DialoguePanel extends egret.DisplayObjectContainer implements Observer{
    private panelContainer: egret.DisplayObjectContainer;
    private bg: egret.Shape;
    public npcName: egret.TextField;
    public taskName: egret.TextField;
    public taskDesc: egret.TextField;;
    
    private okButton:egret.Bitmap;
    public oneTask: Task;

    constructor(x: number, y: number) {
        super();

        this.panelContainer = new egret.DisplayObjectContainer();
        this.panelContainer.x = x * 1 / 10;
        this.panelContainer.y = y * 1 / 10;
        this.panelContainer.width = x * 3 / 5;
        this.panelContainer.height = y * 2 / 5;
        this.addChild(this.panelContainer);

        this.bg = new egret.Shape();
        this.bg.graphics.beginFill(0x000000, 0.5);
        this.bg.graphics.drawRect(0, 0, x * 4 / 5, this.panelContainer.height);
        this.bg.graphics.endFill();
        this.panelContainer.addChild(this.bg);

        this.npcName = new egret.TextField();
        this.npcName.size = 50;
        this.npcName.x = 20;
        this.npcName.y = 20;
        this.npcName.text = "1111111:";
        this.panelContainer.addChild(this.npcName);

        this.taskName = new egret.TextField();
        this.taskName.x = 40;
        this.taskName.y = 100;
        this.taskName.text = "1111111:";
        this.panelContainer.addChild(this.taskName);

        this.taskDesc = new egret.TextField();
        this.taskDesc.x = 40;
        this.taskDesc.y = 150;
        this.taskDesc.text = "1111111:";
        this.panelContainer.addChild(this.taskDesc);

        this.okButton = new egret.Bitmap();
        this.okButton = createBitmapByName("ok_png");
        this.okButton.x = this.panelContainer.width - 210;
        this.okButton.y = this.panelContainer.height - 100;
        this.okButton.scaleX = this.okButton.scaleY = 0.5;
       
        this.panelContainer.addChild(this.okButton);

        this.panelContainer.y = this.panelContainer.y - 1000;

        this.okButton.touchEnabled = true;
        this.okButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
        
    }

    public updatePanel(npcName: string, taskName: string, taskDesc: string, oneTask: Task) {
        this.oneTask = oneTask;
        this.npcName.text = npcName + ":";
        this.taskName.text = taskName;
        this.taskDesc.text = taskDesc;
    }

    private isOpen: boolean = false
    public showPanel() {
        //console.log("ah")
        this.isOpen = !this.isOpen;
        egret.Tween.get(this.panelContainer).to({ y: this.isOpen ? this.panelContainer.y + 1000 : this.panelContainer.y - 1000 }, 500);
    }

    public onButtonClick() {
        this.showPanel();
        if (this.oneTask == null)
            return;

        switch (this.oneTask.status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept(this.oneTask.id);
                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish(this.oneTask.id);
                break;
            default:
                break;
        }
    }

    onChange(task: Task) {
    }
}