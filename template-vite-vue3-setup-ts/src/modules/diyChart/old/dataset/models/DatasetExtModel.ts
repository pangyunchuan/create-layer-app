import { RequestModel } from "layer-app";

export interface IDatasetField {
  alias: string;
  maskingRule: string;
  meaning: string;
  name: string;
  ord: number;
  propertyType: string;
  propertyValue: string;
  table: string;
  visible: "1" | "0";
}

export interface IDatasetExt {
  datasetNote: { notfilepath: string, notetext: string };
  fieldConfigure: IDatasetField[];
}

export interface IFilterRule {
  ruleCode: string;
  ruleContext: string;
  ruleName: string;
  ruleOrd: number;
}

export default class DatasetExtModel extends RequestModel<IDatasetExt> {
  protected static url = "/index-service-desk/potal/tools/extractdataaction/";
  protected data: IDatasetExt = {
    datasetNote: { notfilepath: "", notetext: "" },
    fieldConfigure: []
  };

  static async getDetail(datasetId: string, isOverload = false) {
    return this.setReq(this.newReq().setGet("getDataSetFieldConfigure.do", {
      datasetId,
      isOverload,
      isDistinct: true
    })).reqOne().then(r=>{
      for (const fieldInfo of r.fieldConfigure) {
        fieldInfo.meaning = fieldInfo.meaning || fieldInfo.name || "";
        fieldInfo.alias = fieldInfo.alias || "";
      }
      return r;
    });
  }

  async upNoteFile(file: Blob) {
    let fileData = new FormData();
    fileData.append("file", file);
    return this.newReq().setPost(this.parseUrl("importDataSetNoteFile.do"), fileData)
      .request<{ flag: boolean, filepath: string }>()
      .then(r => {
        if (r.flag) {
          this.data.datasetNote.notfilepath = r.filepath;
        }
        return r;
      });
  }

  /**
   * 脱敏规则列表
   */
  static async getFilterRules() {
    return this.newReq().setGet(this.parseUrl("getMaskingRuleCodeByRuleCode.do")).request<IFilterRule[]>();
  }

  async save(datasetId: string) {
    return this.newReq().setPost(this.parseUrl("submitDataSetFieldConfigure.do"), {
      datasetId,
      ...this.data
    }).request();
  }
}
