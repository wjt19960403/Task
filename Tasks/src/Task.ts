class Task {
    id:string;
	name:string;
	desc:string;
	status:TaskStatus;
	fromNpcId:string;
	toNpcId:string;

    public constructor(id:string,name:string,desc:string,fromNpcId:string,toNpcId) {
		this.id =id;
		this.name = name;
		this.desc = desc;
		this.status = TaskStatus.UNACCEPTABLE;
		this.fromNpcId =fromNpcId;
		this.toNpcId = toNpcId;

	}

	public getTaskId(){
		return this.id;
	}
	public getTaskName(){
		return this.name;
	}
	public getTaskDesc(){
		return this.desc;
	}
	public getTaskStatus(){
		return this.status;
	}
	public getFromNpcId(){
		return this.fromNpcId;
	}
}