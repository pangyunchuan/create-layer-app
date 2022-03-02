import {Vue3Controller} from "layer-app";
import Demo1Model from "@/modules/demo1/models/Demo1Model";

export default class Demo1Controller extends Vue3Controller {
    list: Awaited<ReturnType<typeof Demo1Model["list"]>> = [];
    listDefaultModelType:Awaited<ReturnType<typeof Demo1Model["listDefault"]>> = [];

    async getList() {
        return Demo1Model.list().then(r => {
            this.list = r;
            const m = this.list[0]
            m.save1().then(r=>{
                console.log(r);
                console.log(123,this.list[0])
            })

        })
    }
}

