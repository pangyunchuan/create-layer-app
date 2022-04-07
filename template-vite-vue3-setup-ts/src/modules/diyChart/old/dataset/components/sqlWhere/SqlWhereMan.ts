import { IDatasetField } from "@/modules/diyChart/old/dataset/models/DatasetExtModel";

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

export default class SqlWhereMan {
  setMustInfo(datasetId:string,wheres:IWhereItem[],fieldList:IDatasetField[],edit = true) {
    this.datasetId = datasetId;
    this.wheres = wheres
    this.fieldList = fieldList;
    this._isEdit = edit;
  }
  datasetId = ''
  fieldList:IDatasetField[] = []
  protected _isEdit = false;
  get isEdit(){
    return this._isEdit
  }

  wheres: IWhereItem[] = [];


  deepCheckWhere(whereItems: IWhereItem[] = this.wheres) {
    for (const whereItem of whereItems) {
      if (!whereItem.child.length) {
        if (whereItem.operator === "" || whereItem.field === "" || whereItem.op === "") {
          return true;
        } else if (!whereItem.op.includes("null") && !`${whereItem.val}`.length) {
          return true;
        }
      } else {
        if (this.deepCheckWhere(whereItem.child)) {
          return true;
        }
      }
    }
    return false;
  };
}
