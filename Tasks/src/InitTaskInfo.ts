class initTaskInfo extends egret.DisplayObjectContainer{
     constructor(stageWidth: number, stageHeight: number) {
        super();
        var taskService: TaskService = TaskService.getInstance();

        //Task父类 不同类型Task继承 但是无法找到继承者属性
        //var task_FindNpc_01 = new Task_FindNpc("01", "FindThatGuy", "npc_01", "npc_02");
        var task_FindNpc_01 = new Task("01","First task", "FindThatGuy", "npc_01", "npc_02");
        task_FindNpc_01.status = TaskStatus.ACCEPTABLE;
        task_FindNpc_01.desc = "Go to find him.";
        taskService.addTask(task_FindNpc_01);

        var panel_Task = new TaskPanel(stageWidth, stageHeight)//(this.stage.width, this.stage.height);
        taskService.addObserver(panel_Task);
        this.addChild(panel_Task);

        var panel_Npc = new DialoguePanel(stageWidth, stageHeight)//(this.stage.width, this.stage.height);
        this.addChild(panel_Npc);

        var npc_FriendNpc01 = new NPC("npc_01", "和蔼的老太", 30, 30, panel_Npc);
        this.addChild(npc_FriendNpc01);
        taskService.addObserver(npc_FriendNpc01);
        npc_FriendNpc01.getTask();

        var npc_FriendNpc02 = new NPC("npc_02", "精壮的老汉", 360, 680, panel_Npc);
        this.addChild(npc_FriendNpc02);
        taskService.addObserver(npc_FriendNpc02);
        npc_FriendNpc02.getTask();

        var panelOpener: egret.TextField = new egret.TextField();
        this.addChild(panelOpener);
        panelOpener.text = "ClickToOpenTaskPanel";
        panelOpener.x = panelOpener.y = 10;
        panelOpener.touchEnabled = true;
        panelOpener.addEventListener(egret.TouchEvent.TOUCH_BEGIN, panel_Task.showPanel, panel_Task);

        this.setChildIndex(panel_Npc, 10);
        //this.addChild(npc_FriendNpc01.NpcApperance); 为何不能这么写？
    }
}