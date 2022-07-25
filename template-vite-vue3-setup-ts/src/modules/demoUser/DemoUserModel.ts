import {RequestModel} from "layer-app";
import {reqKeys} from "layer-app/types/lib/config/requestClassConfig";

export interface IDemoUser {
    id: number,
    name: string,
    state: 0 | 1,
    note: string,
    dirId: string
}

export default class DemoUserModel extends RequestModel {
    //模型数据
    data = {
        id: 0,
        name: '',
        state: 0,
        note: '',
        dirId: ''
    }
    //默认请求类型
    // static reqType:reqKeys = 'default'
    //模型请求基础地址
    static url = '/demo/demoUser/'


    static getList(p: { page?: number, rows?: number, keyword: string }) {
        const pp = {page: 1, rows: 20, ...p}
        return this.setReq(this.newReq().setGet('list', pp)).reqManyOther<{ total: number }>('rows');
    }

}
