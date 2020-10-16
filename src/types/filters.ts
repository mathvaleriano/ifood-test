export enum PrimitiveTypes {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
}

export enum EntityTypes {
  DATE_TIME = "DATE_TIME",
}

export type Validation = {
  entityType?: EntityTypes,
  pattern?: string,
  primitiveType: PrimitiveTypes,
  max?: number,
  min?: number
}

export type Value = {
  name: string,
  value: string
}

export type Filter = {
  id: string,
  name: string,
  validation?: Validation,
  values: Value[]
}

export default Filter