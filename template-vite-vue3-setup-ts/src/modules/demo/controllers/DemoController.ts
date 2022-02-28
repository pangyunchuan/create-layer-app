import {Vue3Controller} from "layer-app";
import DemoModel from "@/modules/demo/models/DemoModel";

export default class DemoController extends Vue3Controller {
    list: Awaited<ReturnType<typeof DemoModel["list"]>> = [];
    listDefaultModelType:Awaited<ReturnType<typeof DemoModel["listDefault"]>> = [];

    async getList() {
        return DemoModel.list().then(r => {
            this.list = r;
            const m = this.list[0]
            m.save1().then(r=>{
                console.log(r);
                console.log(123,this.list[0])
            })

        })
    }
}

