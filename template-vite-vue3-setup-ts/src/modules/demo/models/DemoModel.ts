import {RequestModel} from "layer-app";

interface IDemo {
    id: number,
    name: string,
    created: string
}

export default class DemoModel extends RequestModel<IDemo> {
    protected data: IDemo = {
        id: 0, name: '', created: ''
    }
    primaryKey = "id"
    protected url = '/mock/demo/'

    test(){
        (<DemoModel>this).setReq(this.newReq().setGet('list')).reqMany(c=>{
            c.test()
        })
    }

    static async listDefault() {
        return this.setReq(this.newReq().setGet('list')).reqMany()
    }

    static async list() {
        return this.setReq(this.newReq().setGet('list')).reqMany<Pick<IDemo, "id">>()
    }

    //更新模型字段
    async upCreated() {
        return this.newReq().setPost('upCreated', {id: this.data.id, created: this.data.created}).request()
    }

    //创建保存模型
    //方法名,最好不要和 下面的字符相同,会让 方法调用识别有问题
    async save1() {
        return (<DemoModel>this).setReq(this.newReq().setPost("save", this.data)).reqSave()
    }
}
