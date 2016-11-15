class TaskPanel extends egret.DisplayObjectContainer implements Observer {
    private panelContainer: egret.DisplayObjectContainer;
    private backgroundPicture: egret.Shape;
    public textField: egret.TextField;
    private button: egret.Shape;
    public task: Task;

    public constructor(x: number,y: number){
        super();
        this.panelContainer = new egret.DisplayObjectContainer();
        this.panelContainer.x = 0;
        this.panelContainer.y = y * 3 / 4;
        this.panelContainer.width = x;
        this.panelContainer.height = 172;
        this.addChild(this.panelContainer);

        this.backgroundPicture = new egret.Shape();
    }

    public onChange(task:Task) {}
}
