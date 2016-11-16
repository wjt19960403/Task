var TaskService = (function () {
    function TaskService() {
        TaskService.count++;
        if (TaskService.count > 1)
            throw "OverUse";
    }
    var d = __define,c=TaskService,p=c.prototype;
    d(p, "TaskList"
        ,function () {
            return this.taskList;
        }
    );
    TaskService.getInstance = function () {
        if (TaskService.instance == null)
            TaskService.instance = new TaskService();
        return TaskService.instance;
    };
    p.addTask = function (value) {
        // if (value == null)
        //     throw value + "isNull";
        // if (value == this.taskList[value.id])
        //     throw value.id + "isExist";
        this.taskList[value.id] = value;
    };
    p.addObserver = function (value) {
        for (var i = 0; i < this.observerList.length; i++) {
            if (value == this.observerList[i])
                return;
        }
        this.observerList.push(value);
    };
    p.finish = function (id) {
        if (id == null) {
            throw "Id is null";
        }
        var temp = this.taskList[id];
        if (temp.status == TaskStatus.CAN_SUBMIT) {
            temp.status = TaskStatus.SUBMITTED;
            this.notify(temp);
            return;
        }
        throw id + "CantFinish";
    };
    p.accept = function (id) {
        var temp = this.taskList[id];
        if (temp.status == TaskStatus.ACCEPTABLE)
            temp.status = TaskStatus.DURING;
        this.notify(temp);
    };
    p.notify = function (value) {
        this.observerList.forEach(function (element) {
            element.onChange(value);
        });
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map