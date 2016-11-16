class TaskService {
    private static instance;
    private static count = 0;
    private observerList:Observer[];
	private taskList:Task[];

    constructor() {
        TaskService.count++;
        if (TaskService.count > 1)
            throw "OverUse";
    }
    public get TaskList() {
        return this.taskList;
    }
    public static getInstance() {
        if (TaskService.instance == null)
            TaskService.instance = new TaskService();
        return TaskService.instance;
    }

    public addTask(value: Task) {
        // if (value == null)
        //     throw value + "isNull";
        // if (value == this.taskList[value.id])
        //     throw value.id + "isExist";
        this.taskList[value.id] = value;
    }

    public addObserver(value: Observer) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (value == this.observerList[i])
                return;
        }
        this.observerList.push(value);
    }

    public finish(id:string):void {
        if (id == null) {
            throw "Id is null";
        }
        var temp: Task = this.taskList[id];
        if (temp.status == TaskStatus.CAN_SUBMIT) {
            temp.status = TaskStatus.SUBMITTED;
            this.notify(temp);
            return;
        }
        throw id + "CantFinish";
    }

    public accept(id:string):void {
        var temp: Task = this.taskList[id];
        if (temp.status == TaskStatus.ACCEPTABLE)
            temp.status = TaskStatus.DURING;
        this.notify(temp);
    }

    private notify(value: Task): void {
        this.observerList.forEach(element => {
            element.onChange(value);
        });
    }

}