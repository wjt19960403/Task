var Task = (function () {
    function Task(id, name, desc, fromNpcId, toNpcId) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = TaskStatus.UNACCEPTABLE;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
    p.getTaskId = function () {
        return this.id;
    };
    p.getTaskName = function () {
        return this.name;
    };
    p.getTaskDesc = function () {
        return this.desc;
    };
    p.getTaskStatus = function () {
        return this.status;
    };
    p.getFromNpcId = function () {
        return this.fromNpcId;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map