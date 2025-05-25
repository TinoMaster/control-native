export const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

export enum ETimeRange {
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  THIS_YEAR = "this_year",
  ALL_TIME = "all_time"
}

export const TIME_RANGE_OPTIONS_TRANSLATION = [
  { id: ETimeRange.TODAY, label: "Hoy" },
  { id: ETimeRange.THIS_WEEK, label: "Esta semana" },
  { id: ETimeRange.THIS_MONTH, label: "Este mes" },
  { id: ETimeRange.THIS_YEAR, label: "Este año" },
  { id: ETimeRange.ALL_TIME, label: "Generales" }
];
