import {Vue3Controller} from "layer-app";
import DemoModel from "@/modules/demo/models/DemoModel";

export default class DemoController extends Vue3Controller {
    list: (ReturnType<DemoModel["createModel"]>)[] = []

    async getList() {
        return DemoModel.list().then(r => {
            this.list = r;
        })
    }
}

