//组合报表  自定义筛选
export type DatasetType = "report_service" | "customer_fetch"

export const dataTypeOptions: {
  mask: string,
  name: string
}[] = [
  {
    mask: "DATE",
    name: "日期"
  },
  {
    mask: "AREA",
    name: "地域"
  },
  {
    mask: "KPI",
    name: "指标"
  }
];
export const dataTypeValueOptions: Record<string, {
  child: [],
  field: string,
  name: string,
  pfield: string,
  property: {
    columntype: string,
    kind: string
  }
}[]> = {
  DATE: [
    {
      child: [],
      field: "DAY_ID",
      name: "日",
      pfield: "DATE",
      property: {
        columntype: "1",
        kind: "1"
      }
    },
    {
      child: [],
      field: "MONTH_ID",
      name: "月",
      pfield: "DATE",
      property: {
        columntype: "1",
        kind: "1"
      }
    }
  ],
  AREA: [],
  KPI: []
};
