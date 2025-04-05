export enum EUnit {
  PIECE = "PIECE",
  PERCENT = "PERCENT",
}

export type TUnit = keyof typeof EUnit;

export const TRANSLATE_UNIT = {
  [EUnit.PIECE]: "Unidad",
  [EUnit.PERCENT]: "Porcentaje",
};
