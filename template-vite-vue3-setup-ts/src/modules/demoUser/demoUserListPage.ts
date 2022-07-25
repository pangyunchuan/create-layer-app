import {PageVue3} from "layer-app";
import {reactive} from "vue";
import DemoUserModel from "@/modules/demoUser/DemoUserModel";

class DemoUserListPage extends PageVue3 {
    list: DemoUserModel[] = [];
    params = {
        page: 1,
        rows: 20,
        keyword: ''
    }
    total: number = 1;


    getData(p = this.params) {
        DemoUserModel.getList(p).then((r) => {
            this.list = r.models;
            this.total = r.total;
        })
    }

}


export default reactive(new DemoUserListPage());
