import {RequestModel} from "layer-app";

interface IDemo {
    id: number,
    name: string,
    created: string
}

export default class Demo1Model extends RequestModel<IDemo> {
    protected data: IDemo = {
        id: 0, name: '', created: ''
    }
    //注意主键
    primaryKey = "id"
    //请求接口根路径
    protected url = '/mock/demo/'

    test() {
        (<Demo1Model>this).setReq(this.newReq().setGet('list')).reqMany(c => {
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
        //模型中仅使用 req，需要 使用 paresUrl
        return this.newReq().setPost(this.parseUrl('upCreated'), {
            id: this.data.id,
            created: this.data.created
        }).request()
    }

    //创建保存模型
    //方法名,最好不要和 下面的字符相同,会让 方法调用识别有问题
    async save1() {
        return (<Demo1Model>this).setReq(this.newReq().setPost("save", this.data)).reqSave()
    }
}
