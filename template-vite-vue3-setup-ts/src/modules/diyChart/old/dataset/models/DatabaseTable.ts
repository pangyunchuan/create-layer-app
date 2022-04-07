import { RequestModel } from "layer-app";

export interface ITable {
  tableName: string;
}

export default class DatabaseTable extends RequestModel<any> {
  protected static url = "/index-service-desk/potal/tools/extractdataaction/";
  protected data = { tableName: "" };
  primaryKey = "";

  static async getList(datasourceId: string, keyword = "") {
    return this.newReq().setGet(this.parseUrl("getDataTableOptional.do"), {
      datasourceId,
      keyword
    }).request<ITable[]>();
  }

  static async getTableData(datasourceId: string, tableName: string) {
    return this.newReq().setGet(this.parseUrl("getDataTableDetails.do"), {
      datasourceId,
      tableName
    }).request<ITable[]>();
  }

}
