import {RequestModel} from "layer-app";
import {DatasetType} from "@/modules/diyChart/old/dataset/models/DatasetType";
import {random} from "lodash-es";

export interface IDatasetListItem {
    chlName: string;//地域名
    createTime: string;//创建时间
    creator: string; //创建人id
    //report_service:组合报表
    //customer_fetch:customer_fetch
    datasetType: DatasetType;
    id: string;
    isCollect: boolean;//收藏
    isRevoke: boolean;//撤回
    isUsed: boolean;//被使用
    name: string;//名称
    state: -1 | 0 | 1;
    userName: string;//创建用户名
}

export type getListParamsType = {
    type: "extract-release" | "extract-create",
    page: number,
    rows: number,
    keyword: string,
    directoryId: string
}

const urlPrev1 = "/index-service-desk/potal/tools/extractdataaction/";

export default class DatasetListItemModel extends RequestModel<IDatasetListItem> {
    protected static url = "/index-service-desk/potal/tools/reportspaceaction/";
    protected primaryKey = "id";
    protected data: IDatasetListItem = {
        chlName: "",
        createTime: "",
        creator: "",
        datasetType: "report_service",
        id: "",
        isCollect: false,
        isRevoke: false,
        isUsed: false,
        name: "",
        state: -1,
        userName: ""
    };

    get stateText() {
        return {"-1": "未完成", 0: "未发布", 1: "已发布"}[this.data.state];
    }

    get datasetTypeText() {
        return {"report_service": "组合报表", "customer_fetch": "自定义筛选"}[this.data.datasetType];
    }

    get isMy() {
        return random(0, 1) === 1;
    }

    get isCanUse() {
        return this.data.state !== -1;
    }

    get isCanBuildReport() {
        return this.isMy && this.data.datasetType === "report_service" && this.isCanUse;
    }

    get isCanPublish() {
        return this.isMy && this.data.state !== -1;
    }

    get isMyPublish() {
        return this.isMy && this.data.state === 1;
    }

    get isCanDel() {
        return this.isMy && this.data.state !== 1 && !this.data.isUsed;
    }

    static async getList(params: getListParamsType) {
        return this.setReq(this.newReq().setGet("getReportList.do", params))
            .reqManyOther<{ rows: any, total: number }, "rows">("rows");
    }

    async del() {
        return this.newReq().setPost(
            this.parseUrl('removeDataSet.do', urlPrev1),
            {datasetId: this.data.id}
        ).request();
    }

    // 撤销发布
    async revoke() {
        return this.newReq().setPost(this.parseUrl("revokeReleaseReport.do", urlPrev1), {datasetId: this.data.id}).request().then(() => {
            this.data.state = 0;
            this.data.isRevoke = true;
        });
    }

    static async dirTree(type: getListParamsType["type"]) {
        return this.newReq().setGet(this.parseUrl("getReportDirectoryTreeList.do"), {type, grantflag: false}).request();
    }
}
