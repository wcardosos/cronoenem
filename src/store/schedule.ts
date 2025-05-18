import { create } from "zustand";
import { Schedule as ScheduleModel } from "@/models/schedule";

interface ScheduleState {
  schedule: ScheduleModel | null;
  setSchedule: (schedule: ScheduleModel) => void;
}

export const useScheduleStore = create<ScheduleState>((set) => ({
  schedule: null,
  setSchedule: (schedule) => set({ schedule }),
}));