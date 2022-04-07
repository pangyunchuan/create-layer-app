type stepItemInfo = { text: string, icon: string, component: any }

export default class StepMan {
  items: StepItem[] = [];
  private lastIndex = 0;
  private _activeIndex = 0;
  set activeIndex(index: number) {
    if (this._activeIndex !== index) {
      this.lastIndex = this._activeIndex;
      this._activeIndex = index;
    }
  }

  private stepNotShowState = false;

  //不展示步骤状态
  setNotShowState() {
    this.stepNotShowState = true;
  }

  get isStepNotShowState() {
    return this.stepNotShowState;
  }

  get activeIndex() {
    return this._activeIndex;
  }

  backStep() {
    this.activeIndex = this.lastIndex;
  }

  setItems(...items: stepItemInfo[]) {
    this.items = [];
    for (const item of items) {
      const stepItem = new StepItem(item, this);
      this.items.push(stepItem);
    }
  }

  get current() {
    return this.items[this.activeIndex];
  }


  get canNext() {
    return this.activeIndex < this.items.length - 1;
  }

  get canPre() {
    return this.activeIndex > 0;
  }

  preItem() {
    this.current.doCheck();
    if (this.canPre) {
      this.activeIndex--;
    }
  }

  nextItem() {
    this.current.doCheck();
    if (this.canNext) {
      this.activeIndex++;
    }
  }

  setCurrent(i: number) {
    this.current.doCheck();
    this.activeIndex = i;
  }


  //检查所有步骤
  async checkAll() {
    for (const item of this.items) {
      if (!await item.doCheck()) {
        return false;
      }
    }
    return true;
  }

}

export class StepItem {
  constructor(info: stepItemInfo, step: StepMan) {
    this.text = info.text;
    this.icon = info.icon;
    this.component = info.component;
    this.parent = step;
  }

  parent: StepMan;


  icon = "";
  text = "";
  component: any;
  state: "wait" | "error" | "success" = "wait";

  setWait() {
    this.state = "wait";
  }

  setSuccess() {
    this.state = "success";
  }

  setError() {
    this.state = "error";
  }

  get isWait() {
    return this.state === "wait";
  }

  get isError() {
    return this.state === "error";
  }

  get isSuccess() {
    return this.state === "success";
  }

  get isCurrent() {
    return this.parent.current.text === this.text;
  }

  async doCheck() {
    let res = await this.checkFun();
    if (!this.parent.isStepNotShowState) {
      res ? this.setSuccess() : this.setError();
    }
    return res;
  }

  //步骤检查函数,默认成功
  protected checkFun: () => Promise<boolean> = async () => true;

  setCheckFun(checkFun: () => Promise<boolean>) {
    this.checkFun = checkFun;
  }


  get buttonType() {
    if (this.isCurrent) {
      return "primary";
    }

    return {
      "wait": "info",
      "error": "danger",
      "success": "success"
    }[this.state];
  }
}
