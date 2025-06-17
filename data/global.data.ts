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

export const GRADIENT_PALETTE_TO_BACKGROUND = {
  primary: {
    dark: {
      soft: ["#0f2027", "#203a43", "#2c5364"],
      medium: ["#141E30", "#243B55", "#3C6478"],
      strong: ["#000428", "#004e92", "#4286f4"]
    },
    light: {
      soft: ["#e0eafc", "#cfdef3", "#d5e3f1"],
      medium: ["#c2e9fb", "#a1c4fd", "#90cdf4"],
      strong: ["#89f7fe", "#66a6ff", "#5d9fff"]
    }
  },
  secondary: {
    dark: {
      soft: ["#3a1c71", "#d76d77", "#ffaf7b"],
      medium: ["#4b1248", "#f0c27b", "#c7a37a"],
      strong: ["#614385", "#516395", "#3e4b5b"]
    },
    light: {
      soft: ["#ffecd2", "#fcb69f", "#fbc2eb"],
      medium: ["#ff9a9e", "#fad0c4", "#fbc2eb"],
      strong: ["#ff758c", "#ff7eb3", "#fca6c9"]
    }
  },
  /* ------ Variantes del fondo */
  dark: {
    dark: {
      soft: ["#232526", "#414345", "#2c2c2c"],
      medium: ["#1F1C2C", "#928DAB", "#474747"],
      strong: ["#0f0c29", "#302b63", "#24243e"]
    },
    light: {
      soft: ["#FFFFFF", "#ededed", "#FFFFFF"],
      medium: ["#2c2c54", "#474787", "#3c3c3c"],
      strong: ["#000000", "#434343", "#282828"]
    }
  },
  /* ------ Variantes del fondo */
  light: {
    dark: {
      soft: ["#fefcea", "#f1da36", "#e2c044"],
      medium: ["#fffbd5", "#f7e8aa", "#f4d35e"],
      strong: ["#f5f7fa", "#c3cfe2", "#d6e4f0"]
    },
    light: {
      soft: ["#ffffff", "#f2f2f2", "#e6e6e6"],
      medium: ["#f5f7fa", "#c3cfe2", "#d6e4f0"],
      strong: ["#dbe6f6", "#c5796d", "#f4f4f4"]
    }
  },
  glass: {
    dark: {
      soft: ["#ffffff10", "#ffffff05", "#ffffff15"],
      medium: ["#ffffff20", "#ffffff10", "#ffffff30"],
      strong: ["#ffffff40", "#ffffff30", "#ffffff60"]
    },
    light: {
      soft: ["#ffffff10", "#ffffff05", "#ffffff15"],
      medium: ["#ffffff20", "#ffffff10", "#ffffff30"],
      strong: ["#ffffff40", "#ffffff30", "#ffffff60"]
    }
  },
  neon: {
    dark: {
      soft: ["#00f260", "#0575e6", "#00c3ff"],
      medium: ["#fc466b", "#3f5efb", "#00f2fe"],
      strong: ["#ff00cc", "#333399", "#00ffff"]
    },
    light: {
      soft: ["#ffecd2", "#fcb69f", "#fbc2eb"],
      medium: ["#ff9a9e", "#fad0c4", "#fbc2eb"],
      strong: ["#ff758c", "#ff7eb3", "#fca6c9"]
    }
  }
};
