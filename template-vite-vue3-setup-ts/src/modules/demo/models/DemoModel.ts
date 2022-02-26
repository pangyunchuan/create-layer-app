import {RequestModel} from "layer-app";

interface IDemo {
    id: string,
    name: string,
    created: string
}

export default class DemoModel extends RequestModel<IDemo> {
    protected data: IDemo = {
        id: '', name: '', created: ''
    }
    protected url = '/mock/demo/'


    static async list() {
        return this.setReq(this.newReq().setGet('list')).reqMany()
    }
}
