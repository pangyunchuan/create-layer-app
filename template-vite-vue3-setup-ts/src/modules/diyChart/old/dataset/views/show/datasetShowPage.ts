import StepMan from "@/modules/diyChart/components/step/StepMan";
import DatasetModel, {
  IDataset,
  SearchTableDataParamsType,
  TemplateDetailType
} from "@/modules/diyChart/old/dataset/models/DatasetModel";
import { merge } from "lodash-es";
import { onBeforeUnmount, reactive } from "vue";
import { IDatasetField } from "@/modules/diyChart/old/dataset/models/DatasetExtModel";


class DatasetShowPage {
  tab = ''

  searchParams: SearchTableDataParamsType = {
    fieldSelect: [],
    filterWhere: [],
    page: 1,
    rows: 20
  };

  fullField(item: IDatasetField) {
    return `${item.table}.${item.alias}`;
  }

  showSaveTemplateDialog = false;
  selectedListItemTemplate ?: {
    templateName: string, creator: string, datasetId: string, operation: string, templateId: string, creatTime: string
  };


  step = new StepMan();
  datasetId = "";
  datasetModel: DatasetModel & IDataset = DatasetModel.createModel();
  async setDatasetModel(id: string) {
    this.datasetId = id;
    return DatasetModel.getDetail(id).then(r => {
      this.datasetModel = r;
    });
  }

  reset() {
    merge(this, new DatasetShowPage());
  }

  resetWhenUnmount() {
    onBeforeUnmount(() => {
      this.reset();
    });
  }
}

export default reactive(new DatasetShowPage());
