'use server'
import { getWeeksUntilEnem } from "@/lib/enem";
import { writeFile } from "node:fs";

interface QuizAnswers {
  daysPerWeek: number;
  hoursPerDay: number;
  harderSubjects: string[];
  preferredArea?: string;
}

interface Content {
  topic: string;
  subject: string;
  area: string;
}

interface DailySchedule {
  day: string;
  contents: Content[];
}

interface WeeklySchedule {
  week: number;
  days: DailySchedule[];
}

type Schedule = WeeklySchedule[];

/**
 * Generates a personalized study schedule based on quiz answers.
 */
export async function generateSchedule(answers: QuizAnswers, content: Content[]): Promise<Schedule> {
  const weeksUntilExam = getWeeksUntilEnem();
  const weeklyLoad = answers.daysPerWeek * answers.hoursPerDay;
  const minutesPerTopic = 30;
  const contentsPerWeek = Math.floor((weeklyLoad * 60) / minutesPerTopic);

  // Split content into categories
  const harderSubjects = content.filter(c => answers.harderSubjects.includes(c.subject));
  const preferred = answers.preferredArea
    ? content.filter(c => c.area === answers.preferredArea)
    : [];
  const remaining = content.filter(c =>
    !harderSubjects.includes(c) && !preferred.includes(c)
  );

  const schedule: Schedule = [];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const availableDays = daysOfWeek.slice(0, answers.daysPerWeek);
  const contentsPerDay = Math.floor(contentsPerWeek / answers.daysPerWeek);

  console.log('weeks until exam', weeksUntilExam)
  for (let week = 1; week <= weeksUntilExam; week++) {
    const weekDays: DailySchedule[] = [];

    for (const day of availableDays) {
      const dayContents: Content[] = [];

      const HARDER_SUBJECTS_WEIGHT = 0.4;
      const PREFERRED_AREA_WEIGHT = 0.2;
      const numharderSubjects = Math.floor(contentsPerDay * HARDER_SUBJECTS_WEIGHT);
      const numPreferred = Math.floor(contentsPerDay * PREFERRED_AREA_WEIGHT);
      const numRemaining = contentsPerDay - (numharderSubjects + numPreferred);

      // Random selection helper
      const pickRandom = (array: Content[], count: number) => {
        const selected: Content[] = [];
        const pool = [...array];
        while (pool.length && selected.length < count) {
          const idx = Math.floor(Math.random() * pool.length);
          selected.push(pool.splice(idx, 1)[0]);
        }
        return selected;
      };

      dayContents.push(...pickRandom(harderSubjects, numharderSubjects));
      dayContents.push(...pickRandom(preferred, numPreferred));
      dayContents.push(...pickRandom(remaining, numRemaining));

      weekDays.push({
        day,
        contents: dayContents
      });
    }

    schedule.push({
      week,
      days: weekDays
    });
  }

  writeFile('schedule.json', JSON.stringify(schedule, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  })
  return schedule;
}
