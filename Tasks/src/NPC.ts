class NPC extends egret.DisplayObjectContainer implements Observer {
    private npcId:string;
    private npcName:string;
    private emoji:egret.Bitmap;
    private npcApperance: egret.Bitmap;
    private taskList: { [index: string]: Task } = {};

    public constructor(Id:string,Name:string,x:number,y:number,openPanel:DialoguePanel){
        super();
        this.npcId = Id;
        this.npcName = Name;
         this.initNpcApperance(x, y);

        var onClick: Function = function () {
            this.onNPCClick(openPanel);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onClick, this);
    }

    private initNpcApperance(x: number, y: number) {
        if(this.npcId == "npc_01"){
            this.npcApperance = createBitmapByName("npc_1_png");
        }else if(this.npcId == "npc_02"){
            this.npcApperance = createBitmapByName("npc_2_png");
        }

        
        this.npcApperance.x = x;
        this.npcApperance.y = y;
        this.addChild(this.npcApperance);

        this.emoji = createBitmapByName("Task_Emoji_NewTask_png");
        this.emoji.x = x;
        this.emoji.y = y;
        this.emoji.scaleX = this.emoji.scaleY = 3;
        this.addChild(this.emoji);
        this.emoji.alpha = 0;
    }
    public getNpcId() {
        return this.npcId;
    }

    
    public onNPCClick(openPanel: DialoguePanel){
        if (this.taskList[0] == null) {
            openPanel.updatePanel(this.npcName, "Hello.", null, null);
        } else if (this.taskList[0].status == TaskStatus.SUBMITTED)
            openPanel.updatePanel(this.npcName, "Hello.", null, null);
        else {
            this.judgeTask();
            openPanel.updatePanel(this.npcName, this.taskList[0].name.toString(), this.taskList[0].desc.toString(), this.taskList[0]);
        }

        openPanel.showPanel();
    }

    private judgeTask() {
        if (this.npcId == this.taskList[0].toNpcId) {
            this.taskList[0].status = TaskStatus.CAN_SUBMIT;
            this.taskList[0].desc = "Oh, you find me.";
        }
    }
    public getTask() {

        var rule: Function = (taskList) => {
            var temp: Task[] = [];
            for (var k in taskList) {
                var task: Task = taskList[k];
                if (task.fromNpcId == this.npcId && task.status == TaskStatus.ACCEPTABLE) {
                    temp.push(task);
                }

                if (task.toNpcId == this.npcId && task.status == TaskStatus.DURING)
                    temp.push(task);

            }
            return temp;
        };
        this.taskList = TaskService.getInstance().getTaskByCustomRole(rule);

        this.checkEmoji();
    }

    private checkEmoji() {
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
    }

    public onChange(task:Task) {
        this.getTask();
        this.checkEmoji();
	}
}