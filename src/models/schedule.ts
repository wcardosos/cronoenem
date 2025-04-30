export interface QuizAnswers {
  daysPerWeek: number;
  hoursPerDay: number;
  harderSubjects: string[];
  preferredArea?: string;
}

export interface Content {
  topic: string;
  subject: string;
  area: string;
  url: string;
}

export interface DailySchedule {
  day: string;
  contents: Content[];
}

interface WeeklySchedule {
  week: number;
  days: DailySchedule[];
}

export type Schedule = WeeklySchedule[];