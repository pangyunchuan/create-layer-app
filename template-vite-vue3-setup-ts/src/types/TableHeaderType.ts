export type TableHeaderType = {
  "name": string,
  "field": string,
  "fixed": boolean,
  "sort": boolean,
  "defaultSort": string,
  "child": TableHeaderType[]
}
