class Task {
    id:string;
	name:string;
	desc:string;
	status:number;
	fromNpcId:string;
	toNpcId:string;

    public constructor(id:string,name:string,desc:string,status:number,fromNpcId:string,toNpcId) {
		this.id =id;
		this.name = name;
		this.desc = desc;
		this.status = status;
		this.fromNpcId =fromNpcId;
		this.toNpcId = toNpcId;

	}
}