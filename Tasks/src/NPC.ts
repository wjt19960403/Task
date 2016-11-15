class NPC extends egret.DisplayObjectContainer implements Observer {
    private npcId:string;
    private npcName:string;
    private emoji:egret.Bitmap;
    private task:Task;

    public constructor(Id:string,Name:string,x:number,y:number,openPanel:TaskPanel){
        super();
        this.npcId = Id;
        this.npcName = Name;
        
    }

    onNPCClick(){

    }
    onChange(task:Task) {

	}
}