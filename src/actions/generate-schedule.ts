'use server'
import { getWeeksUntilEnem } from "@/lib/enem";
import { Content, DailySchedule, QuizAnswers, Schedule } from "@/models/schedule";

export async function generateSchedule(answers: QuizAnswers): Promise<Schedule> {
  const response = await fetch(`${process.env.API_URL}/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'X-API-Key': process.env.API_KEY || '',
    },
    body: JSON.stringify(answers),
  });

  if (!response.ok) {
    throw new Error("Failed to generate schedule");
  }

  return response.json();
}

/*export async function generateSchedule(answers: QuizAnswers, content: Content[]): Promise<Schedule> {
  const weeksUntilExam = getWeeksUntilEnem();
  const weeklyLoad = answers.daysPerWeek * answers.hoursPerDay;
  const minutesPerTopic = 30;
  const contentsPerWeek = Math.floor((weeklyLoad * 60) / minutesPerTopic);

  const harderSubjects = content.filter(c => answers.harderSubjects.includes(c.subject));
  const preferred = answers.preferredArea
    ? content.filter(c => c.area === answers.preferredArea)
    : [];
  const remaining = content.filter(c =>
    !harderSubjects.includes(c) && !preferred.includes(c)
  );

  const schedule: Schedule = [];

  const weekDaysOnly = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekend = ["Saturday", "Sunday"];
  const daysOfWeek = [...weekDaysOnly, ...weekend];

  function getDistributedDays(daysPerWeek: number): string[] {
    let baseDays = weekDaysOnly;
    if (daysPerWeek > weekDaysOnly.length) {
      baseDays = daysOfWeek;
    }
    
    const step = (baseDays.length - 1) / (daysPerWeek - 1);
    const result: string[] = [];
    for (let i = 0; i < daysPerWeek; i++) {
      result.push(baseDays[Math.round(i * step)]);
    }

    return Array.from(new Set(result));
  }

  const availableDays = getDistributedDays(answers.daysPerWeek);
  const contentsPerDay = Math.floor(contentsPerWeek / answers.daysPerWeek);

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

  return schedule;
}*/
