import { RequestModel } from "layer-app";

export interface IDatabase {
  databaseName: string;
  datasourceId: string;
  datasourceName: string;
}

export default class Database extends RequestModel<IDatabase> {
  protected static url = "/index-service-desk/potal/tools/extractdataaction/";
  protected data = {
    databaseName: "",
    datasourceId: "",
    datasourceName: ""
  };
  primaryKey = "";

  static async getAll() {
    return this.newReq().setGet(this.parseUrl("getDataSourceLinkList.do")).request<IDatabase[]>();
  }
}
