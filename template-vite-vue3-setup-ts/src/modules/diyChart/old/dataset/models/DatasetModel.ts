import { RequestModel } from "layer-app";
import { DatasetType } from "@/modules/diyChart/old/dataset/models/DatasetType";
import DatasetExtModel, { IDatasetExt } from "@/modules/diyChart/old/dataset/models/DatasetExtModel";
import { TableHeaderType } from "@/types/TableHeaderType";
import datasetShowPage from "@/modules/diyChart/old/dataset/views/show/datasetShowPage";

export interface IDataset {
  datasetId: string;
  datasetName: string;
  datasetType: DatasetType;
  isUsed: false;
  processLogic: {
    datasourceId: string;
    datasetView: string;
    filterWhere: any[];
    processLogicDefined: {
      tableType: string;
      realityTableName: string;
      virtualTableDefined: {}
    }
  };
}

export interface IWhereItem {
  //逻辑关系
  logicOp?: string
  operator: string
  field: string
  //运算关系
  relationOp?: string
  op: string
  val: string | string[],
  child: IWhereItem[]
}

export type PreviewDataType = {
  header: TableHeaderType[],
  rows: Record<string, string | number>[]
}

export default class DatasetModel extends RequestModel<IDataset> {
  protected static url = "/index-service-desk/potal/tools/extractdataaction/";
  protected data: IDataset = {
    datasetId: "",
    datasetName: "未命名数据集",
    datasetType: "report_service",
    isUsed: false,
    processLogic: {
      datasourceId: "",
      datasetView: "",
      filterWhere: [],
      processLogicDefined: {
        tableType: "reality",
        realityTableName: "",
        virtualTableDefined: {}
      }
    }
  };

  ext: DatasetExtModel & IDatasetExt = DatasetExtModel.createModel();

  get datasetTypeText() {
    return { "report_service": "组合报表", "customer_fetch": "自定义筛选" }[this.data.datasetType] || "";
  }

  //更新关系
  async relationAsync() {
    return DatasetExtModel.getDetail(this.data.datasetId).then(r => {
      this.ext = r;
      return r;
    });
  }

  static async getDetail(datasetId: IDataset["datasetId"]) {
    return this.setReq(
      this.newReq().setGet("getDataSetProcessLogic.do", { datasetId })
    ).reqOne().then(async r => {
      await r.relationAsync();
      return r;
    });
  }

  async save(changeTable = false) {
    return this.newReq().setPost(
      this.parseUrl("submitDataSetProcessLogicConfigure.do"), this.data
    ).request().then((r) => {
      this.data.datasetId = r.data.datasetId;
      if (changeTable) {
        return this.relationAsync().then(asyncRes=>{
          return this.ext = asyncRes;
        });
      } else {
        return this.ext.save(this.data.datasetId);
      }
    });
  }

  //报表预览数据
  async getPreviewData() {
    const { datasetId } = this.data;
    return this.newReq().setGet(this.parseUrl("getDataSetPreviewInfo.do"), { datasetId })
      .request<PreviewDataType>();
  }


  //数据集数据查询
  async searchTableData(data: SearchTableDataParamsType) {
    data.rows = data.rows ?? 20;
    return this.newReq().setPost(this.parseUrl("getReleaseReportTableData.do"), {
      datasetId: this.data.datasetId,
      ...data
    }).request();
  }

  async getTemplateList(data: getTemplateListDataType) {
    return this.newReq().setGet(this.parseUrl(`getDataSetTemplate.do`), {
      datasetId: this.data.datasetId, ...data
    }).request();
  }

  /**
   * 模板详情
   */
  async getTemplateInfo(templateId: string) {
    return this.newReq().setGet(this.parseUrl("getDataSetTemplateById.do"), {
      datasetId: this.data.datasetId, templateId
    }).request<TemplateDetailType>();
  }

  /**
   * 提交模板
   */
  async saveTemplate(data: TemplateDetailType) {
    return this.newReq().setPost(this.parseUrl("submitDataSetTemplate.do"), {
      datasetId: this.data.datasetId, ...data
    }).request();
  }

  //删除模板
  async delTemplate(templateId: string) {
    return this.newReq().setGet(this.parseUrl("delDataSetTemplate.do"), {
      datasetId: this.data.datasetId, templateId
    }).request();
  }


  async downExcel(data: Pick<SearchTableDataParamsType, "fieldSelect" | "filterWhere">) {
    return this.newReq().setPost(this.parseUrl("getDataSetExcel.do"), {
      datasetId: this.data.datasetId, ...data
    }).request();
  }
}
export type getTemplateListDataType = {
  type: "0" | "1" | "2", text: string, page: number, rows: number
}
export type TemplateDetailType = {
  templateId: string,
  templateName: string,
  checkLogic: {
    filterWhere: IWhereItem[],
    fieldSelect: string[]
  }
}

export type SearchTableDataParamsType = {
  fieldSelect: string[],
  filterWhere: IWhereItem[],
  page: number,
  rows: number
}
