import { ETimeRange, TIME_RANGE_OPTIONS_TRANSLATION } from "data/global.data";
import { create } from "zustand";

interface PeriodStore {
  selectedTimeRange: ETimeRange;
  translationTimeRange: string;
  setSelectedTimeRange: (timeRange: ETimeRange) => void;
}

export const usePeriodStore = create<PeriodStore>((set) => ({
  selectedTimeRange: ETimeRange.THIS_WEEK,
  translationTimeRange: TIME_RANGE_OPTIONS_TRANSLATION.find((opt) => opt.id === ETimeRange.THIS_WEEK)?.label ?? "",

  setSelectedTimeRange: (timeRange: ETimeRange) => {
    set({ selectedTimeRange: timeRange });
    set({ translationTimeRange: TIME_RANGE_OPTIONS_TRANSLATION.find((opt) => opt.id === timeRange)?.label ?? "" });
  }
}));
