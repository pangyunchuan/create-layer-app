import StepMan from "@/modules/diyChart/components/step/StepMan";
import DatasetModel, { IDataset } from "@/modules/diyChart/old/dataset/models/DatasetModel";
import { merge } from "lodash-es";
import { onBeforeUnmount, reactive } from "vue";


class DatasetEditPage {
  step = new StepMan();
  datasetId = "";
  isModify = false;

  datasetModel: DatasetModel & IDataset = DatasetModel.createModel();

  async setDatasetModel(id: string) {
    this.datasetId = id;
    return DatasetModel.getDetail(id).then(r => {
      this.datasetModel = r;
    });
  }

  async save() {
    return this.datasetModel.save().then(() => {
      this.isModify = false;
    });
  }

  reset() {
    merge(this, new DatasetEditPage());
  }

  resetWhenUnmount() {
    onBeforeUnmount(() => {
      this.reset();
    });
  }
}

export default reactive(new DatasetEditPage());
